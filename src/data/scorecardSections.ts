export const sections = [
  {
    id: 1,
    title: "January leader board",
    subtitle: "",
    chartData: [
      { date: "Jan", value: 30000 },
      { date: "Feb", value: 35000 },
      { date: "Mar", value: 45000 },
      { date: "Apr", value: 40000 },
      { date: "May", value: 50000 },
      { date: "Jun", value: 55000 },
    ],
    showDonutChart: true,
  },
  {
    id: 2,
    title: "Inventory vs. Sales",
    subtitle: "",
    chartData: [
      { date: "Nov", sales: 72000, inventory: 40 },
      { date: "Dec", sales: 78000, inventory: 30 },
      { date: "Jan", sales: 85000, inventory: 20 },
    ],
  },
  {
    id: 3,
    title: "Return Rate",
    subtitle: "From 1rst Oct. 2024 to today. Last quarter: 2.9%",
    chartData: [{ value: 3 }],
    showBigNumber: true,
    numberSuffix: "%",
  },
];
