import {environment} from "@environments/environment";

const imageUrl = `${environment.apiUrlBase}/assist/images/producto`;

export function getUrlImage(sku: string): string {
  if (!sku) return `${imageUrl}/default`;
  return `${imageUrl}/${sku}`;
}
