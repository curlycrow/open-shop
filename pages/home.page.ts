import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly womanLink: Locator;
  readonly manLink: Locator;
  readonly saleLink: Locator;
  readonly body: Locator;
  readonly shopNowLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.womanLink = page.getByRole('link', { name: /Woman/i }).first();
    this.manLink = page.getByRole('link', { name: /Man/i }).first();
    this.saleLink = page.getByRole('link', { name: /Sale/i }).first();
    this.body = page.locator('body');
    this.shopNowLink = page.getByRole('link', { name: /Shop Now/i }).first();
  }

  async goto() {
    await this.page.goto('/');
  }
}
