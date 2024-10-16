
export default interface LineCart {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage?: number;
    discountedTotal?: number;
    thumbnail?: string;
}