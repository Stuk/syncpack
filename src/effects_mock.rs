#[cfg(test)]
use std::collections::HashMap;

#[cfg(test)]
use crate::{
  config::Config,
  context::InstancesById,
  effects::{Effects, Event, InstanceEvent, InstanceEventVariant},
  expect::{ActualMatchEvent, ActualMismatchEvent},
  packages::Packages,
};

// We'll store data later but for now use `Vec<()>` to keep a count of events
#[cfg(test)]
#[derive(Debug)]
pub struct EventsByType {
  pub enter_versions_and_ranges: Vec<()>,
  pub enter_format: Vec<()>,
  pub group_visited: Vec<()>,
  pub dependency_valid: Vec<()>,
  pub dependency_invalid: Vec<()>,
  pub dependency_warning: Vec<()>,
  pub format_match: Vec<()>,
  pub format_mismatch: Vec<()>,
  pub exit_command: Vec<()>,
}

#[cfg(test)]
impl EventsByType {
  pub fn new() -> Self {
    Self {
      enter_versions_and_ranges: vec![],
      enter_format: vec![],
      group_visited: vec![],
      dependency_valid: vec![],
      dependency_invalid: vec![],
      dependency_warning: vec![],
      format_match: vec![],
      format_mismatch: vec![],
      exit_command: vec![],
    }
  }
}

/// A mock implementation of a command's side effects for the purpose of testing
#[cfg(test)]
#[derive(Debug)]
pub struct MockEffects<'a> {
  pub config: &'a Config,
  pub events: EventsByType,
  pub is_valid: bool,
  pub matches: HashMap<InstanceEventVariant, Vec<ActualMatchEvent>>,
  pub mismatches: HashMap<InstanceEventVariant, Vec<ActualMismatchEvent>>,
  pub packages: Option<Packages>,
}

#[cfg(test)]
impl<'a> MockEffects<'a> {
  pub fn new(config: &'a Config) -> Self {
    Self {
      config,
      events: EventsByType::new(),
      is_valid: true,
      matches: HashMap::new(),
      mismatches: HashMap::new(),
      packages: None,
    }
  }
}

#[cfg(test)]
impl Effects for MockEffects<'_> {
  fn get_packages(&mut self) -> Packages {
    let packages = self.packages.take().unwrap();
    self.packages = None;
    packages
  }

  fn set_packages(&mut self, packages: Packages) {
    self.packages = Some(packages);
  }

  fn on(&mut self, event: Event, instances_by_id: &mut InstancesById) {
    match &event {
      Event::EnterVersionsAndRanges => self.events.enter_versions_and_ranges.push(()),
      Event::EnterFormat => self.events.enter_format.push(()),
      Event::GroupVisited(_) => self.events.group_visited.push(()),
      Event::DependencyValid(_, _) => self.events.dependency_valid.push(()),
      Event::DependencyInvalid(_, _) => self.events.dependency_invalid.push(()),
      Event::DependencyWarning(_, _) => self.events.dependency_warning.push(()),
      Event::FormatMatch(_) => self.events.format_match.push(()),
      Event::FormatMismatch(_) => self.events.format_mismatch.push(()),
      Event::ExitCommand => self.events.exit_command.push(()),
    };
  }

  fn on_instance(&mut self, event: InstanceEvent, instances_by_id: &mut InstancesById) {
    let instance_id = &event.instance_id;
    let dependency = &event.dependency;
    let instance = instances_by_id.get(instance_id).unwrap();

    match &event.variant {
InstanceEventVariant::InstanceIsIgnored
|InstanceEventVariant::LocalInstanceIsPreferred
|InstanceEventVariant::InstanceMatchesLocal
|InstanceEventVariant::InstanceMatchesHighestOrLowestSemver
|InstanceEventVariant::InstanceMatchesButIsUnsupported
|InstanceEventVariant::InstanceMatchesPinned
|InstanceEventVariant::InstanceMatchesSameRangeGroup
|InstanceEventVariant::LocalInstanceMistakenlyBanned
|InstanceEventVariant::InstanceMismatchesAndIsUnsupported
|InstanceEventVariant::InstanceMatchesPinnedButMismatchesSemverGroup
|InstanceEventVariant::InstanceMismatchesBothSameRangeAndConflictingSemverGroups
|InstanceEventVariant::InstanceMismatchesBothSameRangeAndCompatibleSemverGroups
|InstanceEventVariant::InstanceMatchesSameRangeGroupButMismatchesConflictingSemverGroup
|InstanceEventVariant::InstanceMatchesSameRangeGroupButMismatchesCompatibleSemverGroup
|InstanceEventVariant::InstanceMismatchesSameRangeGroup=>{
self.matches
.entry(event.variant.clone())
.or_insert_with(|| vec![])
.push(ActualMatchEvent::new(&event, &instance));
}
InstanceEventVariant::LocalInstanceMistakenlyMismatchesSemverGroup
|InstanceEventVariant::LocalInstanceMistakenlyMismatchesPinned
|InstanceEventVariant::InstanceIsBanned
|InstanceEventVariant::InstanceMatchesHighestOrLowestSemverButMismatchesConflictingSemverGroup
|InstanceEventVariant::InstanceIsHighestOrLowestSemverOnceSemverGroupIsFixed
|InstanceEventVariant::InstanceMatchesLocalButMismatchesSemverGroup
|InstanceEventVariant::InstanceMismatchesLocal
|InstanceEventVariant::InstanceMismatchesHighestOrLowestSemver
|InstanceEventVariant::InstanceMismatchesPinned=>{
self.mismatches
.entry(event.variant.clone())
.or_insert_with(|| vec![])
.push(ActualMismatchEvent::new(&event, &instance));
}
};
  }
}
