import { test, expect } from "@playwright/test";

test("homepage has title and links to intro page", async ({ page }) => {
  //1. go to test page
  await page.goto("https://master.d2wtgak6p58zzd.amplifyapp.com/");

  const initialSecondTimerText = await page
    .getByTestId("SecondTimerText")
    .innerText();
  const initialMillionSecondTimerText = await page
    .getByTestId("MillionSecondTimerText")
    .innerText();

  expect(initialSecondTimerText).toEqual("Second Timer:0.00");
  expect(initialMillionSecondTimerText).toEqual("Million Second Timer: 0.00");

  return;
});
