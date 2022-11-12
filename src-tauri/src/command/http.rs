use std::collections::HashMap;

use reqwest::Method;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Error {
    message: String,
}

impl Error {
    fn new(message: String) -> Self {
        Self { message }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Response {
    status_code: u16,
    headers: HashMap<String, String>,
    body: String,
}

impl Response {
    pub fn new(status_code: u16, headers: HashMap<String, String>, body: String) -> Self {
        Self {
            status_code,
            headers,
            body,
        }
    }
}

struct Request {
    method: String,
    url: String,
}

impl Request {
    fn new(method: String, url: String) -> Self {
        Self { method, url }
    }

    async fn send(&self) -> Result<Response, Error> {
        // get reqwest client
        let client = reqwest::Client::new();

        // get reqwest method
        let method = match Method::from_bytes(self.method.as_bytes()) {
            Ok(method) => method,
            Err(_) => return Err(Error::new(format!("Invalid method '{}'.", self.method))),
        };

        // send request
        let resp_result = client.request(method, &self.url[..]).send().await;

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
                Ok(Response::new(status_code, headers, body))
            }
            // an error occurred, return error
            Err(error) => Err(Error::new(error.to_string())),
        }
    }
}

#[tauri::command]
pub async fn send(method: String, url: String) -> Result<Response, Error> {
    Request::new(method, url).send().await
}
