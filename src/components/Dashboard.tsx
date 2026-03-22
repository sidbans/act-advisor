import { useAuth } from "../contexts/AuthContext";
import { Modal } from "./Modal";
import { useState } from "react";
import { useAverageRatings, useUserRatingsPage } from "../utils/queries";
import { Greeting } from "./Greeting";
import { RadarComponent } from "./Radar";
import { Table } from "./Table";

export const Dashboard = () => {
  const auth = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data: pageData } = useUserRatingsPage(auth.user?.id, page);

  const { data: averageRatings } = useAverageRatings(auth.user?.id);

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
