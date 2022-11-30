import { getVendingResult } from './index';

describe('getVendingResult', () => {
  it('should return product B and 14 cents for 1.40 USD with product B selected', () => {
    expect(getVendingResult('50 50 20 20 B')).toEqual({
      change: '10 2 2',
      product: 'B',
    });
  });

  it('should return product C and no change for 2.33 USD with product C selected', () => {
    expect(getVendingResult('50 50 50 50 20 10 2 1 C')).toEqual({
      change: null,
      product: 'C',
    });
  });

  it('should return the exact change given, if not enough money was given to buy the product', () => {
    expect(getVendingResult('50 10 10 A')).toEqual({
      change: '50 10 10',
      product: null,
    });
  });

  // Command validation
  const invalidCommands = [
    ["Invalid product: 'command'", "Invalid command"],
    // Valid coins, but invalid product
    ["Invalid product: 'Q'", "1 2 50 Q"],
    // Valid product, but invalid coins
    // ["Coin value is not a number: 'A'", "A 2 50 A"],
    // ["Coin value is not a number: 'A'", ".5 2 50 Q"],
  ]
  it.each(invalidCommands)("should throw an error containing '%p' with the command '%p'", (expectedError: string, command: string) => {
    expect(() => {
      getVendingResult(command)
    }).toThrow(expectedError)
  })


  // TODO
  // Any other cases?
});
