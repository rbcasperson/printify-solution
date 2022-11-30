const products = {
  A: 0.95,
  B: 1.26,
  C: 2.33,
}

// Ordered from highest to lowest
const validCoinValues: number[] = [50, 20, 10, 5, 2, 1]

const validateCommand = (command: string) => {
  const parts = command.split(" ")
  // Last character needs to be in Products
  const product = parts[parts.length - 1]
  const productIsValid = Object.keys(products).includes(product)
  if (!productIsValid) {
    throw new Error(`Invalid product: '${product}'`)
  }
  // At least one valid coin at the beginning
  const coins = parts.slice(0, -1)
  for (const coin of coins) {
    const coinInt = parseInt(coin)
    if (isNaN(coinInt)) {
      throw new Error(`Coin value is not an integer: '${coin}'`)
    }
    const coinIsValid = validCoinValues.includes(coinInt)
    if (!coinIsValid) {
      throw new Error(`Coin value is not a valid number: '${coin}'`)
    }
  }
}

export function getVendingResult(command: string): {
  change: string | null;
  product: string | null;
} {
  validateCommand(command)

  const parts = command.split(" ")
  const product = parts[parts.length - 1]
  const coins = parts.slice(0, -1)
  let totalMoneyGiven: number = 0
  for (const coin of coins) {
    totalMoneyGiven += parseInt(coin) / 100
  }
  const priceOfProduct: number = products[product as keyof typeof products]
  // Make sure we have enough money to buy the product
  let insufficientFunds: boolean = totalMoneyGiven < priceOfProduct
  if (insufficientFunds) {
    return { change: coins.join(" "), product: null }
  }

  const changeDue = parseFloat((totalMoneyGiven - priceOfProduct).toFixed(2))
  let remainingChangeDue = changeDue
  let coinsForChange: number[] = []
  for (const coinValue of validCoinValues) {
    let coinValueDecimal = parseFloat((coinValue / 100).toFixed(2))
    while (remainingChangeDue >= coinValueDecimal) {
      coinsForChange.push(coinValue)
      remainingChangeDue -= coinValueDecimal
      remainingChangeDue = parseFloat(remainingChangeDue.toFixed(2))
    }
  }

  const changeStr = coinsForChange.join(" ")

  return { change: changeStr ? changeStr : null, product: product };
}
