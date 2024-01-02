import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have a focused search input", async ({ page }) => {
    const input = page.locator("input");

    await expect(input).toBeVisible();
    await expect(input).toBeFocused();
  });

  test("should have a input with placeholder 'Search for a GitHub repository...'", async ({
    page,
  }) => {
    const input = page.locator("input");
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute(
      "placeholder",
      "Search for a GitHub repository..."
    );
  });

  test('should not show the "Reset" button', async ({ page }) => {
    const resetButton = page.getByText("Reset");
    await expect(resetButton).toBeHidden();
  });

  test.describe("Search ressult", () => {
    test.beforeEach(async ({ page }) => {
      const input = page.locator("input");
      await input.fill("react");

      const searchResults = page.locator('[data-testid="search-results"]');
      await expect(searchResults).toBeVisible();
    });

    test("should load the results", async ({ page }) => {
      // check if the div has 20 children
      const numberOfChildren = page.locator(
        '[data-testid="search-results"] > div'
      );

      await expect(numberOfChildren).toHaveCount(20);
    });

    test("should toggle the transparent state of a single search result when clicked", async ({
      page,
    }) => {
      // click on the first search result
      const firstSearchResult = page
        .locator('[data-testid="single-result"]')
        .first();
      await expect(firstSearchResult).toBeVisible();

      await firstSearchResult.click();

      // should be 50% transparent
      await expect(firstSearchResult).toHaveCSS("opacity", "0.5");

      // cick on it again
      await firstSearchResult.click();

      // should be reset its transparent state
      await expect(firstSearchResult).toHaveCSS("opacity", "1");
    });

    test('should enable the "Reset" button if atleast one search result is clicked and changed its transparent state to 50%', async ({
      page,
    }) => {
      // click on the first search result
      const firstSearchResult = page
        .locator('[data-testid="single-result"]')
        .first();
      await expect(firstSearchResult).toBeVisible();

      await firstSearchResult.click();

      // should be 50% transparent
      await expect(firstSearchResult).toHaveCSS("opacity", "0.5");

      const resetButton = page.getByText("Reset");
      await expect(resetButton).toBeEnabled();
    });

    test('should disable the "Reset" button if all clicked search results are clicked again to reset the transparent state', async ({
      page,
    }) => {
      // click on the first search result
      const firstSearchResult = page
        .locator('[data-testid="single-result"]')
        .first();
      await expect(firstSearchResult).toBeVisible();
      await firstSearchResult.click();

      // should be 50% transparent
      await expect(firstSearchResult).toHaveCSS("opacity", "0.5");

      // cick on it again
      await firstSearchResult.click();

      // should be reset its transparent state
      await expect(firstSearchResult).toHaveCSS("opacity", "1");

      const resetButton = page.getByText("Reset");
      await expect(resetButton).toBeDisabled();
    });

    test('should reset the transparent state of the clicked results after "Reset" button is clicked', async ({
      page,
    }) => {
      // click on the first search result
      const firstSearchResult = page
        .locator('[data-testid="single-result"]')
        .first();
      await expect(firstSearchResult).toBeVisible();
      await firstSearchResult.click();

      // should be 50% transparent
      await expect(firstSearchResult).toHaveCSS("opacity", "0.5");

      const resetButton = page.getByText("Reset");
      await expect(resetButton).toBeVisible();
      await expect(resetButton).toBeEnabled();

      // click on the reset button
      await resetButton.click();

      // should be reset its transparent state
      await expect(firstSearchResult).toHaveCSS("opacity", "1");
    });

    test("should show the search results in a grid of 4 columns on screens >= 700px", async ({
      page,
    }) => {
      const searchResults = page.locator('[data-testid="search-results"]');

      // get the width of the search results container
      const containerWidth = await searchResults
        .boundingBox()
        .then((box) => box?.width || 0);

      // get the width of a single result
      const resultWidth = await searchResults
        .locator('[data-testid="single-result"]')
        .first()
        .boundingBox()
        .then((box) => box?.width || 0);

      // number of items per row
      const itemsPerRow = Math.floor(containerWidth / resultWidth);

      // number of items per row should be 4 on screen width >= 700px
      expect(itemsPerRow).toBe(4);
    });

    test("should show the search results in a grid of 2 columns on screens < 700px", async ({
      page,
    }) => {
      await page.setViewportSize({
        width: 650,
        height: 480,
      });

      const searchResults = page.locator('[data-testid="search-results"]');

      // get the width of the search results container
      const containerWidth = await searchResults
        .boundingBox()
        .then((box) => box?.width || 0);

      // get the width of a single result
      const resultWidth = await searchResults
        .locator('[data-testid="single-result"]')
        .first()
        .boundingBox()
        .then((box) => box?.width || 0);

      // number of items per row
      const itemsPerRow = Math.floor(containerWidth / resultWidth);

      // number of items per row should be 2 on screen width < 700px
      expect(itemsPerRow).toBe(2);
    });

    test("should have a link on each search result to view detail page of that search result", async ({
      page,
    }) => {
      const firstSearchResultLink = page.getByText("View repository").first();
      await expect(firstSearchResultLink).toBeVisible();
    });

    test('should navigate to the detail page of the clicked search result when "View repository" link is clicked', async ({
      page,
    }) => {
      const firstSearchResultLink = page.getByText("View repository").first();
      await expect(firstSearchResultLink).toBeVisible();

      await firstSearchResultLink.click();
      await page.waitForURL("**/react?search=react");

      const heading = page.locator("h1");
      await expect(heading).toHaveText("react");
    });
  });
});
