import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userDistribution } from "@/utils/data";

const COLORS = ["#3b82f6", "#10b981", "#fbbf24", "#ef4444"];

const PieChartComponent = () => {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          User Distribution by Region
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userDistribution}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              dataKey="value"
            >
              {userDistribution.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PieChartComponent