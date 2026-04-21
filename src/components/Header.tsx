import { useRef } from "react";
import { MoonStar } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { deleteAllRatings, exportRatings, importRatings } from "../utils/db";
import { useRefreshQueries } from "../utils/queries";

export const Header = () => {
  const themeContext = useTheme();
  const refresh = useRefreshQueries();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    const data = await exportRatings();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `act-advisor-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error("Expected an array");
      await importRatings(data);
      refresh();
    } catch (err) {
      console.error("Import failed:", err);
      alert("Import failed — file must be a valid JSON array of ratings.");
    }

    // Reset so the same file can be re-imported
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="navbar bg-base-300 px-3 md:px-6">
      <div className="text-base md:text-lg font-bold flex-1">Act Advisor</div>
      <label className="flex cursor-pointer items-center gap-2">
        <MoonStar size={16} />
        <input
          className="toggle toggle-sm sm:toggle-md mx-1"
          type="checkbox"
          checked={themeContext?.isDarkMode}
          onChange={() =>
            themeContext?.setIsDarkMode(!themeContext?.isDarkMode)
          }
        />
        <MoonStar size={16} />
      </label>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>More</summary>
              <ul className="bg-base-300 rounded-t-none p-2 z-50">
                <li>
                  <a onClick={handleExport}>Export data</a>
                </li>
                <li>
                  <a onClick={() => fileInputRef.current?.click()}>
                    Import data
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      deleteAllRatings().then(() => {
                        refresh();
                      });
                    }}
                  >
                    Clear data
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
      </div>
    </div>
  );
};
