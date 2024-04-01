// deno-lint-ignore-file

export function JSONSTRINGIFYNULL4(
    // deno-lint-ignore no-explicit-any
    a: any,
    replacer: (number | string)[] | null = null,
    space: string | number = 4,
): string {
    return JSON.stringify(a, replacer, space);
}
