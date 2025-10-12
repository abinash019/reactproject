import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { salesData } from "@/utils/data";

const BarChartComponent = () => {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Sales vs Profit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default BarChartComponent