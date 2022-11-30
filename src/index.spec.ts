import { getVendingResult } from './index';

describe('getVendingResult', () => {
  const validCases = [
    // Typical Cases
    ["Requires Change - A", "50 50 20 20 A", "A", "20 20 5"],
    ["Requires Change - B", "50 50 20 20 B", "B", "10 2 2"],
    ["Requires Change - C", "50 50 50 50 50 20 C", "C", "20 10 5 2"],
    // Edge Cases
    ["Far too much money provided", "50 50 50 50 50 50 50 50 50 50 50 50 50 20 20 20 20 20 20 20 20 20 20 10 10 10 10 10 10 5 5 5 5 2 2 2 2 1 1 1 1 A", "A", "50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 20 20 5 2"],
    ["Just one cent over", "50 50 20 5 1 1 B", "B", "1"]
  ]

  it.each(validCases)("should return the product bought and the correct change with the least amount of coins for a valid command: %p", (testCaseDescription: string, command: string, expectedProduct: string, expectedChange: string) => {
    expect(getVendingResult(command)).toEqual({
      change: expectedChange,
      product: expectedProduct,
    });
  })

  const exactChangeCases = [
    ["Product A - least coins provided", "50 20 20 5 A", "A"],
    ["Product A - not least coins provided", "50 20 10 10 5 A", "A"],
    ["Product B - least coins provided", "50 50 20 5 1 B", "B"],
    ["Product B - not least coins provided", "50 20 20 20 10 5 1 B", "B"],
    ["Product C - least coins provided", "50 50 50 50 20 10 2 1 C", "C"],
    ["Product C - not least coins provided", "50 50 50 50 20 5 5 2 1 C", "C"],
  ]
  it.each(exactChangeCases)("should return no change if exact change was provided: %p", (testCaseDescription: string, command: string, expectedProduct: string) => {
    expect(getVendingResult(command)).toEqual({
      change: null,
      product: expectedProduct,
    });
  })


  const insufficientMoneyCases = [
    ["Least coins provided", "20 10 5 A", "20 10 5"],
    ["Not least coins provided", "50 10 10 A", "50 10 10"]
  ]
  it.each(insufficientMoneyCases)("should return the exact change given, if not enough money was given to buy the product: %p", (testCaseDescription: string, command: string, expectedChange: string) => {
    expect(getVendingResult(command)).toEqual({
      change: expectedChange,
      product: null,
    });
  })


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
