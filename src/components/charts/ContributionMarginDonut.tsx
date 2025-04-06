
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ContributionMarginData {
  name: string;
  value: number;
  opportunities: string;
}

interface ContributionMarginDonutProps {
  data: ContributionMarginData[];
  colors: string[];
}

const ContributionMarginDonut = ({ data, colors }: ContributionMarginDonutProps) => {
  // Need to use any here might be a problem with the library design
  // Note this code is currently unused
  // eslint-disable-next-line @typescript-eslint/no-explicit-any  ---- I'm not fixing the bot's mess
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white shadow-lg p-4 border border-gold/30 rounded-md z-50">
          <p className="text-black font-semibold">{item.name}</p>
          <p className="text-black">{item.value}% Contribution Margin</p>
          <div className="mt-2 text-sm text-black">
            <p>Optimization Opportunity:</p>
            <p>{item.opportunities}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={55}
            fill="#D4AF37"
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContributionMarginDonut;

