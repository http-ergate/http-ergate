use std::collections::HashMap;

use reqwest::{header::HeaderMap, Method};
use serde::{Deserialize, Serialize};

/// `Obstacle`, aka error.
#[derive(Serialize, Deserialize)]
pub struct Obstacle {
    /// Obstacle reason
    message: String,
}

impl Obstacle {
    /// Constructs a new `Obstacle` with reason.
    fn new(message: String) -> Self {
        Self { message }
    }
}

/// `Reward`, aka http response.
#[derive(Serialize, Deserialize)]
pub struct Reward {
    /// Status code.
    status_code: u16,
    /// Headers.
    headers: HashMap<String, String>,
    /// Body content.
    body: String,
}

impl Reward {
    /// Constructs a new `Reward` with required fields.
    pub fn new(status_code: u16, headers: HashMap<String, String>, body: String) -> Self {
        Self {
            status_code,
            headers,
            body,
        }
    }
}

/// `FoodAddition`, addition information for food.
#[derive(Serialize, Deserialize)]
pub struct FoodAddition {
    /// Headers.
    senses: HashMap<String, String>,
    /// Inside.
    inside: String,
}

/// `Food`, aka http request.
#[derive(Serialize, Deserialize)]
pub struct Food {
    /// Http method.
    method: String,
    /// Url.
    path: String,
    /// Additional information.
    addition: FoodAddition,
}

impl Food {
    /// Carry food to home with earned reward, returning a future Response.
    /// # Obstacle
    /// This method fails if there was an obstacle while carrying to home.
    async fn carry(&self) -> Result<Reward, Obstacle> {
        // get reqwest client
        let client = reqwest::Client::new();

        // get reqwest method
        let method = match Method::from_bytes(self.method.as_bytes()) {
            Ok(method) => method,
            Err(_) => return Err(Obstacle::new(format!("Invalid method '{}'.", self.method))),
        };

        // build request
        // get headers
        let headers = self
            .addition
            .senses
            .clone()
            .into_iter()
            .map(|(name, value)| Ok((name.parse()?, value.parse()?)))
            .collect::<Result<HeaderMap, http::Error>>()
            .unwrap_or(HeaderMap::new());
        let rb = client.request(method, &self.path[..]).headers(headers);

        // send request
        let resp_result = rb.send().await;

        match resp_result {
            // no error
            Ok(resp) => {
                // get response status code
                let status_code = resp.status().as_u16();

                // get response headers
                let mut headers = HashMap::new();
                for (k, v) in resp.headers() {
                    headers.insert(k.to_string(), String::from(v.to_str().unwrap_or_default()));
                }

                // get response body
                let body = match resp.text().await {
                    Ok(text) => text,
                    Err(_) => String::from(""),
                };

                // return response
                Ok(Reward::new(status_code, headers, body))
            }
            // an error occurred, return error
            Err(error) => Err(Obstacle::new(error.to_string())),
        }
    }
}

/// # Command
/// Carry food to home with earned reward,
/// aka send a http request to specified destination with returned http response.
/// # Obstacle
/// This method fails if there was an obstacle while carrying to home.
#[tauri::command]
pub async fn carry(food: Food) -> Result<Reward, Obstacle> {
    food.carry().await
}
