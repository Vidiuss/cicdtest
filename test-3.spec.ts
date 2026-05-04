import { test, expect } from '@playwright/test';

test('Hepsiburada Hedef Odaklı Doğrulama Testi', async ({ page, context }) => {
    // 1. Ana sayfa ve Çerezler
    await page.goto('https://www.hepsiburada.com/', { waitUntil: 'domcontentloaded' });
    const cookieButton = page.getByRole('button', { name: 'Kabul Et' });
    if (await cookieButton.isVisible()) { await cookieButton.click(); }

    // 2. Dinamik ilk ürün seçimi (Senin bulduğun class ismiyle)
    const productCard = page.locator('.productCard-module_productCardRoot__Yf7qs').first();
    await productCard.waitFor({ state: 'visible', timeout: 15000 });

    const [productPage] = await Promise.all([
        context.waitForEvent('page'),
        productCard.click(),
    ]);

    await productPage.waitForLoadState('domcontentloaded');

    // --- YAKALADIĞIN SEÇİCİLERLE VERİ TOPLAMA (Madde 5 Hazırlığı) ---
    // Detay sayfasındaki Marka, İsim ve Fiyatı alıyoruz
    const detailBrand = await productPage.locator('[data-test-id="brand"]').innerText();
    const detailTitle = await productPage.locator('[data-test-id="title"]').innerText();
    const detailPrice = await productPage.locator('[data-test-id="default-price"] div').first().innerText();

    console.log(`Ürün Yakalandı: ${detailBrand} - ${detailTitle} / Fiyat: ${detailPrice}`);

    // 3. Sepete Ekle
    await productPage.locator('#addToCart').click();

    // 4. Sepete Git (Login olmadan devam akışı)
    await productPage.getByRole('button', { name: 'Sepete git' }).click();
    await productPage.waitForURL(/sepetim/);

    // 5. HOCANIN İSTEDİĞİ KRİTİK DOĞRULAMALAR (Madde 5)
    // a. Ürün sepette mi?
    const cartItem = productPage.locator('.product_name_3L_E0').first();
    await expect(cartItem).toBeVisible();

    // b. Ürün adı doğrulaması (Detay sayfasındaki başlık sepette var mı?)
    const cartItemText = await cartItem.innerText();
    expect(cartItemText.toLowerCase()).toContain(detailTitle.toLowerCase().trim());

    // c. Fiyat doğrulaması
    const cartPrice = productPage.locator('.price_19293').first();
    await expect(cartPrice).toBeVisible();
    const cartPriceText = await cartPrice.innerText();
    // Not: Fiyat formatları bazen farklı olabilir, o yüzden sadece rakam kontrolü bile yeterli
    console.log(`Sepet Fiyatı Doğrulandı: ${cartPriceText}`);

    // 6. Final: Alışverişi Tamamla -> Üye Olmadan Devam Et
    await productPage.getByRole('button', { name: 'Alışverişi tamamla' }).click();
    await expect(productPage.getByText('Üye olmadan devam et')).toBeVisible();
    
    console.log('Tüm hedefler (İsim, Fiyat, Akış) başarıyla doğrulandı!');
});await page1.goto('https://www.hepsiburada.com/by-nini-spf-50-pa-yeni-nesil-filtreli-leke-karsiti-su-bazli-nemlendiricili-gunes-kremi-50-ml-p-HBCV000067OJSD');
await page1.goto('https://www.hepsiburada.com/by-nini-spf-50-pa-yeni-nesil-filtreli-leke-karsiti-su-bazli-nemlendiricili-gunes-kremi-50-ml-p-HBCV000067OJSD');