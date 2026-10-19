import { Controller, Get, Inject, NotFoundException, Param, Query } from "@nestjs/common";
import { ProductService } from "./ProductService.js";

@Controller('products')
export class ProductController {
    constructor(
        @Inject(ProductService) private readonly productService: ProductService
    ) { }

    @Get('top-rated')
    async getTopRatedProductByCategory(@Query('category') category?: any) {
        if (category) {
            return this.productService.getTopRatedByCategory(category, 10);
        }
        return this.productService.getTopRatedGroupedByCategory();
    }

    @Get('by-brandname')
    async getProductByBrand(@Query('brandName') brandName: string, @Query('category') category?: any) {
        return this.productService.getProductsByBrand(brandName, category);
    }

    @Get('search')
    async searchProducts(@Query('q') query: string) {
        return this.productService.searchProducts(query);
    }

    @Get('detail/:id')
    async getProductById(@Param('id') id: string) {
        const product = await this.productService.findByProductId(id);
        if (!product) {
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }
        return product;
    }

    @Get(':category')
    async getProductByCategory(@Param('category') category: string) {
        return this.productService.findProducts(category);
    }
}
