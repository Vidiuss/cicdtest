import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly cookieButton: Locator;
    readonly productCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookieButton = page.getByRole('button', { name: 'Kabul Et' });
        this.productCard = page.locator('.productCard-module_productCardRoot__Yf7qs').first();
    }

    async goto() {
        await this.page.goto('https://www.hepsiburada.com/', { waitUntil: 'domcontentloaded' });
    }

    async acceptCookies() {
        if (await this.cookieButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            await this.cookieButton.click();
            console.log('✓ Çerezler kabul edildi');
        }
    }

    async selectFirstProduct() {
        return this.productCard;
    }

    async clickFirstProduct() {
        await this.productCard.click();
    }
}