import { test, expect } from '@playwright/test';

test.describe('Online Shop Demo', () => {
  test('homepage shows top-level shopping navigation', async ({ page }) => {
    await page.goto('https://www.onlineshopdemo.co.uk/');

    await expect(page).toHaveTitle(/Online Shop Demo/i);
    await expect(page.getByRole('link', { name: /Woman/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Man/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Sale/i }).first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/New Arrivals/i);
  });

  test('women category page displays the product listing', async ({ page }) => {
    await page.goto('https://www.onlineshopdemo.co.uk/product-category/womens-collections/');

    await expect(page).toHaveURL(/\/product-category\/womens-collections\//);
    await expect(page.getByRole('heading', { name: /Women’s Collections/i })).toBeVisible();
    await expect(page.locator('.products .product').first()).toBeVisible();
    const productCount = await page.locator('.products .product').count();
    expect(productCount).toBeGreaterThan(0);
    await expect(page.locator('body')).toContainText('100% cashmere sweater');
  });

  test('customer can add a product variant to the cart', async ({ page }) => {
    await page.goto('https://www.onlineshopdemo.co.uk/product/100-cashmere-sweater/');

    await expect(page.getByRole('heading', { name: /100% cashmere sweater/i })).toBeVisible();

    await page.locator('select[name="attribute_pa_color"]').selectOption({ label: 'Pink' });
    await page.locator('select[name="attribute_pa_size"]').selectOption({ label: 'M' });
    await page.getByRole('button', { name: /Add to cart/i }).click();

    const successMessage = page.locator('.woocommerce-message').filter({ hasText: /100% cashmere sweater/i });
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText(/View cart|added to your cart/i);
  });

  test('shop page loads the catalog and product category navigation', async ({ page }) => {
    await page.goto('https://www.onlineshopdemo.co.uk/shop/');

    await expect(page).toHaveURL(/\/shop\//);
    await expect(page.locator('body')).toContainText(/Shop/i);
    await expect(page.locator('.products .product').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Woman/i }).first()).toBeVisible();
  });

  test('shop page exposes product type filters', async ({ page }) => {
    await page.goto('https://www.onlineshopdemo.co.uk/shop/');

    const bagFilter = page.locator('input[name="pa_types"][value="10"]');
    await expect(bagFilter).toHaveCount(1);
    await expect(page.locator('label').filter({ hasText: /Bags/i }).first()).toContainText('Bags');
  });

  test('homepage remains usable at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('https://www.onlineshopdemo.co.uk/');

    await expect(page).toHaveTitle(/Online Shop Demo/i);
    await expect(page.locator('body')).toContainText(/Shop|Woman|Man|Sale/i);
    await expect(page.getByRole('link', { name: /Shop Now/i }).first()).toBeVisible();
  });

  test('cart page shows the product after a successful add-to-cart action', async ({ page }) => {
    await page.goto('https://www.onlineshopdemo.co.uk/product/100-cashmere-sweater/');

    await page.locator('select[name="attribute_pa_color"]').selectOption({ label: 'Pink' });
    await page.locator('select[name="attribute_pa_size"]').selectOption({ label: 'M' });
    await page.getByRole('button', { name: /Add to cart/i }).click();

    await page.goto('https://www.onlineshopdemo.co.uk/cart/');
    await expect(page).toHaveURL(/\/cart\//);
    await expect(page.locator('body')).toContainText('100% cashmere sweater');
    await expect(page.locator('body')).toContainText(/Subtotal|£139\.00/i);
  });
});
