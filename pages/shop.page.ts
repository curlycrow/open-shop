import { type Locator, type Page } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly products: Locator;
  readonly body: Locator;
  readonly bagFilter: Locator;
  readonly bagFilterLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.products .product');
    this.body = page.locator('body');
    this.bagFilter = page.locator('input[name="pa_types"][value="10"]');
    this.bagFilterLabel = page.locator('label').filter({ hasText: /Bags/i }).first();
  }

  async goto() {
    await this.page.goto('/shop/');
  }

  async gotoWomenCategory() {
    await this.page.goto('/product-category/womens-collections/');
  }
}
