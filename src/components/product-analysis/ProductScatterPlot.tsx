
import { useNavigate } from "react-router-dom";
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip, ZAxis, CartesianGrid } from "recharts";
import { AlertTriangle } from "lucide-react";

interface Props {
  cx: number,
  cy: number
}

interface ProductDataPoint {
  x: number;
  y: number;
  z: number;
  name: string;
  fill: string;
  isHighlight?: boolean;
  opacity?: number;
  shape?: (props: Props) => JSX.Element;
}

interface ProductScatterPlotProps {
  scatterData: ProductDataPoint[];
  starHighlight: ProductDataPoint[];
}

const ProductScatterPlot = ({ scatterData, starHighlight }: ProductScatterPlotProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 30, right: 20, bottom: 30, left: 20 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#FFFFFF" 
            strokeOpacity={0.2}
            horizontal={true}
            vertical={true}
          />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="sales" 
            axisLine={{ stroke: '#F97316' }}
            tick={{ fill: '#FFFFFF' }}
            label={{ value: 'Sales (£)', position: 'bottom', fill: '#FFFFFF' }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="profit margin"
            axisLine={{ stroke: '#F97316' }}
            tick={{ fill: '#FFFFFF' }}
            label={{ value: 'Profit Margin (£)', angle: -90, position: 'left', fill: '#FFFFFF' }}
          />
          <ZAxis 
            type="number" 
            dataKey="z" 
            range={[40, 300]} 
            name="sales"
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: '#000',
              border: '1px solid #F97316',
              borderRadius: '4px',
              fontSize: '12px',
              padding: '8px',
              whiteSpace: 'pre-line'
            }}
            itemStyle={{
              color: '#FFFFFF',
              margin: 0,
              padding: 0
            }}
            formatter={(/*value: any, name: string, props: any*/) => {
              return null;
            }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="p-2">
                    <p className="text-white">
                      {data.name}<br />
                      Sales: £{data.x.toLocaleString()}<br />
                      Profit Margin: £{data.y.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter 
            data={scatterData} 
            fillOpacity={0.8}
          />
          <Scatter 
            data={starHighlight}
            shape={(props: Props) => {
              const { cx, cy } = props;
              return (
                <g 
                  onClick={() => navigate('/coach/negative-margin')} 
                  style={{ 
                    cursor: 'pointer',
                    pointerEvents: 'all'
                  }}
                  transform={`translate(${cx - 25},${cy - 25})`}
                >
                  <AlertTriangle
                    size={50}
                    color="#FF0000"
                    fill="transparent"
                    strokeWidth={2}
                    opacity={0.8}
                    style={{ 
                      pointerEvents: 'all',
                      zIndex: 1000 
                    }}
                  />
                </g>
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductScatterPlot;
export type { Props };
