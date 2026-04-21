import { describe, it, expect } from "vitest";
import {
  ratingKeys,
  ratingMetadata,
  getInitialRatingsData,
} from "../models/Ratings";

describe("ratingKeys", () => {
  it("has 6 keys", () => {
    expect(ratingKeys).toHaveLength(6);
  });

  it("each key has matching metadata", () => {
    for (const key of ratingKeys) {
      expect(ratingMetadata.find((m) => m.id === key)).toBeDefined();
    }
  });
});

describe("ratingMetadata", () => {
  it("each entry has label, minString, maxString", () => {
    for (const m of ratingMetadata) {
      expect(m.label).toBeTruthy();
      expect(m.minString).toBeTruthy();
      expect(m.maxString).toBeTruthy();
    }
  });
});

describe("getInitialRatingsData", () => {
  it("returns all keys set to 5", () => {
    const data = getInitialRatingsData();
    for (const key of ratingKeys) {
      expect(data[key]).toBe(5);
    }
  });
});
