/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: {
    'Introduction': ['installation'],
    'CLI Commands': [
      'fix-mismatches',
      'format',
      'lint-semver-ranges',
      'list-mismatches',
      'list',
      'set-semver-ranges',
    ],
    'CLI Options': [
      'config-option',
      'filter-option',
      'indent-option',
      'semver-range-option',
      'source-option',
      'types-option',
    ],
    'Configuration File': [
      'custom-types-config',
      'dependency-types-config',
      'filter-config',
      'indent-config',
      'semver-groups-config',
      'semver-range-config',
      'sort-az-config',
      'sort-first-config',
      'source-config',
      'version-groups-config',
    ],
  },
};

module.exports = sidebars;