use std::path;

/// Return all matching file paths for a given glob pattern
pub fn get_file_paths(pattern: &str) -> Vec<path::PathBuf> {
  glob::glob(pattern)
    .expect("Failed to read glob pattern")
    .filter_map(Result::ok)
    .collect()
}
