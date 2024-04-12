function universalAdd<T extends number | bigint | string>(x: T, y: T) {
  return x + (y as any)
}

universalAdd(599, 1) // T 填充为 599 | 1
universalAdd('linbudu', '599') // T 填充为 linbudu | 599

function universalAdd2<T extends number | bigint | string>(
  x: T,
  y: T
): LiteralToPrimitive<T> {
  return x + (y as any)
}

export type LiteralToPrimitive<T> = T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends string
  ? string
  : never

universalAdd2('linbudu', '599') // string
universalAdd2(599, 1) // number
universalAdd2(10n, 10n) // bigint

// Swap

type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : never
function swap<T extends any[]>(arr: T): Swap<T> {
  return [arr[1], arr[0]] as Swap<T>
}
swap([1, 2])

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
