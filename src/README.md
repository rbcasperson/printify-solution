# Coding

## Vending Machine

![preview](./docs/preview_image.png)

### Task

Write a program to implement vending machine

### Business rules:

1. The machine accepts coins of 1, 2, 5, 10, 20, and 50 cents.

2. There are 3 different types of products:
    - A - costs EUR 0.95
    - B - costs EUR 1.26
    - C - costs EUR 2.33

3. User can buy products by entering a command  `50 50 20 10 10 2 A`, that starts with list of coins (`50 50 20 10 10 2`) and is followed by selected product (`A`, `B`, `C`)

4. Then the machine gives out the change in the least possible amount of coins. (Ex: `20 20 5 2`)

### Notes

- You should install dependencies there with `npm i`
- You should run  `npm run test` for unit tests launched in watch mode during the hometask
- Unit tests should pass for your solution
