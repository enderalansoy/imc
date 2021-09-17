export const roundNumber = (num: number) => Math.round((Number(num) + Number.EPSILON) * 100) / 100
