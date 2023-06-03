import { render, unmountComponentAtNode } from "react-dom";
import { act } from "@testing-library/react";
import MillionSecondTimer from "./millionSecondTimer";
import { createRoot } from "react-dom/client";
import "@jest/fake-timers";

describe("MillionSecondTimer", () => {
  let container: HTMLDivElement | null = null;
  const sendNewItemOfFiveTimesMock = jest.fn();

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  it("renders without crashing", () => {
    act(() => {
      createRoot(container!).render(
        <MillionSecondTimer
          countState={true}
          sendNewItemOfFiveTimes={sendNewItemOfFiveTimesMock}
        />
      );
    });
    expect(container?.textContent).toBeDefined();
  });

  it("does not increment time when countState is false", () => {
    act(() => {
      createRoot(container!).render(
        <MillionSecondTimer
          countState={false}
          sendNewItemOfFiveTimes={sendNewItemOfFiveTimesMock}
        />
      );
    });

    // Simulate time passing (100ms passed)
    act(() => {
      jest.useFakeTimers(); // Enable fake timers
      jest.advanceTimersByTime(100); // Advance timers by 100ms
    });

    // Check if the time remains unchanged
    expect(container?.textContent).toBe("Million Second Timer: 0.00");
  });
});
