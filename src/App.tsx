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

const queryClient = new QueryClient();

// https://rapidapi.com/guides/call-apis-react-query
function APICheck() {
  const getHealth = async () => {
    const res = await fetch("http://localhost:3000/api/v1/health");
    return res.json()
  }
  const {data, error, isLoading} = useQuery({ queryKey: ['health'], queryFn: getHealth })
  return <div>
    {
      error ? <div>API Health Check Failed</div>
      : isLoading ? <div>Checking API Health ...</div>
      : <div>API Health Good!</div>
    }
  </div>
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="pb-20">
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
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
          <APICheck />
          <POSTTest />
          <BottomNav />
        </Router>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
