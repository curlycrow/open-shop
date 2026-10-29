import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly colorSelect: Locator;
  readonly sizeSelect: Locator;
  readonly addToCartButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /100% cashmere sweater/i });
    this.colorSelect = page.locator('select[name="attribute_pa_color"]');
    this.sizeSelect = page.locator('select[name="attribute_pa_size"]');
    this.addToCartButton = page.getByRole('button', { name: /Add to cart/i });
    this.successMessage = page.locator('.woocommerce-message').filter({
      hasText: /100% cashmere sweater/i,
    });
  }

  async goto() {
    await this.page.goto('/product/100-cashmere-sweater/');
  }

  async addVariantToCart(color: string, size: string) {
    await this.colorSelect.selectOption({ label: color });
    await this.sizeSelect.selectOption({ label: size });
    await this.addToCartButton.click();
  }
}
