import { expect, test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { ShopPage } from '../pages/shop.page';

type ShopFixtures = {
  cartPage: CartPage;
  homePage: HomePage;
  productPage: ProductPage;
  shopPage: ShopPage;
};

export const test = base.extend<ShopFixtures>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },
});

export { expect };
