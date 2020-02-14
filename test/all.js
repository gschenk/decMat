import chai from 'chai';
import Core from '../src/core.js';
import tools from '../src/tools.js';

const { expect } = chai;

const testMat = new Core({
  k0: [{ 0: 'a0' }, { 1: 'a1' }],
  k1: [{ 1: 'b0' }, { 2: 'b1' }],
  k2: [{ 0: 'c0' }, { 2: 'c1' }, { 3: 'c2' }],
});

describe('Core Methods', () => {
  it('M dimension', () => expect(testMat.dimM).to.equal(5));
  it('N dimension', () => expect(testMat.dimN).to.equal(4));
});

describe('tools', () => {
  const testCases = {
    foo: 'rfoo',
    bar: 'rbar',
    tar: 'rtar',
  };
  it('zipWith', () => {
    const as = [2, 4, 6];
    const bs = [2, 2, 3];
    const cs = tools.zipWith((a, b) => a - b)(as)(bs);
    const rs = [0, 2, 3];
    expect(cs.join('')).to.equal(rs.join(''));
  });
  it('pureSwitch', () => {
    const fun = tools.pureSwitch(testCases)('err');
    const as = ['foo', 'tar', 'x', ''];
    const bs = ['rfoo', 'rtar', 'err', 'err'];
    expect(tools.zipWith((a, b) => a === b)(as.map(fun))(bs).every((a) => a)).to.equal(true);
  });
  it('matchSwitch includes', () => {
    const fun = tools.matchSwitch(testCases)('err')((a) => (b) => b.includes(a));
    const as = ['oo', 'ar', 'x', ''];
    const bs = ['rfoo', 'err', 'err', 'err'];
    expect(tools.zipWith((a, b) => a === b)(as.map(fun))(bs).every((a) => a)).to.equal(true);
  });
});
