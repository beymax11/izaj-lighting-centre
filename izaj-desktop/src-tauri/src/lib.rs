// no extra imports needed

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    // Initialize the deep link plugin; scheme configuration is provided via tauri.conf.json
    .plugin(tauri_plugin_deep_link::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
