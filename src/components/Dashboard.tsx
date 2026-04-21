import { Modal } from "./Modal";
import { useState } from "react";
import { useAverageRatings, useRatingsPage } from "../utils/queries";
import { Greeting } from "./Greeting";
import { RadarComponent } from "./Radar";
import { Table } from "./Table";

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data: pageData } = useRatingsPage(page);
  const { data: averageRatings } = useAverageRatings();

  return (
    <div>
      <Greeting setModalOpen={setModalOpen} />
      <RadarComponent
        averageRatings={averageRatings || []}
        pageDataTotalCount={pageData?.totalCount}
      />
      <Table pageData={pageData} page={page} setPage={setPage} />
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
};
