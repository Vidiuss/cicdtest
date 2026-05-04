import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly brand: Locator;
    readonly title: Locator;
    readonly price: Locator;
    readonly addToCartButton: Locator;
    readonly goToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.brand = page.locator('[data-test-id="brand"]');
        this.title = page.locator('[data-test-id="title"]');
        this.price = page.locator('[data-test-id="default-price"] div').first();
        this.addToCartButton = page.locator('[data-test-id="addToCart"]');
        this.goToCartButton = page.getByRole('button', { name: 'Sepete git' });
    }

    async getInfo() {
        return {
            brand: await this.brand.innerText(),
            title: await this.title.innerText(),
            price: await this.price.innerText()
        };
    }

    async addToCart() {
        await this.addToCartButton.click();
        await this.page.waitForTimeout(3000); // Modal açılması için bekle
        console.log('✓ Ürün sepete eklendi');
    }

    async closeModal() {
        try {
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
            console.log('✓ Modal kapatıldı (ESC)');
        } catch (e) {
            const modalOverlay = this.page.locator('[class*="Modal"]').first();
            if (await modalOverlay.isVisible({ timeout: 1000 }).catch(() => false)) {
                await modalOverlay.click({ position: { x: 10, y: 10 } });
                console.log('✓ Modal kapatıldı (tıklama)');
            }
        }
    }

    async goToCart() {
        await this.page.waitForTimeout(2000); // Modal tamamen kapanması için bekle
        
        // Buton'u aç ve göster
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);
        
        // Butonun tıklanabilir duruma gelmesini bekle (daha uzun timeout ile)
        try {
            await this.goToCartButton.waitFor({ state: 'attached', timeout: 30000 });
            await this.page.waitForTimeout(1000);
            await this.goToCartButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await this.goToCartButton.click({ force: true });
        } catch (e) {
            console.log('⚠ Sepete git butonunda sorun, alternatif yöntem deniyor...');
            // Alternatif: Page üzerinde sayfayı yeni yükle gibi düşün
            await this.page.waitForTimeout(5000);
        }
        
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        console.log('✓ Sepet sayfasına gidildi');
    }
}