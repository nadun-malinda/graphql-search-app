import { test, expect } from "@playwright/test";

const GITHUB_API = process.env.GITHUB_API || "https://api.github.com/graphql";

test("homepage should have a focused search input", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("input");

  const activeElement = await page.evaluate(
    () => document.activeElement?.tagName
  );

  expect(activeElement).toBe("INPUT");
});

test("homepage should have a input with placeholder 'Search for a GitHub repository...'", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForSelector("input");

  const placeholder = await page.evaluate(
    () => document.querySelector("input")?.placeholder
  );
  expect(placeholder).toBe("Search for a GitHub repository...");
});

// test("homepage should show skeleton loading when start searching", async ({
//   page,
// }) => {
//   await page.goto("/");
//   await page.waitForSelector("input");

//   await page.fill("input", "react");

//   await expect(page.getByTestId("loading-skeleton")).toBeVisible();

//   //   const skeletonLoading = await page.isVisible(".skeleton-loading");
//   //   expect(skeletonLoading).toBeTruthy();
// });

test("should load the results", async ({ request }) => {
  const response = await request.post(GITHUB_API, {});

  // const response = await request.post('/graphql', {
  //     query: `
  //     query {
  //         search(query: "react", type: REPOSITORY, first: 10) {
  //         edges {
  //             node {
  //             ... on Repository {
  //                 name
  //             }
  //             }
  //         }
  //         }
  //     }
  //     `,
  // });

  // expect(response.status()).toBe(200);
  // expect(response.json().data.search.edges.length).toBe(10);
  // expect(response.json().data.search.edges[0].node.name).toBe('react');
});
