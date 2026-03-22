import { useTheme } from "../contexts/ThemeContext";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { chartTheme } from "../models/Chart";

interface RadarProps {
  averageRatings: any[];
  pageDataTotalCount: number | undefined;
}

export const RadarComponent = ({
  averageRatings,
  pageDataTotalCount,
}: RadarProps) => {
  const { isDarkMode } = useTheme();
  const theme = chartTheme(isDarkMode);

  return (
    <div id="spider-graph" className="text-center h-74 md:h-100 px-4">
      <div className="text-sm md:text-xl mb-2">
        Your average scores over {pageDataTotalCount} entries
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={averageRatings}
          margin={{ top: 40, right: 10, bottom: 10, left: 10 }}
        >
          <PolarGrid stroke={theme.grid} />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fill: theme.text, fontSize: 11 }}
          />
          <PolarRadiusAxis
            domain={[1, 10]}
            tickCount={5}
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <Radar
            dataKey="score"
            stroke={theme.primary}
            fill={theme.primary}
            fillOpacity={0.5}
          />
          <Tooltip
            content={({ payload }) => {
              if (payload?.[0]) {
                return (
                  <div className="bg-base-100 px-2 py-1 text-sm">
                    {payload[0].value}
                  </div>
                );
              }
              return null;
            }}
            isAnimationActive={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
