import {
  ratingMetadata,
  type RatingKey,
  type RatingsData,
} from "../models/Ratings";

export const RatingSlider = ({
  ratingId,
  ratingsData,
  setRatingsData,
}: {
  ratingId: RatingKey;
  ratingsData: RatingsData;
  setRatingsData: React.Dispatch<React.SetStateAction<RatingsData>>;
}) => {
  const rating = ratingMetadata.find((x) => x.id === ratingId);

  if (!rating) {
    throw new Error(`Rating metadata not found for id: ${ratingId}`);
  }

  const getSliderClass = (value: number): string => {
    if (value <= 3) return "range-error";
    if (value <= 6) return "range-warning";
    return "range-success";
  };

  const getValueClass = (value: number): string => {
    if (value <= 3) return "text-error";
    if (value <= 6) return "text-warning";
    return "text-success";
  };

  return (
    <div key={ratingId} className="mb-1 px-2 py-1.5">
      <span className="text-base font-bold truncate block leading-snug">{rating.label}</span>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="italic text-xs text-base-content/40 shrink-0 w-16 text-right leading-tight">
          {rating.minString}
        </span>
        <div className="flex-1 flex flex-col items-center gap-0.5">
          <span
            className={`text-2xl font-black leading-none tabular-nums ${getValueClass(ratingsData[ratingId])}`}
          >
            {ratingsData[ratingId]}
          </span>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={ratingsData[ratingId]}
            className={`w-full range range-xs ${getSliderClass(ratingsData[ratingId])}`}
            onChange={(e) =>
              setRatingsData((prev) => ({
                ...prev,
                [ratingId]: Number(e.target.value),
              }))
            }
          />
        </div>
        <span className="italic text-xs text-base-content/40 shrink-0 w-16 leading-tight">
          {rating.maxString}
        </span>
      </div>
    </div>
  );
};
