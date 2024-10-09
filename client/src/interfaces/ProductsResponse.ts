import type { Phone } from './phone/Phone';
import type { Tablet } from './tablet/Tablet';

export type Product = Phone | Tablet;

export interface ProductsResponse {
  products: Product[];
}