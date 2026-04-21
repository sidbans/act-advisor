import { describe, it, expect } from "vitest";
import { chartTheme } from "../models/Chart";

describe("chartTheme", () => {
  it("returns dark mode colors", () => {
    const theme = chartTheme(true);
    expect(theme.grid).toBe("#6b7280");
    expect(theme.text).toBe("#f3f4f6");
    expect(theme.primary).toBe("#818cf8");
  });

  it("returns light mode colors", () => {
    const theme = chartTheme(false);
    expect(theme.grid).toBe("#d1d5db");
    expect(theme.text).toBe("#374151");
    expect(theme.primary).toBe("#6366f1");
  });
});
