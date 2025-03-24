// https://medium.com/@holasoymalva/how-to-build-a-rest-api-with-node-js-and-typescript-3491ddd19f95

import { Router, Request, Response } from "express";
import { AccessToken, UUID, new_UUID, get_user_from_access_token, UserID } from "../../common"

interface PartialGoal {
    name: string,
    unit: string,
    target: number,
}

interface StoredGoal extends PartialGoal {
    id: UUID,
    goal_or_quest: "Goal" | "Quest",
}

interface Goal extends StoredGoal {
    current_progress: number,
}

interface Award {
    id: UUID,
    name: string,
    description: string,
    achieved_date: string, // YYYY-MM-DD
}

// Storage interaction
interface GoalStorage {
    get: (userID: UserID) => StoredGoal[],
    add: (userID: UserID, goal: StoredGoal) => void,
    remove: (userID: UserID, goal_UUID: UUID) => void,
}

const goal_storage: GoalStorage = {
    get: (userID: UserID) => { throw Error("NotImplemented (goal_storage.get)")},
    add: (userID: UserID, goal: StoredGoal) => { throw Error("NotImplemented (goal_storage.add)") },
    remove: (userID: UserID, goal_uuid: UUID) => { throw Error("NotImplemented (goal_storage.remove)") },
}

// TODO: this function should probably do some caching!
// If, say, timestamp of business data has not changed
// and the goal has not been updated, then cache.
function calculate_current_progress(goal: StoredGoal): Goal {
    throw("NotImplemented (calculate_current_progress)")
    const current_progress = 1
    return {
        name: goal.name,
        unit: goal.unit,
        target: goal.target,
        id: goal.id,
        goal_or_quest: goal.goal_or_quest,
        current_progress: current_progress
    }
}

function get_award_list(userID: UserID): Award[] { throw Error("NotImplemented (get_award_list)")}

function get_user_goals(access_token: AccessToken): Goal[] {
    const the_goals: StoredGoal[] = goal_storage.get(get_user_from_access_token(access_token))
    return the_goals.map((stored_goal) => calculate_current_progress(stored_goal))
}

function add_user_goal(access_token: AccessToken, added_goal: PartialGoal, existing_uuid: UUID | null = null): void {
    const id = (existing_uuid === null) ? new_UUID() : existing_uuid
    const full_goal: StoredGoal = {
        name: added_goal.name,
        unit: added_goal.unit,
        target: added_goal.target,
        id: id,
        goal_or_quest: "Goal",
    }
    goal_storage.add(get_user_from_access_token(access_token), full_goal)
}

function remove_user_goal(access_token: AccessToken, goal_uuid: UUID): void {
    goal_storage.remove(get_user_from_access_token(access_token), goal_uuid)
}

const router = Router();

router.post("/api/v1/business_progress/goals/add", (req: Request, res: Response) => {
    try {
        add_user_goal(req.body.access_token, req.body.goal)
        const updated_goals = get_user_goals(req.body.access_token) // TODO: should we filter to just the "Goal"s
        res.json({ success: true, updated_goals: updated_goals})
    } catch (error) {
        res.json({ success: false, failed_msg: error.message})
    }
});

router.post("/api/v1/business_progress/goals/award_list", (req: Request, res: Response) => {
    try {
        const awards = get_award_list(get_user_from_access_token(req.body.access_token))
        res.json({ success: true, awards: awards})
    } catch (error) {
        res.json({ success: false, failed_msg: error.message})
    }
});

router.post("/api/v1/business_progress/goals/edit", (req: Request, res: Response) => {
    // Internally, this is treated as a remove and add, but keeping the same UUID
    try {
        const edited_uuid = req.body.goal_uuid
        const access_token = req.body.access_token
        remove_user_goal(access_token, edited_uuid)
        add_user_goal(access_token, req.body.updated_goal, edited_uuid)
        const updated_goals = get_user_goals(req.body.access_token) // TODO: should we filter to just the "Goal"s
        res.json({ success: true, updated_goals: updated_goals})
    } catch (error) {
        res.json({ success: false, failed_msg: error.message})
    }
});

router.post("/api/v1/business_progress/goals/goal_list", (req: Request, res: Response) => {
    try {
        const goals = get_user_goals(req.body.access_token).filter(((goal: Goal) => goal.goal_or_quest === "Goal"))
        res.json({ success: true, goals: goals})
    } catch (error) {
        res.json({ success: false, failed_msg: error.message})
    }
});

router.post("/api/v1/business_progress/goals/quest_list", (req: Request, res: Response) => {
    try {
        const quests = get_user_goals(req.body.access_token).filter(((goal: Goal) => goal.goal_or_quest === "Quest"))
        res.json({ success: true, goals: quests})
    } catch (error) {
        res.json({ success: false, failed_msg: error.message})
    }
});

router.post("/api/v1/business_progress/goals/remove", (req: Request, res: Response) => {
    try {
        remove_user_goal(req.body.access_token, req.body.goal_uuid)
        const updated_goals = get_user_goals(req.body.access_token) // TODO: should we filter to just the "Goal"s
        res.json({ success: true, updated_goals: updated_goals})
    } catch (error) {
        res.json({ success: false, failed_msg: error.message})
    }
});

export default router;