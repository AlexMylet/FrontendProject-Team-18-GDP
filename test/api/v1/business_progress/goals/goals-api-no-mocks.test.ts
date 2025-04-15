import request from "supertest";
import app from "../../../../../src/api/api";

function invalid_access_token_test_factory(
  api_route: string,
  display_name: string,
  additional_data: object = {},
) {
  return test(display_name + " invalid access token", async () => {
    const response = await request(app)
      .post(api_route)
      .send({ ...additional_data, access_token: "INVALID_ACCESS_TOKEN" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeFalsy();
    expect(response.body.failed_msg).toBe("Invalid Access Token");
  });
}

const the_goal = {
  name: "Test Goal",
  unit: "items",
  target: 15,
};

invalid_access_token_test_factory(
  "/api/v1/business_progress/goals/add",
  "add goal",
  { goal: the_goal },
);

invalid_access_token_test_factory(
  "/api/v1/business_progress/awards/list",
  "awards list",
);

invalid_access_token_test_factory(
  "/api/v1/business_progress/goals/edit",
  "goals edit",
  { goal_uuid: "000-000", updated_goal: the_goal },
);

invalid_access_token_test_factory(
  "/api/v1/business_progress/goals/goal_list",
  "goals list",
);

invalid_access_token_test_factory(
  "/api/v1/business_progress/quests/list",
  "quests list",
);

invalid_access_token_test_factory(
  "/api/v1/business_progress/goals/remove",
  "goals remove",
  { goal_uuid: "000-000" },
);
