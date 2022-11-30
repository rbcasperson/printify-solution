const products: { [product: string]: number } = {
  A: 0.95,
  B: 1.26,
  C: 2.33,
};

const validCoinValues: number[] = [50, 20, 10, 5, 2, 1];

const validateCommand = (command: string): [string, string[]] => {
  const parts = command.split(" ");
  // Last character needs to be in Products
  const product = parts[parts.length - 1];
  const productIsValid = Object.keys(products).includes(product);
  if (!productIsValid) {
    throw new Error(`Invalid product: '${product}'`);
  }
  // At least one valid coin at the beginning
  const coins = parts.slice(0, -1);
  for (const coin of coins) {
    const coinInt = parseInt(coin);
    if (isNaN(coinInt)) {
      throw new Error(`Coin value is not an integer: '${coin}'`);
    }
    const coinIsValid = validCoinValues.includes(coinInt);
    if (!coinIsValid) {
      throw new Error(`Coin value is not a valid number: '${coin}'`);
    }
  }
  return [product, coins];
};

const calculateChangeDue = (changeDue: number): string | null => {
  let remainingChangeDue = changeDue;
  let coinsForChange: number[] = [];
  // Ensure they are ordered from highest to lowest
  validCoinValues.sort(function (a, b) {
    return b - a;
  });
  for (const coinValue of validCoinValues) {
    let coinValueDecimal = parseFloat((coinValue / 100).toFixed(2));
    while (remainingChangeDue >= coinValueDecimal) {
      coinsForChange.push(coinValue);
      remainingChangeDue -= coinValueDecimal;
      remainingChangeDue = parseFloat(remainingChangeDue.toFixed(2));
    }
  }

  const changeStr = coinsForChange.join(" ");
  return changeStr ? changeStr : null;
};

export function getVendingResult(command: string): {
  change: string | null;
  product: string | null;
} {
  const [product, coins] = validateCommand(command);

  let totalMoneyGiven: number = 0;
  for (const coin of coins) {
    totalMoneyGiven += parseInt(coin) / 100;
  }
  totalMoneyGiven = parseFloat(totalMoneyGiven.toFixed(2));
  const priceOfProduct: number = products[product];

  // If not enough money was given, return the exact coins that were given
  // and not necessarily the least amount of coins of the same amount.
  let insufficientMoney: boolean = totalMoneyGiven < priceOfProduct;
  if (insufficientMoney) {
    return { change: coins.join(" "), product: null };
  }

  const amountDue = parseFloat((totalMoneyGiven - priceOfProduct).toFixed(2));
  const change = calculateChangeDue(amountDue);

  return { change, product };
}
