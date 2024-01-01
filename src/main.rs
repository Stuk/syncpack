// Standard library imports
use std::io;

// External crates
extern crate glob;
extern crate serde;
extern crate serde_json;

// Local modules
mod config;
mod dependencies;
mod file_paths;
mod format;
mod package_json;

// Imports from external crates
use serde_json::json;

fn main() -> io::Result<()> {
  let cwd = std::env::current_dir()?;
  let pattern = cwd.join("fixtures/**/package.json");
  let pattern_str = pattern.to_str().unwrap();
  let paths = file_paths::get_file_paths(pattern_str);
  let rcfile = config::get();
  let packages = paths
    .into_iter()
    .filter_map(|file_path| package_json::read_file(&file_path).ok());

  packages.for_each(|mut package| {
    package.set_prop("/name", json!("new name"));
    package.set_prop("/engines/node", json!(">=1"));

    if rcfile.format_bugs {
      let bugs_url = package.get_prop("/bugs/url");
      if let Some(bugs_url) = bugs_url {
        package.set_prop("/bugs", bugs_url.clone());
      }
    }

    if rcfile.format_repository {
      format::format_repository(&mut package);
    }

    rcfile.sort_az.iter().for_each(|key| {
      package
        .contents
        .pointer_mut(format!("/{}", key).as_str())
        .map(format::sort_alphabetically);
    });

    format::sort_first(&mut package.contents, &rcfile.sort_first);
    package.pretty_print();
  });

  Ok(())
}
