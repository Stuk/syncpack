import type { Specifier } from '../../specifier';
import { getPreferredVersion } from './get-preferred-version';

/**
 * From an array of instances where every instance contains a valid semver
 * version, return the lowest version number
 */
export function getLowestVersion(specifiers: Specifier.Any[]) {
  return getPreferredVersion('lowestSemver', specifiers);
}
