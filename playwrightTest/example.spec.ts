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

  const button = await page.getByTestId("MainButton");

  const buttonBoundingBox = await button.boundingBox();
  if (buttonBoundingBox) {
    const buttonX = buttonBoundingBox.x + buttonBoundingBox.width / 2;
    const buttonY = buttonBoundingBox.y + buttonBoundingBox.height / 2;

    await page.mouse.move(buttonX, buttonY);

    await page.mouse.down();
    await page.mouse.up();

    // wait for 5 seconds
    await page.waitForFunction(
      () => {
        return true;
      },
      {},
      { timeout: 5000 }
    );

    await page.mouse.down();

    await page.waitForFunction(
      () => {
        return true;
      },
      {},
      { timeout: 2000 }
    );
    await page.mouse.up();
  }

  const newSecondTimerText = await page
    .getByTestId("SecondTimerText")
    .innerText();

  expect(newSecondTimerText).toEqual("Second Timer:0.00");

  return;
});
