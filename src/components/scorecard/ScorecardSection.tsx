
import { cn } from "@/lib/utils";
import { ScorecardChart } from "./ScorecardChart";
import { RevenueDonutChart } from "./RevenueDonutChart";
import { BigNumberDisplay } from "./BigNumberDisplay";
import { InventorySalesChart } from "./InventorySalesChart";

interface ScorecardSectionProps {
  id: number;
  title: string;
  subtitle?: string;
  // The typing here is incredibly stupid and unsafe
  // Note this code is currently unused
  // eslint-disable-next-line @typescript-eslint/no-explicit-any  ---- I'm not fixing the bot's mess
  chartData: Array<any>;
  isEven: boolean;
  showDonutChart?: boolean;
  showBigNumber?: boolean;
  numberSuffix?: string;
}

export const ScorecardSection = ({
  id,
  title,
  subtitle,
  chartData,
  isEven,
  showDonutChart = false,
  showBigNumber = false,
  numberSuffix = "",
}: ScorecardSectionProps) => {
  const renderChart = () => {
    if (showBigNumber) {
      return (
        <BigNumberDisplay 
          value={chartData[0].value}
          suffix={numberSuffix}
          subtitle={subtitle}
        />
      );
    }

    if (id === 2) {
      return <InventorySalesChart data={chartData} />;
    }

    return showDonutChart ? <RevenueDonutChart /> : <ScorecardChart data={chartData} sectionId={id} />;
  };

  return (
    <div 
      className={cn(
        "w-full min-h-[300px] relative",
        isEven 
          ? "bg-gradient-to-r from-obsidian-dark to-obsidian-light" 
          : "bg-gradient-to-l from-obsidian-DEFAULT to-obsidian-dark"
      )}
    >
      <div className="relative w-full h-full py-8">
        <div className="flex flex-col items-center justify-center h-full">
          {renderChart()}
        </div>
        {id === 1 && (
          <div className="absolute -bottom-8 left-4">
            <img 
              src="/lovable-uploads/58ed5510-5e9b-402f-b6cc-502c08cd4921.png" 
              alt="Shopify Logo"
              className="h-8 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};
