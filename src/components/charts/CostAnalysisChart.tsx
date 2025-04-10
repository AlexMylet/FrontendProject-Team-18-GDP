
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CostData {
  category: string;
  fixed: number;
  variable: number;
}

interface CostAnalysisChartProps {
  costData: CostData[];
}

const CostAnalysisChart = ({ costData }: CostAnalysisChartProps) => {
  return (
    <div className="relative h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={costData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#D4AF37" opacity={0.2} />
          <XAxis 
            dataKey="category" 
            stroke="#D4AF37"
            tick={{ fill: '#F97316', fontSize: 12 }}
          />
          <YAxis 
            stroke="#D4AF37"
            tick={{ fill: '#F97316', fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A1A',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
            }}
            labelStyle={{ color: '#F97316' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
          />
          <Legend 
            wrapperStyle={{ color: '#F97316' }}
            iconSize={8}
            height={36}
          />
          <Bar dataKey="fixed" name="Fixed Costs" fill="#D4AF37" barSize={8} />
          <Bar dataKey="variable" name="Variable Costs" fill="#8B7355" barSize={8} />
        </BarChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 left-4 flex items-center gap-4">
        <img 
          src="/lovable-uploads/c3fb9e39-1d26-4891-b9bf-c9c1a1b22da2.png" 
          alt="Wafeq Logo" 
          className="h-4 object-contain"
        />
        <img 
          src="/lovable-uploads/9145ccdc-a9c3-483f-bf74-3a38371b42a0.png" 
          alt="QOYOD Logo" 
          className="h-4 object-contain"
        />
      </div>
    </div>
  );
};

export default CostAnalysisChart;

