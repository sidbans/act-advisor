import { ratingKeys, ratingMetadata } from "../models/Ratings";

interface PageData {
  rows: any[];
  totalCount: number;
}

interface TableProps {
  pageData: PageData | undefined;
  page: number;
  setPage: (page: number) => void;
}

export const Table = ({ pageData, page, setPage }: TableProps) => {
  return (
    <>
      <div id="ratings-table" className="m-4 md:mx-10 overflow-x-auto">
        <table className="table table-zebra table-xs md:table-sm">
          <thead>
            <tr>
              <th className="table-cell">Created At</th>
              {ratingMetadata.map((x) => (
                <th key={x.id} className="whitespace-nowrap">
                  <div
                    className="max-w-20 md:max-w-none truncate"
                    title={x.label}
                  >
                    <span className="hidden md:inline">{x.label}</span>
                    <span className="md:hidden">
                      {x.label.replace(/_/g, " ")}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData?.rows.map((row) => (
              <tr key={row.id}>
                <td className="table-cell whitespace-nowrap">
                  {new Date(row.created_at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </td>
                {ratingKeys.map((k) => (
                  <td key={k} className="whitespace-nowrap">
                    {row[k]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="m-4 md:mx-10 mt-4 flex gap-2 justify-center flex-wrap px-1">
        {pageData &&
          Array.from({ length: Math.ceil(pageData.totalCount / 5) }).map(
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-2 py-1 text-xs rounded min-w-7 ${
                  page === i + 1 ? "bg-primary text-white" : "bg-base-200"
                }`}
              >
                {i + 1}
              </button>
            ),
          )}
      </div>
    </>
  );
};
