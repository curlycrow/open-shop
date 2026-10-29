import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly body: Locator;

  constructor(page: Page) {
    this.page = page;
    this.body = page.locator('body');
  }

  async goto() {
    await this.page.goto('/cart/');
  }
}
