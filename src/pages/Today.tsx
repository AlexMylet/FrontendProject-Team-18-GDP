
import TopBanner from "@/components/TopBanner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Gauge, BarChart2, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CircularProgress } from "@/components/ui/circular-progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Today = () => {
  const rawProductData = [
    { name: "Product A", sales: 320, lastWeekSales: 280 },
    { name: "Product B", sales: 450, lastWeekSales: 420 },
    { name: "Product C", sales: 280, lastWeekSales: 300 },
    { name: "Product D", sales: 390, lastWeekSales: 360 },
    { name: "Product E", sales: 200, lastWeekSales: 180 },
    { name: "Product F", sales: 340, lastWeekSales: 310 },
    { name: "Product G", sales: 280, lastWeekSales: 260 },
  ];

  const productData = rawProductData.map(item => ({
    name: item.name,
    lastWeekSales: item.lastWeekSales,
    difference: item.sales - item.lastWeekSales,
    differenceColor: item.sales >= item.lastWeekSales ? "#4CAF50" : "#FF5252"
  }));

  const weekOverview = {
    sales: {
      current: "£38,450",
      lastWeek: "£35,200",
      lastYear: "£29,800",
      weekChange: "+9.2%",
      yearChange: "+29.0%"
    },
    expenses: {
      current: "£15,230",
      lastWeek: "£14,800",
      lastYear: "£12,500",
      weekChange: "+2.9%",
      yearChange: "+21.8%"
    },
    grossProfit: {
      current: "£23,220",
      lastWeek: "£20,400",
      lastYear: "£17,300",
      weekChange: "+13.8%",
      yearChange: "+34.2%"
    },
    netProfit: {
      current: "£18,576",
      lastWeek: "£16,320",
      lastYear: "£13,840",
      weekChange: "+13.8%",
      yearChange: "+34.2%"
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#F97316]">
      <TopBanner />
      <div className="p-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <Card className="bg-black border border-[#F97316]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium text-[#F97316]">Sales</CardTitle>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-[#F97316]" />
                  <Dialog>
                    <DialogTrigger>
                      <ArrowRight className="h-4 w-4 text-[#F97316] cursor-pointer hover:text-[#F97316]/80 transition-colors" />
                    </DialogTrigger>
                    <DialogContent className="bg-black border border-[#F97316]/20">
                      <DialogHeader>
                        <DialogTitle className="text-[#F97316]">Today's Salient Points</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <ul className="list-disc pl-5 space-y-2 text-white">
                          <li>Upselling with <strong>10%</strong> discount for complementary items delivered <strong>20%</strong> more profit in pop up store A last week</li>
                          <li>Consider doing this to meet today's sales goal</li>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <CircularProgress 
                    value={65}
                    currentValue="£5,436"
                    targetValue="£8,500"
                    label="of daily target"
                    size={140}
                    strokeWidth={10}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border border-[#F97316]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-lg font-medium text-[#F97316]">Product Sales</CardTitle>
                <BarChart2 className="h-4 w-4 text-[#F97316]" />
              </CardHeader>
              <CardContent className="pb-2">
                <div className="h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productData} barSize={8} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#FFFFFF', fontSize: 12 }}
                        axisLine={{ stroke: '#FFFFFF' }}
                        tickLine={{ stroke: '#FFFFFF' }}
                      />
                      <YAxis 
                        tick={{ fill: '#FFFFFF', fontSize: 12 }}
                        axisLine={{ stroke: '#FFFFFF' }}
                        tickLine={{ stroke: '#FFFFFF' }}
                        label={{ 
                          value: 'Units sold',
                          angle: -90,
                          position: 'insideLeft',
                          style: { fill: '#FFFFFF' }
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#000',
                          border: '1px solid #F97316',
                          borderRadius: '4px',
                        }}
                        labelStyle={{ color: '#FFFFFF' }}
                        formatter={(value: number | string, name: string) => {
                          if (name === "Growth") {
                            const numValue = Number(value);
                            return [`${numValue >= 0 ? '+' : ''}${value}`, 'Growth'];
                          }
                          return [value, name];
                        }}
                      />
                      <Legend 
                        verticalAlign="top"
                        height={36}
                        formatter={(value) => {
                          return <span style={{ color: '#FFFFFF' }}>{value}</span>;
                        }}
                      />
                      <Bar stackId="sales" dataKey="lastWeekSales" name="Last Week" fill="#F97316" />
                      <Bar stackId="sales" dataKey="difference" name="Growth" fill="#4CAF50" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border border-[#F97316]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
                <CardTitle className="text-lg font-medium text-[#F97316]">Week Overview</CardTitle>
                <Dialog>
                  <DialogTrigger>
                    <ArrowRight className="h-4 w-4 text-[#F97316] cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="bg-black border-[#F97316]/20 text-white w-[90%] max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-[#F97316]">This Week's Performance</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-4 gap-2 pb-2 border-b border-[#F97316]/20">
                        <span className="text-[#F97316]/80">Metric</span>
                        <span className="text-[#F97316]/80 text-right">Current</span>
                        <span className="text-[#F97316]/80 text-right">vs Last Week</span>
                        <span className="text-[#F97316]/80 text-right">vs Last Year</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <span className="text-white">Sales</span>
                        <span className="text-[#F97316] font-bold text-right">{weekOverview.sales.current}</span>
                        <span className={`text-right ${weekOverview.sales.weekChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {weekOverview.sales.weekChange}
                        </span>
                        <span className={`text-right ${weekOverview.sales.yearChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {weekOverview.sales.yearChange}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <span className="text-white">Expenses</span>
                        <span className="text-[#F97316] font-bold text-right">{weekOverview.expenses.current}</span>
                        <span className={`text-right ${weekOverview.expenses.weekChange.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                          {weekOverview.expenses.weekChange}
                        </span>
                        <span className={`text-right ${weekOverview.expenses.yearChange.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                          {weekOverview.expenses.yearChange}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <span className="text-white">Estimated Gross Profit</span>
                        <span className="text-[#F97316] font-bold text-right">{weekOverview.grossProfit.current}</span>
                        <span className={`text-right ${weekOverview.grossProfit.weekChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {weekOverview.grossProfit.weekChange}
                        </span>
                        <span className={`text-right ${weekOverview.grossProfit.yearChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {weekOverview.grossProfit.yearChange}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <span className="text-white">Estimated Net Profit</span>
                        <span className="text-[#F97316] font-bold text-right">{weekOverview.netProfit.current}</span>
                        <span className={`text-right ${weekOverview.netProfit.weekChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {weekOverview.netProfit.weekChange}
                        </span>
                        <span className={`text-right ${weekOverview.netProfit.yearChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {weekOverview.netProfit.yearChange}
                        </span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
