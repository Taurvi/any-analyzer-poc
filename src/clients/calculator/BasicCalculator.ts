import { ICalculator } from "./ICalculator";

export class BasicCalculator implements ICalculator {
    public add(firstNumber: any, secondNumber: any): number {
        const result = firstNumber + secondNumber;
        return result as any;
    }

    public subtract(firstNumber: any, secondNumber: any): number {
        return (firstNumber - secondNumber) as any;
    }
}
