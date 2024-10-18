import { ProductApiDto } from "./product-api.dto"

export class ProductsByCategoryApiDto {
    products: ProductApiDto[]
    total?: number
    skip?: number
    limit?: number
}
