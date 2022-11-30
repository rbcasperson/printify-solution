import { getVendingResult } from './index';

describe('getVendingResult', () => {
  const validCases = [
    // Typical Case
    ["Requires Change - A", "50 50 20 20 A", "A", "20 20 5"],
    ["Requires Change - B", "50 50 20 20 B", "B", "10 2 2"],
    ["Requires Change - C", "50 50 50 50 50 20 C", "C", "20 10 5 2"],
    // TODO - more test cases
  ]

  it.each(validCases)("should return the product bought and the correct change with the least amount of coins for a valid command: %p", (testCaseDescription: string, command: string, expectedProduct: string, expectedChange: string) => {
    expect(getVendingResult(command)).toEqual({
      change: expectedChange,
      product: expectedProduct,
    });
  })

  it('should return no change if exact change was provided', () => {
    // TODO - do this for each possible product
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

  // Command Validation
  const invalidCommands = [
    ["Invalid product: 'command'", "Invalid command"],
    // Valid coins, but invalid product
    ["Invalid product: 'Q'", "1 2 50 Q"],
    ["Invalid product: '1'", "1 2 50 1"],
    // Valid product, but invalid coins
    ["Coin value is not an integer: 'A'", "A 2 50 A"],
    ["Coin value is not an integer: '.5'", ".5 2 50 A"],
    ["Coin value is not a valid number: '11'", "11 2 50 A"],
  ]
  it.each(invalidCommands)("should throw an error containing '%p' with the command '%p'", (expectedError: string, command: string) => {
    expect(() => {
      getVendingResult(command)
    }).toThrow(expectedError)
  })

});
