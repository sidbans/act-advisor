import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../components/Footer";

describe("Footer", () => {
  it("renders attribution text", () => {
    render(<Footer />);
    expect(screen.getByText(/Made with/)).toBeInTheDocument();
    expect(screen.getByText(/Siddhant Bansal/)).toBeInTheDocument();
  });
});
