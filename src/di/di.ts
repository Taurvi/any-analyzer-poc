import { BasicCalculator } from "../clients/calculator/BasicCalculator";
import { ICalculator } from "../clients/calculator/ICalculator";

let basicCalculator: ICalculator;
export const getBasicCalculator = function (): ICalculator {
    if (basicCalculator == null) {
        basicCalculator = new BasicCalculator();
    }
    return basicCalculator;
};
