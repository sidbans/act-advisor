import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../components/Header";
import { ThemeContext } from "../contexts/ThemeContext";

// Mock db functions
vi.mock("../utils/db", () => ({
  deleteAllRatings: vi.fn(() => Promise.resolve()),
  exportRatings: vi.fn(() => Promise.resolve([])),
  importRatings: vi.fn(() => Promise.resolve()),
}));

// Mock queries
vi.mock("../utils/queries", () => ({
  useRefreshQueries: () => vi.fn(),
}));

const renderWithTheme = (isDarkMode = true) => {
  return render(
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode: vi.fn() }}>
      <Header />
    </ThemeContext.Provider>,
  );
};

describe("Header", () => {
  it("renders the app title", () => {
    renderWithTheme();
    expect(screen.getByText("Act Advisor")).toBeInTheDocument();
  });

  it("renders the theme toggle", () => {
    renderWithTheme();
    const toggle = screen.getByRole("checkbox");
    expect(toggle).toBeInTheDocument();
  });

  it("has Export, Import, and Clear data menu items", () => {
    renderWithTheme();
    expect(screen.getByText("Export data")).toBeInTheDocument();
    expect(screen.getByText("Import data")).toBeInTheDocument();
    expect(screen.getByText("Clear data")).toBeInTheDocument();
  });

  it("does not have Sign out", () => {
    renderWithTheme();
    expect(screen.queryByText("Sign out")).not.toBeInTheDocument();
  });

  it("calls deleteAllRatings when Clear data is clicked", async () => {
    const { deleteAllRatings } = await import("../utils/db");
    renderWithTheme();
    fireEvent.click(screen.getByText("Clear data"));
    expect(deleteAllRatings).toHaveBeenCalled();
  });
});
