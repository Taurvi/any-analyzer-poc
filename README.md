## Commands

### `npm format:write`

Runs prettier

### `npm run analyze`

Analyzes code for `any`.

```
npm run analyze

> ts-compiler-poc@1.0.0 analyze
> node --import=tsimp/import analyzer/anyAnalyzer.ts

Searching code for AnyKeyword
Search complete.
  Found AnyKeyword in 2 files.
    /Volumes/local-workspace/THAT Conference/ts-compiler/src/clients/calculator/ICalculator.ts
      - firstNumber: any
      - secondNumber: any
      - firstNumber: any
      - secondNumber: any
    /Volumes/local-workspace/THAT Conference/ts-compiler/src/clients/calculator/BasicCalculator.ts
      - firstNumber: any
      - secondNumber: any
      - result as any
      - firstNumber: any
      - secondNumber: any
      - (firstNumber - secondNumber) as any
```