import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RatingSlider } from "../components/RatingSlider";
import { getInitialRatingsData } from "../models/Ratings";

describe("RatingSlider", () => {
  it("renders label with current value", () => {
    render(
      <RatingSlider
        ratingId="present_moment"
        ratingsData={getInitialRatingsData()}
        setRatingsData={vi.fn()}
      />,
    );
    expect(screen.getByText("Present Moment: 5")).toBeInTheDocument();
  });

  it("renders min and max descriptions", () => {
    render(
      <RatingSlider
        ratingId="present_moment"
        ratingsData={getInitialRatingsData()}
        setRatingsData={vi.fn()}
      />,
    );
    expect(screen.getByText("Lost attention on past or future")).toBeInTheDocument();
    expect(screen.getByText("Purposeful attention to present moment")).toBeInTheDocument();
  });

  it("renders a range input with min=1 max=10", () => {
    render(
      <RatingSlider
        ratingId="values"
        ratingsData={getInitialRatingsData()}
        setRatingsData={vi.fn()}
      />,
    );
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "1");
    expect(slider).toHaveAttribute("max", "10");
  });
});
