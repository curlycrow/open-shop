import { expect, test } from './fixtures';

test.describe('Online Shop Demo', () => {
  test('homepage shows top-level shopping navigation', async ({ page, homePage }) => {
    await homePage.goto();

    await expect(page).toHaveTitle(/Online Shop Demo/i);
    await expect(homePage.womanLink).toBeVisible();
    await expect(homePage.manLink).toBeVisible();
    await expect(homePage.saleLink).toBeVisible();
    await expect(homePage.body).toContainText(/New Arrivals/i);
  });

  test('women category page displays the product listing', async ({ page, shopPage }) => {
    await shopPage.gotoWomenCategory();

    await expect(page).toHaveURL(/\/product-category\/womens-collections\//);
    await expect(page.getByRole('heading', { name: /Women’s Collections/i })).toBeVisible();
    await expect(shopPage.products.first()).toBeVisible();
    const productCount = await shopPage.products.count();
    expect(productCount).toBeGreaterThan(0);
    await expect(shopPage.body).toContainText('100% cashmere sweater');
  });

  test('customer can add a product variant to the cart', async ({ productPage }) => {
    await productPage.goto();

    await expect(productPage.heading).toBeVisible();

    await productPage.addVariantToCart('Pink', 'M');

    await expect(productPage.successMessage).toBeVisible();
    await expect(productPage.successMessage).toContainText(/View cart|added to your cart/i);
  });

  test('shop page loads the catalog and product category navigation', async ({ page, homePage, shopPage }) => {
    await shopPage.goto();

    await expect(page).toHaveURL(/\/shop\//);
    await expect(shopPage.body).toContainText(/Shop/i);
    await expect(shopPage.products.first()).toBeVisible();
    await expect(homePage.womanLink).toBeVisible();
  });

  test('shop page exposes product type filters', async ({ shopPage }) => {
    await shopPage.goto();

    await expect(shopPage.bagFilter).toHaveCount(1);
    await expect(shopPage.bagFilterLabel).toContainText('Bags');
  });

  test('homepage remains usable at mobile viewport', async ({ page, homePage }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await homePage.goto();

    await expect(page).toHaveTitle(/Online Shop Demo/i);
    await expect(homePage.body).toContainText(/Shop|Woman|Man|Sale/i);
    await expect(homePage.shopNowLink).toBeVisible();
  });

  test('cart page shows the product after a successful add-to-cart action', async ({ page, productPage, cartPage }) => {
    await productPage.goto();
    await productPage.addVariantToCart('Pink', 'M');
    await cartPage.goto();

    await expect(page).toHaveURL(/\/cart\//);
    await expect(cartPage.body).toContainText('100% cashmere sweater');
    await expect(cartPage.body).toContainText(/Subtotal|£139\.00/i);
  });
});
