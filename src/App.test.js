import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Home from "./components/Home";
import { BrowserRouter } from "react-router-dom";

//App
test("First Render", () => {
  render(<App />);
  const linkElement = screen.getByText(/Rendered/i);
  expect(linkElement).toBeInTheDocument();
});

//Home component

//buttons
describe("Home component create and sort buttons", () => {
  it("renders correctly within a Router", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check for elements that are always rendered
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Sort")).toBeInTheDocument();
  });
});

//table header
describe("Home component table header", () => {
  it("renders correctly and shows table headers", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check for table headers
    const tableHeaders = screen.getAllByRole("columnheader");
    expect(tableHeaders.length).toBe(4); // Should have 4 headers
    expect(tableHeaders[0].textContent).toBe("Name");
    expect(tableHeaders[1].textContent).toBe("Year");
    expect(tableHeaders[2].textContent).toBe("Average");
    expect(tableHeaders[3].textContent).toBe("Operations");
  });
});

//table content
describe("Home component table content", () => {
  it("renders correctly and shows table headers", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check for table content
    const tableRow = screen.getAllByRole("cell");
    expect(tableRow[0].textContent).toBe("Sam Smith");
    expect(tableRow[1].textContent).toBe("3");
    expect(tableRow[2].textContent).toBe("4.1");

    expect(tableRow[0].textContent).toBe("Olivia Jones");
    expect(tableRow[1].textContent).toBe("1");
    expect(tableRow[2].textContent).toBe("3.8");

    expect(tableRow[0].textContent).toBe("Noah Miller");
    expect(tableRow[1].textContent).toBe("2");
    expect(tableRow[2].textContent).toBe("2.8");

    expect(tableRow[0].textContent).toBe("Mia Garcia");
    expect(tableRow[1].textContent).toBe("1");
    expect(tableRow[2].textContent).toBe("3.5");
  });
});
