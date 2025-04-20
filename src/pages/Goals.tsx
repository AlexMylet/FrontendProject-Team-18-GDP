import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TopBanner from "@/components/TopBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trophy, Target, Medal, Flame } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TEST_ACCESS_TOKEN = "TEST_ACCESS_TOKEN";

const GoalsScreen = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    unit: "",
    target: "",
  });

  const queryClient = useQueryClient();

  const fetchGoals = async () => {
    console.log("Fetching goals with token:", TEST_ACCESS_TOKEN);
    const response = await fetch("http://localhost:3000/api/v1/business_progress/goals/goal_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: TEST_ACCESS_TOKEN }),
    });
    const data = await response.json();
    console.log("Goals response:", data);
    if (!data.success) throw new Error(data.failed_msg);
    return data.goals;
  };

  const fetchQuests = async () => {
    console.log("Fetching quests with token:", TEST_ACCESS_TOKEN);
    const response = await fetch("http://localhost:3000/api/v1/business_progress/quests/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: TEST_ACCESS_TOKEN }),
    });
    const data = await response.json();
    console.log("Quests response:", data);
    if (!data.success) throw new Error(data.failed_msg);
    return data.goals;
  };

  const fetchLeaderboards = async () => {
    const discoveryResponse = await fetch("http://localhost:3000/api/v1/business_progress/leaderboard/discovery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const discoveryData = await discoveryResponse.json();
    if (!discoveryData.success) throw new Error(discoveryData.failed_msg);

    const leaderboards = await Promise.all(
      discoveryData.leaderboard.map(async (board) => {
        const response = await fetch("http://localhost:3000/api/v1/business_progress/leaderboard/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            leaderboard_id: board.leaderboard_id,
            max_length: 3 
          }),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.failed_msg);
        return {
          ...board,
          entries: data.streaks,
        };
      })
    );
    return leaderboards;
  };

  const fetchStreaks = async () => {
    const response = await fetch("http://localhost:3000/api/v1/business_progress/streaks/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: TEST_ACCESS_TOKEN }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.failed_msg);
    return data.streaks;
  };

  const { data: goals = [], isLoading: isLoadingGoals, error: goalsError } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  const { data: quests = [], isLoading: isLoadingQuests, error: questsError } = useQuery({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  });

  const { data: leaderboards = [], isLoading: isLoadingLeaderboards } = useQuery({
    queryKey: ["leaderboards"],
    queryFn: fetchLeaderboards,
  });

  const { data: streaks = [], isLoading: isLoadingStreaks } = useQuery({
    queryKey: ["streaks"],
    queryFn: fetchStreaks,
  });

  const addGoalMutation = useMutation({
    mutationFn: async (goal: typeof newGoal) => {
      const response = await fetch("http://localhost:3000/api/v1/business_progress/goals/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: TEST_ACCESS_TOKEN,
          goal: {
            name: goal.name,
            goal_or_quest: "Goal",
            unit: goal.unit,
            target: parseFloat(goal.target),
          },
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.failed_msg);
      return data.updated_goals;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["quests"] });
      setShowAddDialog(false);
      setNewGoal({ name: "", unit: "", target: "" });
    },
  });

  const handleAddGoal = () => {
    addGoalMutation.mutate(newGoal);
  };

  if (isLoadingGoals || isLoadingQuests || isLoadingLeaderboards || isLoadingStreaks) {
    return (
      <div className="min-h-screen bg-black text-[#F97316] flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (goalsError || questsError) {
    return (
      <div className="min-h-screen bg-black text-[#F97316] flex items-center justify-center">
        <div>Error loading data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#F97316]">
      <TopBanner />
      <div className="p-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Goals & Quests</h1>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-[#F97316] hover:bg-[#F97316]/80"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>

          <div className="space-y-6">
            {/* Goals Section */}
            <Card className="bg-black border border-[#F97316]/20">
              <CardHeader className="flex flex-row items-center space-x-2">
                <Target className="h-5 w-5" />
                <CardTitle>Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 border border-[#F97316]/20 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{goal.name}</h3>
                          <p className="text-sm text-white/60">
                            Target: {goal.target}{goal.unit}
                          </p>
                        </div>
                        <div className="w-24 h-2 bg-[#F97316]/20 rounded-full">
                          <div 
                            className="h-full bg-[#F97316] rounded-full"
                            style={{ width: `${(goal.current_progress || 0) / goal.target * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quests Section */}
            <Card className="bg-black border border-[#F97316]/20">
              <CardHeader className="flex flex-row items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <CardTitle>Quests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quests.map((quest) => (
                    <div key={quest.id} className="p-4 border border-[#F97316]/20 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{quest.name}</h3>
                          <p className="text-sm text-white/60">
                            Target: {quest.target}{quest.unit}
                          </p>
                        </div>
                        <div className="w-24 h-2 bg-[#F97316]/20 rounded-full">
                          <div 
                            className="h-full bg-[#F97316] rounded-full"
                            style={{ width: `${(quest.current_progress || 0) / quest.target * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboards Section */}
            <Card className="bg-black border border-[#F97316]/20">
              <CardHeader className="flex flex-row items-center space-x-2">
                <Medal className="h-5 w-5" />
                <CardTitle>Leaderboards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {leaderboards.map((board) => (
                    <div key={board.leaderboard_id} className="space-y-2">
                      <h3 className="font-medium text-lg">{board.name}</h3>
                      <p className="text-sm text-white/60">{board.description}</p>
                      <div className="space-y-2">
                        {board.entries?.map((entry, index) => (
                          <div 
                            key={entry.user_id} 
                            className="flex items-center justify-between p-3 border border-[#F97316]/20 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-lg font-bold">{index + 1}</span>
                              <span>{entry.username}</span>
                            </div>
                            <span>{entry.value} {board.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Streaks Section */}
            <Card className="bg-black border border-[#F97316]/20">
              <CardHeader className="flex flex-row items-center space-x-2">
                <Flame className="h-5 w-5" />
                <CardTitle>Streaks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {streaks.map((streak) => (
                    <div 
                      key={streak.id} 
                      className="p-4 border border-[#F97316]/20 rounded-lg flex items-center justify-between"
                    >
                      <span className="font-medium">{streak.name}</span>
                      <div className="flex items-center space-x-2">
                        <Flame className="h-4 w-4" />
                        <span className="text-lg font-bold">{streak.streak}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Goal Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-black border-[#F97316]/20 text-white">
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="bg-black border-[#F97316]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="bg-black border-[#F97316]/20"
                placeholder="e.g., £, %, days"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target">Target</Label>
              <Input
                id="target"
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                className="bg-black border-[#F97316]/20"
              />
            </div>
            <Button 
              onClick={handleAddGoal}
              className="w-full bg-[#F97316] hover:bg-[#F97316]/80"
              disabled={addGoalMutation.isPending}
            >
              {addGoalMutation.isPending ? "Adding..." : "Add Goal"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalsScreen; 