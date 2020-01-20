import chai from 'chai';
import DecisionMatrixO from '../src/core.js';
import Grid from '../src/grid.js';

const { expect } = chai;

const testMat = new DecisionMatrixO({
  k0: ['a0', 'a1'],
  k1: ['b0', 'b1'],
  k2: ['c0', 'c1', 'c2'],
  k3: [],
});

describe('Core Methods', () => {
  it('M dimension', () => expect(testMat.dimM).to.equal(3));
  it('N dimension', () => expect(testMat.dimN).to.equal(4));
  it('Values by m', () => expect(testMat.valsByColumn(1).join()).to.equal('b0,b1'));
});

describe('View, Grid methods', () => {
  const grid = new Grid(2);
  it('all required methods provided by Grid', () => {
    const a = Object.keys(grid);
    const b = [
      'style',
      'items',
      'container',
      'assemble',
    ];
    expect(b.map((s) => a.includes(s)));
  });

  console.log(typeof grid.style);
  it('Grid.items function', () => {
    const a = grid.items(2, ['a0', 'a1']);
    const b = '<div class="grid-item2">a0</div>\n<div class="grid-item2">a1</div>';
    expect(a).to.equal(b);
  });
  it('Grid.continer function', () => {
    const a = grid.container('foobar');
    const b = '<div class="grid-container">foobar</div>';
    expect(a).to.equal(b);
  });
  it('Grid.style is a String', () => {
    const a = typeof grid.style;
    const b = 'string';
    expect(a).to.equal(b);
  });
});
