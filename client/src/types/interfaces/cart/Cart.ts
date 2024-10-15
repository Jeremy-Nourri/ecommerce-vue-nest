import type LineCart from "./LineCart";

export default interface Cart {
    id?: number;
    products?: LineCart[];
    total: number;
    discountedTotal?: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}