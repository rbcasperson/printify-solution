# Coding

## Task

Install dependencies
`npm i`

Run the following command with the key provided

`npm run task -- --key=1q2w3e4.r`

Find task instructions in generated `src/README.md` file



## Development

Prepare `src` folder with the following structure
```
index.ts
index.spec.ts
README.md
```

Run the following command with the key provided:

`npm run task -- --key=1q2w3e4.name --mode=write`

Script should generate encrypted zip archive in `tasks/` folder:

`tasks/name.zip`