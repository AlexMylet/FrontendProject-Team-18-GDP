import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Index from "./pages/Index";
import Today from "./pages/Today";
import Coach from "./pages/Coach";
import CoachNegativeMargin from "./pages/CoachNegativeMargin";
import CoachScreen2 from "./pages/CoachScreen2";
import ContributionMargin from "./pages/ContributionMargin";
import Progress from "./pages/Progress";
import Customize from "./pages/Customize";
import Forecast from "./pages/Forecast";
import NotFound from "./pages/NotFound";
import ProductAnalysisScreen from "./pages/ProductAnalysisScreen";
import Goals from "./pages/Goals";
import Auth from "./pages/Auth";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const queryClient = new QueryClient();

// API Health Check component with icon indicator (Frontend Change)
function APICheck() {
  const getHealth = async () => {
    const res = await fetch("http://localhost:3000/api/v1/health");
    return res.json();
  };
  const { data, error, isLoading } = useQuery({ queryKey: ["health"], queryFn: getHealth });

  // Use icon and color to indicate API status (Frontend Change)
  let icon = null;
  let label = "";
  if (isLoading) {
    icon = <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />; // Yellow spinner for loading
    label = "Checking API...";
  } else if (error || !data?.success) {
    icon = <XCircle className="w-4 h-4 text-red-500" />; // Red cross for error
    label = "API Down";
  } else {
    icon = <CheckCircle className="w-4 h-4 text-green-500" />; // Green check for healthy
    label = "API Healthy";
  }

  // Fixed position, styled to match app (Frontend Change)
  return (
    <div className="fixed left-2 bottom-2 flex items-center gap-2 z-50 bg-black/80 px-3 py-1 rounded-full border border-[#F97316]/30 shadow">
      {icon}
      <span className="text-xs text-[#F97316]">{label}</span>
    </div>
  );
}

function POSTTest() {
  const doPOST = async () => {
    const res = await fetch("http://localhost:3000/api/v1/echo",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({a: 1, b: "Hello"})
      }
    )
    return res.json()
  }

  const mutation = useMutation({ mutationFn: doPOST })

  return <div>
  {
    <>
    { mutation.isError ? <div>Query failed: {mutation.error.message}</div> : null }
    { mutation.isPending ? <div>Pending ...</div> : null }
    { mutation.isSuccess ? <div>Success</div> : null }
    <button onClick={() => {mutation.mutate()}}>Mutate</button>
    </>
  }
  </div>
}

// Main App component with all routes and providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="pb-20">
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            {/* Route structure unchanged, but new pages/components may have been added elsewhere (Frontend Change) */}
            <Route path="/" element={<Today />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/index" element={<Index />} />
            <Route path="/ask-anything" element={<Coach />} />
            <Route path="/coach/negative-margin" element={<CoachNegativeMargin />} />
            <Route path="/coach-screen-2" element={<CoachScreen2 />} />
            <Route path="/contribution-margin" element={<ContributionMargin />} />
            <Route path="/scorecard" element={<Progress />} />
            <Route path="/notifications" element={<Customize />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/product-analysis" element={<ProductAnalysisScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* API status icon at bottom left (Frontend Change) */}
          <APICheck />
          <BottomNav />
        </Router>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
