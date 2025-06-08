import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts'; // Example imports

// Define a generic data structure for the chart
// This can be made more specific based on actual financial data
interface ChartDataItem {
  name: string; // e.g., month, category
  value1: number;
  value2?: number; // Optional second value for comparison
}

interface FinancialOverviewChartProps {
  title: string;
  description?: string;
  data: ChartDataItem[];
  chartType?: 'line' | 'bar';
  // Add more props for customization: colors, specific keys for data, etc.
}

const FinancialOverviewChart: React.FC<FinancialOverviewChartProps> = ({
  title,
  description,
  data,
  chartType = 'line',
}) => {
  console.log("Rendering FinancialOverviewChart with title:", title, "data points:", data.length, "chartType:", chartType);

  if (!data || data.length === 0) {
    console.warn("FinancialOverviewChart: No data provided.");
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          <p>No data available to display chart.</p>
        </CardContent>
      </Card>
    );
  }

  const renderChart = () => {
    if (chartType === 'bar') {
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value1" fill="hsl(var(--primary))" name="Amount" />
          {data[0]?.value2 !== undefined && <Bar dataKey="value2" fill="hsl(var(--secondary))" name="Comparison" />}
        </BarChart>
      );
    }
    // Default to line chart
    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value1" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} name="Value 1" />
        {data[0]?.value2 !== undefined && <Line type="monotone" dataKey="value2" stroke="hsl(var(--secondary))" name="Value 2" />}
      </LineChart>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FinancialOverviewChart;