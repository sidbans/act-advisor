import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../components/Modal";

// Mock db
vi.mock("../utils/db", () => ({
  addRating: vi.fn(() => Promise.resolve()),
}));

// Mock queries
vi.mock("../utils/queries", () => ({
  useRefreshQueries: () => vi.fn(),
}));

describe("Modal", () => {
  it("renders all 6 rating sliders", () => {
    render(<Modal setModalOpen={vi.fn()} />);
    expect(screen.getByText(/Present Moment:/)).toBeInTheDocument();
    expect(screen.getByText(/Values:/)).toBeInTheDocument();
    expect(screen.getByText(/Committed Action:/)).toBeInTheDocument();
    expect(screen.getByText(/Self as Context:/)).toBeInTheDocument();
    expect(screen.getByText(/Defusion:/)).toBeInTheDocument();
    expect(screen.getByText(/Acceptance:/)).toBeInTheDocument();
  });

  it("renders Add and Cancel buttons", () => {
    render(<Modal setModalOpen={vi.fn()} />);
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls setModalOpen(false) on Cancel", () => {
    const setModalOpen = vi.fn();
    render(<Modal setModalOpen={setModalOpen} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(setModalOpen).toHaveBeenCalledWith(false);
  });

  it("calls addRating and closes on Add", async () => {
    const { addRating } = await import("../utils/db");
    const setModalOpen = vi.fn();
    render(<Modal setModalOpen={setModalOpen} />);
    fireEvent.click(screen.getByText("Add"));
    expect(addRating).toHaveBeenCalled();
    expect(setModalOpen).toHaveBeenCalledWith(false);
  });
});
