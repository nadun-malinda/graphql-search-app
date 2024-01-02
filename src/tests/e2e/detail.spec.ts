import { test, expect } from "@playwright/test";

test.describe("Detail page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/facebook/react?search=react");
  });

  test("should have a title", async ({ page }) => {
    const title = page.locator("h1");
    await expect(title).toBeVisible();
    await expect(title).toHaveText("react");
  });

  test("should have a link to go home", async ({ page }) => {
    const link = page.getByText("Home");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/?search=react");
  });

  test('should go home whne "Home" link is clicked', async ({ page }) => {
    const link = page.getByText("Home");
    await expect(link).toBeVisible();
    await link.click();

    await page.waitForURL("/?search=react");

    const input = page.locator("input");
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();
    await expect(input).toHaveValue("react");
  });
});
