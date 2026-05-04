import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly productBrand: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Yakaladığın o güzel seçicileri buraya yerleştiriyoruz:
        this.productTitle = page.locator('[data-test-id="title"]');
        this.productBrand = page.locator('[data-test-id="brand"]');
        this.productPrice = page.locator('[data-test-id="default-price"] div').first();
        this.addToCartButton = page.locator('#addToCart');
    }

    async getProductDetails() {
        const title = await this.productTitle.innerText();
        const price = await this.productPrice.innerText();
        return { title, price };
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}