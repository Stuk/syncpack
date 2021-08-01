import 'expect-more-jest';
import { setSemverRange } from './set-semver-range';

describe('setSemverRange', () => {
  describe('when the current value is Semver', () => {
    it('sets its semver range to the given range', () => {
      [
        ['', '1.2.3'],
        ['>', '>1.2.3'],
        ['>=', '>=1.2.3'],
        ['.x', '1.x.x'],
        ['<', '<1.2.3'],
        ['<=', '<=1.2.3'],
        ['^', '^1.2.3'],
        ['~', '~1.2.3'],
      ].forEach(([semverRange, expected]) => {
        expect(setSemverRange({ semverRange })('<1.2.3')).toEqual(expected);
        expect(setSemverRange({ semverRange })('<=1.2.3')).toEqual(expected);
        expect(setSemverRange({ semverRange })('1.2.3')).toEqual(expected);
        expect(setSemverRange({ semverRange })('~1.2.3')).toEqual(expected);
        expect(setSemverRange({ semverRange })('^1.2.3')).toEqual(expected);
        expect(setSemverRange({ semverRange })('>=1.2.3')).toEqual(expected);
        expect(setSemverRange({ semverRange })('>1.2.3')).toEqual(expected);
        expect(setSemverRange({ semverRange })('*')).toEqual('*');
        expect(setSemverRange({ semverRange })('https://github.com/npm/npm.git')).toEqual('https://github.com/npm/npm.git');
      });
    });
  });
  describe('when the current value contains a wildcard patch', () => {
    it('sets its semver range to the given range', () => {
      const current = '1.2.x';
      expect(setSemverRange({ semverRange: '' })(current)).toEqual('1.2.0');
      expect(setSemverRange({ semverRange: '>' })(current)).toEqual('>1.2.0');
      expect(setSemverRange({ semverRange: '>=' })(current)).toEqual('>=1.2.0');
      expect(setSemverRange({ semverRange: '.x' })(current)).toEqual('1.x.x');
      expect(setSemverRange({ semverRange: '<' })(current)).toEqual('<1.2.0');
      expect(setSemverRange({ semverRange: '<=' })(current)).toEqual('<=1.2.0');
      expect(setSemverRange({ semverRange: '^' })(current)).toEqual('^1.2.0');
      expect(setSemverRange({ semverRange: '~' })(current)).toEqual('~1.2.0');
    });
  });
  describe('when the current value contains a wildcard minor and patch', () => {
    it('sets its semver range to the given range', () => {
      const current = '1.x.x';
      expect(setSemverRange({ semverRange: '' })(current)).toEqual('1.0.0');
      expect(setSemverRange({ semverRange: '>' })(current)).toEqual('>1.0.0');
      expect(setSemverRange({ semverRange: '>=' })(current)).toEqual('>=1.0.0');
      expect(setSemverRange({ semverRange: '.x' })(current)).toEqual(current);
      expect(setSemverRange({ semverRange: '<' })(current)).toEqual('<1.0.0');
      expect(setSemverRange({ semverRange: '<=' })(current)).toEqual('<=1.0.0');
      expect(setSemverRange({ semverRange: '^' })(current)).toEqual('^1.0.0');
      expect(setSemverRange({ semverRange: '~' })(current)).toEqual('~1.0.0');
    });
  });
  describe('when the current value contains multiple versions', () => {
    it('leaves the version unchanged', () => {
      const current = '>=16.8.0 <17.0.0';
      expect(setSemverRange({ semverRange: '' })(current)).toEqual(current);
      expect(setSemverRange({ semverRange: '>' })(current)).toEqual(current);
      expect(setSemverRange({ semverRange: '>=' })(current)).toEqual(current);
      expect(setSemverRange({ semverRange: '.x' })(current)).toEqual(current);
      expect(setSemverRange({ semverRange: '<' })(current)).toEqual(current);
      expect(setSemverRange({ semverRange: '<=' })(current)).toEqual(current);
      expect(setSemverRange({ semverRange: '^' })(current)).toEqual(current);
      expect(setSemverRange({ semverRange: '~' })(current)).toEqual(current);
    });
  });
});