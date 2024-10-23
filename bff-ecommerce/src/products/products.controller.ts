import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';


@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {}

    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number): Promise<ProductDto> {
        return this.productsService.findProductById(id);
    }

    @Get('category/:title')
    async getProductsByCategory(@Param('title') title: string): Promise<ProductDto[]> {
        return this.productsService.findProductsByCategory(title);
    }
}
