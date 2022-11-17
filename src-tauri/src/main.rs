#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod command;

use command::example::greet;
use command::ergate::carry;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, carry])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
