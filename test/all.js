import chai from 'chai';
import DecisionMatrixO from '../src/core.js';
import { Grid, gridStyleO, gridItemsO } from '../src/view.js';

const { expect } = chai;

const testMat = new DecisionMatrixO({
  k0: ['a0', 'a1'],
  k1: ['b0', 'b1'],
  k2: ['c0', 'c1', 'c2'],
  k3: [],
});

describe('Core Methods', () => {
  it('M dimension', () => expect(testMat.dimM).to.equal(4));
  it('Values by m', () => expect(testMat.valsByColumn(1).join()).to.equal('b0,b1'));
});

describe('View, Grid methods', () => {
  it('all keys present in gridStyleO', () => {
    const a = Object.keys(gridStyleO);
    const b = [
      'containerStyle',
      'itemTopLegendStyle',
      'itemHeadStyle',
      'itemBodyStyle',
    ];
    expect(a.join()).to.equal(b.join());
  });

  it('all keys present in gridItemsO', () => {
    const a = Object.keys(gridItemsO);
    const b = [
      'topLegendDefault',
      'itemTopLegend',
      'gridItem',
      'makeContainerStr',
    ];
    expect(a.join()).to.equal(b.join());
  });

  const testGrid = new Grid(2, gridStyleO, gridItemsO);
  it('Grid.items output', () => {
    const a = testGrid.items(2, ['a0', 'a1']);
    const b = '<div class="grid-item2">a0</div>\n<div class="grid-item2">a1</div>';
    expect(a).to.equal(b);
  });
});
