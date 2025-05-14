export function parameterIsNumeric(data: string): boolean {
  return /^\d+$/.test(data); // Solo números enteros
}
