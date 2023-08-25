import { Effect } from 'effect';
import 'expect-more-jest';
import { shuffle } from '../../../test/lib/shuffle';
import type { Specifier } from '../../specifier';
import { getLowestVersion } from './get-lowest-version';

describe('getLowestVersion', () => {
  const a = ['*'];
  const b = shuffle([...a, '>1.0.0']);
  const c = shuffle([...b, '>=1.0.0']);
  const d = shuffle([...c, '^1.0.0']);
  const e = shuffle([...d, '1.x.x']);
  const f = shuffle([...e, '~1.0.0']);
  const g = shuffle([...f, '1.0.0']);
  const h = shuffle([...g, '1']);
  const i = shuffle([...h, '<=1.0.0']);
  const j = shuffle([...i, '<1.0.0']);
  const k = shuffle([...j, 'workspace:*']);

  function toSpecifier(version: string): Specifier.Any {
    return {
      getSemver: () => Effect.succeed(version),
      raw: version,
    } as Specifier.Any;
  }

  // "1" and "1.0.0" are equal and first match wins
  const eitherFormat = expect.stringMatching(/^(1|1\.0\.0)$/);

  it('returns "*" when it is the only version', () => {
    const specifiers = a.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: '*',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns ">1.0.0" when added', () => {
    const specifiers = b.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: '>1.0.0',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns ">=1.0.0" when added', () => {
    const specifiers = c.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: '>=1.0.0',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns "^1.0.0" when added', () => {
    const specifiers = d.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: '^1.0.0',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns "1.x.x" when added', () => {
    const specifiers = e.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: '1.x.x',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns "~1.0.0" when added', () => {
    const specifiers = f.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: '~1.0.0',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns "1.0.0" when added', () => {
    const specifiers = g.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: '1.0.0',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns "1" when added', () => {
    const specifiers = h.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: eitherFormat,
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns "<=1.0.0" when added', () => {
    const specifiers = i.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: '<=1.0.0',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns "<1.0.0" when added', () => {
    const specifiers = j.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: '<1.0.0',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });

  it('returns "workspace:*" when added', () => {
    const specifiers = k.map(toSpecifier);
    const expected = expect.objectContaining({
      raw: 'workspace:*',
    });
    expect(Effect.runSync(getLowestVersion(specifiers))).toEqual(expected);
  });
});
