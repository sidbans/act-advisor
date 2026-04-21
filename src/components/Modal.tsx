import { useState } from "react";
import {
  getInitialRatingsData,
  ratingKeys,
  type RatingsData,
} from "../models/Ratings";
import { RatingSlider } from "./RatingSlider";
import { addRating } from "../utils/db";
import { useRefreshQueries } from "../utils/queries";

export const Modal = ({
  setModalOpen,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [ratingsData, setRatingsData] = useState<RatingsData>(
    getInitialRatingsData(),
  );

  const refresh = useRefreshQueries();

  const handleAdd = async () => {
    await addRating(ratingsData);
    refresh();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 sm:w-10/12 max-w-5xl">
        <h3 className="font-bold text-base md:text-lg">How do you feel right now?</h3>
        <div className="py-4">
          {ratingKeys.map((ratingId) => (
            <RatingSlider
              key={ratingId}
              ratingId={ratingId}
              ratingsData={ratingsData}
              setRatingsData={setRatingsData}
            />
          ))}
        </div>
        <div className="modal-action">
          <button
            className="btn btn-success"
            onClick={() => {
              handleAdd();
              setModalOpen(false);
            }}
          >
            Add
          </button>
          <button className="btn btn-error" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
