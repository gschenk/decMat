const add = (a, b) => a + b;

describe('example: simple algebraic test', () =>{
  test('2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test.each([[1, 2, 3], [1, -1, 0], [2, 2, 4]])(
    '%i + %i equal %i', (a, b, c) => {
      expect(add(a, b)).toBe(c);
    },
  );
});
