export function extraerNumeroDetalle(impObs: string): string | null {
  const match = impObs.match(/\d{4}-\d+/)
  return match ? match[0] : null;
}
