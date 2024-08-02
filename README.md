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
  Found AnyKeyword in 4 files.
    /Volumes/local-workspace/THAT Conference/ts-compiler/src/index.ts
    /Volumes/local-workspace/THAT Conference/ts-compiler/src/di/di.ts
    /Volumes/local-workspace/THAT Conference/ts-compiler/src/clients/calculator/ICalculator.ts
    /Volumes/local-workspace/THAT Conference/ts-compiler/src/clients/calculator/BasicCalculator.ts
```