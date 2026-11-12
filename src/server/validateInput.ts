const DATABASE_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

export function isFilledString(value: unknown): boolean {
  return typeof value === "string" && value.trim() !== "";
}

export function isNumber(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value);
}

export function isZeroOrMore(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function isDatabaseId(value: unknown): boolean {
  return typeof value === "string" && DATABASE_ID_PATTERN.test(value);
}
