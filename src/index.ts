#!/usr/bin/env node
import { getBasicCalculator } from "./di/di";

const basicCalculator = getBasicCalculator();

const a = basicCalculator.add(1, 100);
const b = basicCalculator.add(30, 100);
const c = basicCalculator.subtract(25, 20);

console.log(a);
console.log(b);
console.log(c);
