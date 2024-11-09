import Big from 'big.js';

/**
 * 加法
 *
 * @param {number} num1 加数
 * @param {number} num2 加数
 * @return {number} 和
 */
export function add(num1: number, num2: number) {
    const big1 = new Big(num1);
    const addData = big1.plus(num2);
    console.log(addData);
    return parseFloat(addData.toString());
}

/**
 * 除法
 *
 * @param {number} num1 被除数
 * @param {number} num2 除数
 * @return {number} 商
 */
export function divide(num1: number, num2: number) {
    const div1 = new Big(num1);
    const div2 = new Big(num2);
    const divData = div1.div(div2);
    return parseFloat(divData.toString());
}

/**
 * 减法
 *
 * @param {number} num1 被减数
 * @param {number} num2 减数
 * @return {number} 差
 */
export function subtract(num1: number, num2: number) {
    const m1 = new Big(num1);
    const subData = m1.minus(num2);
    return parseFloat(subData.toString());
}

/**
 * 乘法
 *
 * @param {number} num1 乘数
 * @param {number} num2 乘数
 * @return {number} 积
 */
export function multiply(num1: number, num2: number) {
    const big1 = new Big(num1);
    const mulData = big1.times(num2);
    return parseFloat(mulData.toString());
}

// 查找数组中的最大值&最小值

export function getMaxMinValue(data: number[] | object[], key?: string) {
    let min: number | undefined;
    let max: number | undefined;
    if (!data.length) {
        return { min, max }
    }
    if (key) {
        min = (data[0] as { [key: string]: number })[key];
        max = (data[0] as { [key: string]: number })[key];
    } else {
        min = data[0] as number;
        max = data[0] as number;
    }

    for (let i = 1, len = data.length; i < len; i++) {
        const currentData = data[i];
        const value = key ? (currentData as { [key: string]: number })[key] : currentData as number

        if (value > max) {
            max = value;
        }

        if (value < min) {
            min = value;
        }
    }
    return {max,min}

}