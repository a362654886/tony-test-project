import { test, expect } from "@playwright/test";

test("homepage has title and links to intro page", async ({ page }) => {
  //1. go to test page
  await page.goto("https://master.d2wtgak6p58zzd.amplifyapp.com/");

  return;
});
