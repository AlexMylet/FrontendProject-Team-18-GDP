import { Router, Request, Response } from "express";
import {
  get_leaderboard_from_storage,
  leaderboard_discovery,
  set_opt_in,
  get_opt_in,
} from "./leaderboard-storage.ts";
import { get_user_from_access_token } from "../../../common";

const router = Router();

router.post(
  "/api/v1/business_progress/leaderboard/list",
  (req: Request, res: Response) => {
    try {
      const leaderboard = get_leaderboard_from_storage(
        req.body.leaderboard_id,
        req.body.max_length,
      );
      res.json({ success: true, streaks: leaderboard });
    } catch (error) {
      res.json({ success: false, failed_msg: error.message });
    }
  },
);

router.post(
  "/api/v1/business_progress/leaderboard/discovery",
  (req: Request, res: Response) => {
    try {
      res.json({ success: true, leaderboard: leaderboard_discovery });
    } catch (error) {
      res.json({ success: false, failed_msg: error.message });
    }
  },
);

router.post(
    "/api/v1/business_progress/leaderboard/update_preference",
    (req: Request, res: Response) => {
      try {
        set_opt_in(
            get_user_from_access_token(req.body.access_token),
            req.body.opt_in,
        );
        res.json({ success: true });
      } catch (error) {
        res.json({ success: false, failed_msg: error.message });
      }
    },
);

router.post(
    "/api/v1/business_progress/leaderboard/get_preference",
    (req: Request, res: Response) => {
      try {
        const isOptedIn = get_opt_in(
            get_user_from_access_token(req.body.access_token),
        );
        res.json({ success: true, opt_in: isOptedIn });
      } catch (error) {
        res.json({ success: false, failed_msg: error.message });
      }
    },
);

export default router;
