
import TopBanner from "@/components/TopBanner";
import { ArrowDown, ArrowRight, DollarSign, TrendingUp, PieChart, Building, UserPlus } from "lucide-react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const TEST_ACCESS_TOKEN = "TEST_ACCESS_TOKEN";

const Customize = () => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const platforms = [
    "Xero",
    "QuickBooks",
    "HubSpot",
    "Monday",
    "Pipedrive",
    "Shopify",
    "WooCommerce"
  ];

  const growthPlans = [
    {
      title: "Improve working capital and cash flow",
      icon: <DollarSign className="w-5 h-5 text-[#1EAEDB]" />
    },
    {
      title: "Hypergrowth",
      icon: <TrendingUp className="w-5 h-5 text-[#1EAEDB]" />
    },
    {
      title: "Improve profit margin",
      icon: <PieChart className="w-5 h-5 text-[#1EAEDB]" />
    },
    {
      title: "Prepare for a sale or an exit",
      icon: <Building className="w-5 h-5 text-[#1EAEDB]" />
    }
  ];
  const fetchOptIn = async () => {
    const response = await fetch("http://localhost:3000/api/v1/business_progress/leaderboard/get_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: TEST_ACCESS_TOKEN }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.failed_msg);
    return data.opt_in;
  };
  const { data: isOptedIn } = useQuery({
    queryKey: ["optIn"],
    queryFn: fetchOptIn,
    initialData: false,
  });

  const optInMutation = useMutation({
    mutationFn: async (isOptedIn: boolean) => {
      const response = await fetch("http://localhost:3000/api/v1/business_progress/leaderboard/update_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: TEST_ACCESS_TOKEN,
          opt_in: isOptedIn,
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.failed_msg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["optIn"] });
    },
  });

  return (
    <div className="min-h-screen bg-black text-[#F97316]">
      <TopBanner />
      <div className="p-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <CollapsiblePrimitive.Root
              open={isOpen}
              onOpenChange={setIsOpen}
              className="bg-black border border-[#F97316]/20 rounded-lg p-4"
            >
              <CollapsiblePrimitive.Trigger className="flex justify-between items-center w-full">
                <span className="text-base font-medium text-white">Connected platforms</span>
                <ArrowDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </CollapsiblePrimitive.Trigger>
              <CollapsiblePrimitive.Content className="mt-4 space-y-3">
                {platforms.map((platform) => (
                  <div key={platform} className="flex justify-between items-center">
                    <span className="text-sm text-white">{platform}</span>
                    <Switch className="data-[state=checked]:bg-green-500" />
                  </div>
                ))}
              </CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>

            <div className="bg-black border border-[#F97316]/20 rounded-lg p-4">
              <div className="flex justify-between items-center cursor-pointer">
                <span className="text-base font-medium text-white">Request a custom feature</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-black border border-[#F97316]/20 rounded-lg p-4">
              <div className="flex justify-between items-center cursor-pointer">
                <span className="text-base font-medium text-white">Opt-in to leaderboard</span>
                <Switch className="data-[state=checked]:bg-green-500" onCheckedChange={optInMutation.mutate} checked={isOptedIn} />
              </div>
            </div>

            <div className="bg-black border border-[#F97316]/20 rounded-lg p-4">
              <h2 className="text-base font-medium text-white mb-4">Select a growth plan that works for you</h2>
              <div className="space-y-3">
                {growthPlans.map((plan) => (
                  <div
                    key={plan.title}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-[#F97316]/5 transition-colors rounded-lg py-2"
                  >
                    {plan.icon}
                    <span className="text-sm text-white">{plan.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black border border-[#F97316]/20 rounded-lg p-4">
              <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center space-x-3">
                  <UserPlus className="w-5 h-5 text-[#1EAEDB]" />
                  <span className="text-base font-medium text-white">Connect your advisor, accountant, or bookkeeper to Trajex</span>
                </div>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
