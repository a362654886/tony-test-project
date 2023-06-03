import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SecondTimeComponent from "./secondTimer";
import {
  cancelObservable,
  createObservable,
  subscribeObservable,
} from "../../utils/observables";
import { createRoot } from "react-dom/client";

jest.mock("../../utils/observables", () => {
  return {
    createObservable: jest.fn(),
    subscribeObservable: jest.fn(),
    cancelObservable: jest.fn(),
  };
});

describe("SecondTimeComponent", () => {
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  it("renders without crashing", () => {
    act(() => {
      render(<SecondTimeComponent countState={true} />, container);
    });
    expect(container?.textContent).toBeDefined();
  });

  it("subscribes to the observable when countState is true", () => {
    act(() => {
      render(<SecondTimeComponent countState={true} />, container);
    });
    expect(createObservable).toHaveBeenCalled();
    expect(subscribeObservable).toHaveBeenCalled();
  });

  it("does not subscribe to the observable when countState is false", () => {
    act(() => {
      render(<SecondTimeComponent countState={false} />, container);
    });
    expect(createObservable).not.toHaveBeenCalled();
    expect(subscribeObservable).not.toHaveBeenCalled();
  });
});
