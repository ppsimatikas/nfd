import {Gradient} from "typescript-color-gradient";

export function normalizeToRange(variable: number, min: number, max: number, rangeSize: number = 10): number {
    if (min >= max) {
        return 0
    }


    // Ensure the variable is within the range [min, max]
    if (variable < min) variable = min;
    if (variable > max) variable = max;

    const newMin = 0
    const newMax = rangeSize - 1

    // Normalize the variable to the range [0, 1]
    const normalized = ((variable - min) * (newMax - newMin)) / (max - min) + newMin;
    console.log("aaaaaaa");
    console.log(normalized)

    // Map the normalized value to the range [0, rangeSize]
    return Math.round(normalized);
}

export function getColors(
    startColor: string,
    endColor: string,
    rangeSize: number = 10
) {
    return new Gradient()
        .setGradient(startColor, endColor)
        .setNumberOfColors(rangeSize)
        .getColors();
}

export function getColor(
    variable: number,
    variables: number[],
    startColor: string,
    endColor: string,
    slippage: number = 1,
    rangeSize: number = 10,
) {
    const min = Math.min(...variables)
    const max = Math.max(...variables) * slippage
    const i = normalizeToRange(variable, min, max, rangeSize)
    const gradientArray = getColors(startColor, endColor, rangeSize)
    return gradientArray[i]
}

