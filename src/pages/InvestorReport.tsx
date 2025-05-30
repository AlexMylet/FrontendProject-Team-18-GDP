import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FinancialChart from "@/components/FinancialChart";
import InsightCards from "@/components/InsightCards";

const InvestorReport = () => {
  const handleExport = () => {
    console.log("Exporting report...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-obsidian-dark via-obsidian-DEFAULT to-obsidian-light font-quicksand">
      <div className="w-full px-4 py-2 bg-obsidian-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between mb-4">
            <div className="space-y-4">
              <div className="h-24 flex items-center">
                <img 
                  src="/lovable-uploads/d1aeb0e9-c67b-4f1b-96e0-94fd3225b22c.png" 
                  alt="Logo" 
                  className="h-24 object-contain"
                />
              </div>
              <Button
                onClick={handleExport}
                variant="outline"
                className="text-gold hover:text-gold-dark hover:bg-gold/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
          <InsightCards />
          <h1 className="text-2xl font-bold text-gold">D'NA Investor Report</h1>
          <p className="text-black mt-2">Detailed financial insights for investors</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-gold">Key Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-black">Gross Margin</span>
                <span className="text-gold font-semibold">42%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">Operating Margin</span>
                <span className="text-gold font-semibold">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">Net Profit Margin</span>
                <span className="text-gold font-semibold">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">Return on Investment</span>
                <span className="text-gold font-semibold">32%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-gold">Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <FinancialChart data={[]} className="h-[300px]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestorReport;