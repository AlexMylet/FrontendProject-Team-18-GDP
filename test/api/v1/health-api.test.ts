import request from "supertest";

import app from "../../../src/api/api";

test("health should be true", async () => {
  const response = await request(app).get("/api/v1/health");
  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
});

test("echo should return my input to me", async () => {
  const the_json = { b: 2, c: "2" };
  const response = await request(app).post("/api/v1/echo").send(the_json);
  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual(the_json);
});
