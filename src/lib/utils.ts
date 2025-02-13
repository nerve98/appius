export function isPositiveInteger(stringa: string): boolean {
    const regex = /^\d+$/
    return regex.test(stringa);
}