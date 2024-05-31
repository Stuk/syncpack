use glob::glob;
use serde_json::Value;
use std::{collections::HashMap, path::PathBuf};

use crate::{
  cli::CliOptions, config::Rcfile, dependency_type::Strategy, instance::Instance,
  json_file::read_json_file, package_json::PackageJson,
};

pub struct Packages {
  pub all_names: Vec<String>,
  pub by_name: HashMap<String, PackageJson>,
}

impl Packages {
  /// Get every instance of a dependency from every package.json file
  pub fn get_all_instances<F>(&self, cli_options: &CliOptions, rcfile: &Rcfile, mut on_instance: F)
  where
    F: FnMut(Instance),
  {
    let dependency_types = &rcfile.get_enabled_dependency_types();
    let filter = &cli_options.filter;
    let matches_filter = |name: &str| -> bool {
      if let Some(filter) = filter {
        filter.is_match(name)
      } else {
        true
      }
    };

    for package in self.by_name.values() {
      for dependency_type in dependency_types {
        match dependency_type.strategy {
          Strategy::NameAndVersionProps => {
            if let (Some(Value::String(name)), Some(Value::String(version))) = (
              package.get_prop(&dependency_type.name_path.as_ref().unwrap()),
              package.get_prop(&dependency_type.path),
            ) {
              if matches_filter(name) {
                on_instance(Instance::new(
                  name.to_string(),
                  version.to_string(),
                  dependency_type.clone(),
                  &package,
                ));
              }
            }
          }
          Strategy::NamedVersionString => {
            if let Some(Value::String(specifier)) = package.get_prop(&dependency_type.path) {
              if let Some((name, version)) = specifier.split_once('@') {
                if matches_filter(name) {
                  on_instance(Instance::new(
                    name.to_string(),
                    version.to_string(),
                    dependency_type.clone(),
                    &package,
                  ));
                }
              }
            }
          }
          Strategy::UnnamedVersionString => {
            if let Some(Value::String(version)) = package.get_prop(&dependency_type.path) {
              if matches_filter(&dependency_type.name) {
                on_instance(Instance::new(
                  dependency_type.name.clone(),
                  version.to_string(),
                  dependency_type.clone(),
                  &package,
                ));
              }
            }
          }
          Strategy::VersionsByName => {
            if let Some(Value::Object(versions_by_name)) = package.get_prop(&dependency_type.path) {
              for (name, version) in versions_by_name {
                if matches_filter(name) {
                  if let Value::String(version) = version {
                    on_instance(Instance::new(
                      name.to_string(),
                      version.to_string(),
                      dependency_type.clone(),
                      &package,
                    ));
                  }
                }
              }
            }
          }
          Strategy::InvalidConfig => {
            panic!("unrecognised strategy");
          }
        };
      }
    }
  }
}

/// Get every package.json file matched by the user's source patterns
pub fn get_packages(cwd: &PathBuf, cli_options: &CliOptions, rcfile: &Rcfile) -> Packages {
  let file_paths = get_file_paths(&cwd, &cli_options, &rcfile);
  let mut packages = Packages {
    all_names: vec![],
    by_name: HashMap::new(),
  };
  for file_path in file_paths {
    if let Ok(file) = read_json_file(&file_path) {
      let name = file.get_name();
      packages.all_names.push(name.clone());
      packages.by_name.insert(name.clone(), file);
    }
  }
  packages
}

/// Resolve every source glob pattern into their absolute file paths of
/// package.json files
fn get_file_paths(cwd: &PathBuf, cli_options: &CliOptions, rcfile: &Rcfile) -> Vec<PathBuf> {
  get_source_patterns(cli_options, rcfile)
    .iter()
    .map(|pattern| {
      if PathBuf::from(pattern).is_absolute() {
        pattern.clone()
      } else {
        cwd.join(pattern).to_str().unwrap().to_string()
      }
    })
    .flat_map(|pattern| glob(&pattern).ok())
    .flat_map(|paths| {
      paths
        .filter_map(Result::ok)
        .fold(vec![], |mut paths, path| {
          paths.push(path.clone());
          paths
        })
    })
    .collect()
}

/// Based on the user's config file and command line `--source` options, return
/// the source glob patterns which should be used to resolve package.json files
fn get_source_patterns(cli_options: &CliOptions, rcfile: &Rcfile) -> Vec<String> {
  get_cli_patterns(cli_options)
    .or_else(|| get_rcfile_patterns(rcfile))
    .or_else(get_npm_patterns)
    .or_else(get_pnpm_patterns)
    .or_else(get_yarn_patterns)
    .or_else(get_lerna_patterns)
    .or_else(get_default_patterns)
    .unwrap()
}

fn get_cli_patterns(cli_options: &CliOptions) -> Option<Vec<String>> {
  if cli_options.source.is_empty() {
    return None;
  } else {
    return Some(cli_options.source.clone());
  }
}

fn get_rcfile_patterns(rcfile: &Rcfile) -> Option<Vec<String>> {
  if rcfile.source.is_empty() {
    return None;
  } else {
    return Some(rcfile.source.clone());
  }
}

fn get_npm_patterns() -> Option<Vec<String>> {
  None
}

fn get_pnpm_patterns() -> Option<Vec<String>> {
  None
}

fn get_yarn_patterns() -> Option<Vec<String>> {
  None
}

fn get_lerna_patterns() -> Option<Vec<String>> {
  None
}

fn get_default_patterns() -> Option<Vec<String>> {
  Some(vec![
    String::from("package.json"),
    String::from("packages/*/package.json"),
  ])
}
