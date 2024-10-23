import { Injectable, NotFoundException, Logger } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { ProductApiDto } from "./dto/product-api.dto"
import { ProductDto } from "./dto/product.dto"
import { firstValueFrom } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { AxiosError } from "axios"
import { ProductsByCategoryApiDto } from "./dto/products-by-category-api.dto"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
    private readonly logger = new Logger(ProductsService.name);
    private readonly apiUrlProducts: string;
    private readonly apiUrlCategory: string;
  
    constructor(
      private configService: ConfigService,
      private readonly httpService: HttpService
    ) {
      this.apiUrlProducts = this.configService.get<string>('URL_API_PRODUCTS');
      this.apiUrlCategory = this.configService.get<string>('URL_API_CATEGORY');
    }

    async findProductById(id: number): Promise<ProductDto> {

        const productRequest$ = this.httpService
            .get<ProductApiDto>(`${this.apiUrlProducts}${id}`)
            .pipe(
                map((response) => this.mapToDto(response.data)),

                catchError((error: AxiosError) => {
                    this.logger.error(`Error while fetching product with id ${id}`, error)

                    throw new NotFoundException(`Product with id ${id} not found`)
                })
            )

        return await firstValueFrom(productRequest$)
    }

    async findProductsByCategory(title: string): Promise<ProductDto[]> {
        const response$ = this.httpService
            .get<ProductsByCategoryApiDto>(`${this.apiUrlCategory}${title}`)
            .pipe(
                map((response) => response.data.products.map(this.mapToDto)),

                catchError((error: AxiosError) => {
                    this.logger.error(`Error while fetching product with title ${title}`, error)

                    throw new NotFoundException(`Product with title ${title} not found`)
                })
            )

        return await firstValueFrom(response$)
    }

    private mapToDto(productApi: ProductApiDto): ProductDto {
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
