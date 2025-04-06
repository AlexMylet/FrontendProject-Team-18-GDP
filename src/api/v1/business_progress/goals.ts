// https://medium.com/@holasoymalva/how-to-build-a-rest-api-with-node-js-and-typescript-3491ddd19f95

import { Router, Request, Response } from "express";
import { get_user_from_access_token } from "../../common";
import {
  add_user_goal,
  get_award_list,
  get_user_goals,
  get_user_quests,
  remove_user_goal,
} from "../business_progress/goals-storage";

const router = Router();

router.post(
  "/api/v1/business_progress/goals/add",
  (req: Request, res: Response) => {
    try {
      add_user_goal(req.body.access_token, req.body.goal);
      const updated_goals = get_user_goals(req.body.access_token);
      // Check all actually goals
      updated_goals.forEach((goal) => {
        console.assert(goal.goal_or_quest === "Goal");
      });
      res.json({ success: true, updated_goals: updated_goals });
    } catch (error) {
      res.json({ success: false, failed_msg: error.message });
    }
  },
);

router.post(
  "/api/v1/business_progress/goals/award_list",
  (req: Request, res: Response) => {
    try {
      const awards = get_award_list(
        get_user_from_access_token(req.body.access_token),
      );
      res.json({ success: true, awards: awards });
    } catch (error) {
      res.json({ success: false, failed_msg: error.message });
    }
  },
);

router.post(
  "/api/v1/business_progress/goals/edit",
  (req: Request, res: Response) => {
    // Internally, this is treated as a remove and add, but keeping the same UUID
    try {
      const edited_uuid = req.body.goal_uuid;
      const access_token = req.body.access_token;
      remove_user_goal(access_token, edited_uuid);
      add_user_goal(access_token, req.body.updated_goal, edited_uuid);
      const updated_goals = get_user_goals(req.body.access_token);
      // Check all actually goals
      updated_goals.forEach((goal) => {
        console.assert(goal.goal_or_quest === "Goal");
      });
      res.json({ success: true, updated_goals: updated_goals });
    } catch (error) {
      res.json({ success: false, failed_msg: error.message });
    }
  },
);

router.post(
  "/api/v1/business_progress/goals/goal_list",
  (req: Request, res: Response) => {
    try {
      const goals = get_user_goals(req.body.access_token);
      // Check all actually goals
      goals.forEach((goal) => {
        console.assert(goal.goal_or_quest === "Goal");
      });
      res.json({ success: true, goals: goals });
    } catch (error) {
      res.json({ success: false, failed_msg: error.message });
    }
  },
);

router.post(
  "/api/v1/business_progress/goals/quest_list",
  (req: Request, res: Response) => {
    try {
      const quests = get_user_quests(req.body.access_token);
      // Check all actually goals
      quests.forEach((goal) => {
        console.assert(goal.goal_or_quest === "Quest");
      });
      res.json({ success: true, goals: quests });
    } catch (error) {
      res.json({ success: false, failed_msg: error.message });
    }
  },
);

router.post(
  "/api/v1/business_progress/goals/remove",
  (req: Request, res: Response) => {
    try {
      remove_user_goal(req.body.access_token, req.body.goal_uuid);
      const updated_goals = get_user_goals(req.body.access_token);
      // Check all actually goals
      updated_goals.forEach((goal) => {
        console.assert(goal.goal_or_quest === "Goal");
      });
      res.json({ success: true, updated_goals: updated_goals });
    } catch (error) {
      res.json({ success: false, failed_msg: error.message });
    }
  },
);

export default router;
