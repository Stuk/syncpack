use std::collections::HashMap;

use serde::Deserialize;

use crate::config;
use crate::group_selector;
use crate::instance::Instance;

#[derive(Debug)]
pub struct BannedVersionGroup<'a> {
  pub selector: group_selector::GroupSelector,
  pub instances_by_name: HashMap<String, &'a Instance<'a>>,
  pub is_banned: bool,
}

#[derive(Debug)]
pub struct IgnoredVersionGroup<'a> {
  pub selector: group_selector::GroupSelector,
  pub instances_by_name: HashMap<String, &'a Instance<'a>>,
  pub is_ignored: bool,
}

#[derive(Debug)]
pub struct PinnedVersionGroup<'a> {
  pub selector: group_selector::GroupSelector,
  pub instances_by_name: HashMap<String, &'a Instance<'a>>,
  pub pin_version: String,
}

#[derive(Debug)]
pub struct SameRangeVersionGroup<'a> {
  pub selector: group_selector::GroupSelector,
  pub instances_by_name: HashMap<String, &'a Instance<'a>>,
  pub policy: String,
}

#[derive(Debug)]
pub struct SnappedToVersionGroup<'a> {
  pub selector: group_selector::GroupSelector,
  pub instances_by_name: HashMap<String, &'a Instance<'a>>,
  pub snap_to: Vec<String>,
}

#[derive(Debug)]
pub struct StandardVersionGroup<'a> {
  pub selector: group_selector::GroupSelector,
  pub instances_by_name: HashMap<String, &'a Instance<'a>>,
  pub prefer_version: String,
}

// @TODO: refactor to not be an enum?

#[derive(Debug)]
pub enum VersionGroup<'a> {
  Banned(BannedVersionGroup<'a>),
  Ignored(IgnoredVersionGroup<'a>),
  Pinned(PinnedVersionGroup<'a>),
  SameRange(SameRangeVersionGroup<'a>),
  SnappedTo(SnappedToVersionGroup<'a>),
  Standard(StandardVersionGroup<'a>),
}

impl VersionGroup<'_> {
  pub fn from_rcfile(rcfile: &config::Rcfile) -> Vec<VersionGroup> {
    rcfile
      .version_groups
      .iter()
      .map(|group| VersionGroup::from_config(group))
      .collect()
  }

  pub fn from_config(group: &AnyVersionGroup) -> VersionGroup {
    let selector = group_selector::GroupSelector {
      dependencies: group.dependencies.clone(),
      dependency_types: group.dependency_types.clone(),
      label: group.label.clone(),
      packages: group.packages.clone(),
      specifier_types: group.specifier_types.clone(),
    };

    if let Some(true) = group.is_banned {
      return VersionGroup::Banned(BannedVersionGroup {
        selector,
        instances_by_name: HashMap::new(),
        is_banned: true,
      });
    }
    if let Some(true) = group.is_ignored {
      return VersionGroup::Ignored(IgnoredVersionGroup {
        selector,
        instances_by_name: HashMap::new(),
        is_ignored: true,
      });
    }
    if let Some(pin_version) = &group.pin_version {
      return VersionGroup::Pinned(PinnedVersionGroup {
        selector,
        instances_by_name: HashMap::new(),
        pin_version: pin_version.clone(),
      });
    }
    if let Some(policy) = &group.policy {
      return VersionGroup::SameRange(SameRangeVersionGroup {
        selector,
        instances_by_name: HashMap::new(),
        policy: policy.clone(),
      });
    }
    if let Some(snap_to) = &group.snap_to {
      return VersionGroup::SnappedTo(SnappedToVersionGroup {
        selector,
        instances_by_name: HashMap::new(),
        snap_to: snap_to.clone(),
      });
    }
    if let Some(prefer_version) = &group.prefer_version {
      return VersionGroup::Standard(StandardVersionGroup {
        selector,
        instances_by_name: HashMap::new(),
        prefer_version: prefer_version.clone(),
      });
    }
    panic!("Invalid version group");
  }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AnyVersionGroup {
  #[serde(default)]
  pub dependencies: Vec<String>,
  #[serde(default)]
  pub dependency_types: Vec<String>,
  #[serde(default)]
  pub label: String,
  #[serde(default)]
  pub packages: Vec<String>,
  #[serde(default)]
  pub specifier_types: Vec<String>,
  //
  pub is_banned: Option<bool>,
  pub is_ignored: Option<bool>,
  pub pin_version: Option<String>,
  pub policy: Option<String>,
  pub snap_to: Option<Vec<String>>,
  pub prefer_version: Option<String>,
}
