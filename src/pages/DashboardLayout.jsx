import React from 'react'
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import LineChartComponent from '../components/charts/LineChart';
import PieChartComponent from '../components/charts/PieChart';
import BarChartComponent from '../components/charts/BarChart';


const DashboardLayout = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <CardTitle>Total Users</CardTitle>
            <p className="text-2xl font-bold text-blue-600">1,245</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <CardTitle>Total Sales</CardTitle>
            <p className="text-2xl font-bold text-green-600">$82,000</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardContent className="pt-6">
            <CardTitle>Total Profit</CardTitle>
            <p className="text-2xl font-bold text-yellow-600">$24,500</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent />
        <PieChartComponent />
      </div>
      <BarChartComponent />
    </div>

  )
}

export default DashboardLayout