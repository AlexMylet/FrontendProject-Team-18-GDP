
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import TopBanner from "@/components/TopBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductScatterPlot, { Props } from "@/components/product-analysis/ProductScatterPlot";
import ProductBreakevenSection from "@/components/product-analysis/ProductBreakevenSection";

interface ProductDataType {
  name: string;
  sales: number;
  margin: number;
}

interface ProductAnalysisScreenProps {
  productData?: ProductDataType[];
}

const ProductAnalysisScreen = ({ productData }: ProductAnalysisScreenProps) => {
  const navigate = useNavigate();
  const defaultData = [
    { name: "Product A", sales: 2000, margin: -800 },
    { name: "Product B", sales: 15000, margin: 1500 },
    { name: "Product C", sales: 35000, margin: -1200 },
    { name: "Product D", sales: 55000, margin: 3500 },
    { name: "Product E", sales: 85000, margin: 4200 },
  ];

  const data = productData || defaultData;

  // Transform data for scatter plot with brighter colors
  const scatterData = data.map((item) => ({
    x: item.sales,
    y: item.margin,
    z: item.sales,
    name: item.name,
    fill: item.margin < 0 ? '#D946EF' : '#0EA5E9'  // Brighter magenta for negative, bright blue for positive
  }));

  // Create data for star highlight for negative margin products
  const negativeProducts = data.filter(item => item.margin < 0);
  const starHighlight = negativeProducts.length > 0 ? [{
    x: (negativeProducts[0].sales + negativeProducts[1].sales) / 2,
    y: (negativeProducts[0].margin + negativeProducts[1].margin) / 2,
    z: Math.max(...negativeProducts.map(p => p.sales)) * 1.5,
    name: "Negative Margin Products",
    isHighlight: true,
    fill: '#FEF7CD',
    opacity: 0.8,
    shape: (props: Props) => {
      const { cx, cy } = props;
      return (
        <g 
          onClick={() => navigate('/coach-negative-margin')} 
          style={{ 
            cursor: 'pointer', 
            pointerEvents: 'all',
            position: 'relative',
            zIndex: 1000
          }}
          transform={`translate(${cx - 25},${cy - 25})`}
        >
          <Star
            size={50}
            color="#FEF7CD"
            fill="#FEF7CD"
            opacity={0.8}
            style={{ pointerEvents: 'all' }}
          />
        </g>
      );
    }
  }] : [];

  return (
    <div className="min-h-screen bg-black">
      <TopBanner />
      <div className="p-2 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate('/scorecard')}
              className="text-[#F97316] hover:text-[#F97316]/80 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-[#F97316] text-lg ml-4">Product Profitability</h1>
          </div>
          
          <div className="grid gap-4">
            <Card className="bg-black border border-[#F97316]/20">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-[#F97316] text-lg">Product Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ProductScatterPlot 
                  scatterData={scatterData}
                  starHighlight={starHighlight}
                />
              </CardContent>
            </Card>

            <ProductBreakevenSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalysisScreen;
