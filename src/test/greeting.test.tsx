import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Greeting } from "../components/Greeting";

describe("Greeting", () => {
  it("renders a time-of-day greeting", () => {
    render(<Greeting setModalOpen={vi.fn()} />);
    const greeting = screen.getByText(/good (morning|afternoon|evening)/i);
    expect(greeting).toBeInTheDocument();
  });

  it("renders 'Add new rating' button", () => {
    render(<Greeting setModalOpen={vi.fn()} />);
    expect(screen.getByText("Add new rating")).toBeInTheDocument();
  });

  it("calls setModalOpen(true) when button is clicked", () => {
    const setModalOpen = vi.fn();
    render(<Greeting setModalOpen={setModalOpen} />);
    fireEvent.click(screen.getByText("Add new rating"));
    expect(setModalOpen).toHaveBeenCalledWith(true);
  });
});
