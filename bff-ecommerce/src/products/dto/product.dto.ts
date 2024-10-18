export class ProductDto {

    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    brand: string;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    images: string[];
    thumbnail: string;
}