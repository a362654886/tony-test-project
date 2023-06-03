import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import MainPage from "./mainPage";

describe("MainPage", () => {
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    }
  });

  it("renders without crashing", () => {
    act(() => {
      render(<MainPage />, container);
    });
    expect(container?.textContent).toBeDefined();
  });
});
