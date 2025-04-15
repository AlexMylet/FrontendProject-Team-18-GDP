import { Router, Request, Response } from "express";
import { get_user_streaks } from "./streaks-storage.ts";

const router = Router();

router.post(
  "/api/v1/business_progress/streaks/list",
  (req: Request, res: Response) => {
    try {
      const streaks = get_user_streaks(req.body.access_token);
      res.json({ success: true, streaks: streaks });
    } catch (error) {
      res.json({ success: false, failed_msg: error.message });
    }
  },
);

export default router;
