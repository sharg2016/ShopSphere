import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument, ProductCategory } from './schema/product.schema.js';
import { createProductDto } from './dto/create-product.dto.js';
import { retry } from 'rxjs';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) { }

    // Find products by specific category type
    async findByCategory(category: ProductCategory) {
        return this.productModel.find({ category }).exec();
    }

    // Find products accepting string (with type assertion or optional category)
    async findProducts(category?: string) {
        const filter = category
            ? { category: { $regex: new RegExp(`^${category}$`, 'i') } }
            : {};
        return this.productModel.find(filter).exec();
    }

    // Get top 10 rated products per category
    async getTopRatedByCategory(category: ProductCategory, limit = 10) {
        return this.productModel
            .find({ category })
            .sort({ rating: -1 })
            .limit(limit)
            .exec();
    }

    // Get top 10 rated products grouped for all categories
    async getTopRatedGroupedByCategory(): Promise<{ category: string; products: Product[] }[]> {
        const categories: ProductCategory[] = ['Camera', 'Laptop', 'SmartPhone', 'TV', 'Speaker', 'Tablet', 'Washing-Machine'];

        const results = await Promise.all(
            categories.map(async (cat) => {
                const products = await this.getTopRatedByCategory(cat, 10);
                return { category: cat, products };
            })
        );

        return results.filter((group) => group.products.length > 0);
    }

    // Get products by brand name
    async getProductsByBrand(brandName: string, category?: ProductCategory) {
        const filter: any = { brandName };
        if (category) filter.category = category;
        return this.productModel.find(filter).exec();
    }

    // Create a new product document
    async createProduct(productData: Partial<Product>): Promise<Product> {
        const createdProduct = new this.productModel(productData);
        return createdProduct.save();
    }

    // Find a single product by its productId field
    async findByProductId(productId: string) {
        return this.productModel.findOne({ productId }).exec();
    }

    async searchProducts(query: string) {
        const regex = new RegExp(query, 'i');
        return this.productModel.find({
            $or: [
                { name: { $regex: regex } },
                { brandName: { $regex: regex } },
                { category: { $regex: regex } }
            ]
        }).exec();
    }

    async getProductByPriceAscending() {
        return
    }

    async addProduct(sellerId: string, dto: createProductDto) {
        const productId = `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const newProduct = await this.productModel.create({
            ...dto,
            productId,
            sellerId,
            isAvailable: true,
            rating: 0
        });

        return {
            message: 'product added successfully.',
            product: newProduct
        }
    }

    async getSellerProduct(sellerId: string) {
        return await this.productModel.find({ sellerId }).sort({ createdAt: -1 });
    }
}


