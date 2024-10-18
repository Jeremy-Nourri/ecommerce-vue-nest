import { Injectable, NotFoundException, Logger } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { ProductApiDto } from "./dto/product-api.dto"
import { ProductDto } from "./dto/product.dto"
import { firstValueFrom } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { AxiosError } from "axios"
import { ProductsByCategoryApiDto } from "./dto/products-by-category-api.dto"

@Injectable()
export class ProductsService {
    private readonly logger = new Logger(ProductsService.name)
    private readonly API_URL = "https://dummyjson.com"

    constructor(private readonly httpService: HttpService) {}

    async findProductById(id: number): Promise<ProductDto> {
        try {
            const productRequest$ = this.httpService
                .get<ProductApiDto>(`${this.API_URL}/products/${id}`)
                .pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(`Error while fetching product with id ${id}`, error)

                        throw new NotFoundException(`Product with id ${id} not found`)
                    })
                )

            const response = await firstValueFrom(productRequest$)

            return this.transformToDto(response.data)
        } catch (error) {
            this.logger.error(`Failed to find product: ${error.message}`)
            throw error
        }
    }

    async findProductsByCategory(title: string): Promise<ProductDto[]> {
        const response$ = this.httpService
            .get<ProductsByCategoryApiDto>(`${this.API_URL}/products/category/${title}`)
            .pipe(
                map((response) => response.data.products.map(this.transformToDto)),

                catchError((error: AxiosError) => {
                    this.logger.error(`Error while fetching product with title ${title}`, error)

                    throw new NotFoundException(`Product with title ${title} not found`)
                })
            )

        console.log(response$)

        return await firstValueFrom(response$)
    }

    private transformToDto(productApi: ProductApiDto): ProductDto {
        return {
            id: productApi.id,
            title: productApi.title,
            description: productApi.description,
            category: productApi.category,
            price: productApi.price,
            discountPercentage: productApi.discountPercentage,
            rating: productApi.rating,
            brand: productApi.brand,
            dimensions: productApi.dimensions,
            reviews: productApi.reviews,
            images: productApi.images,
            thumbnail: productApi.thumbnail
        }
    }
}
