import supertest from "supertest";
import { app } from "../index";
import Chance from "chance";

describe("Backend works properly", () => {
  const chacne = new Chance();
  const email = chacne.email();
  const password = "ProperPwd123#";
  describe("Games controller endopitns works properly", () => {
    it("Porperly getting genrers", async () => {
      const res = await supertest(app).get("/genres");
      expect(res.statusCode).toBe(200);
      expect(res.body.genres).toBeDefined();
    });
    it("Properly getting platfroms", async () => {
      const res = await supertest(app).get("/platforms");
      expect(res.statusCode).toBe(200);
      expect(res.body.plafroms).toBeDefined();
    });
    it("Properly getting tags", async () => {
      const res = await supertest(app).get("/tags");
      expect(res.statusCode).toBe(200);
      expect(res.body.tags).toBeDefined();
    }),
      it("Properly get searched games data", async () => {
        const res = await supertest(app).get("/search?&page=1");
        expect(res.statusCode).toBe(200);
        expect(res.body.games).toBeDefined();
      });
    it("Properly get specific game data", async () => {
      const res = await supertest(app).get("/search/3498");
      expect(res.statusCode).toBe(200);
      expect(res.body.game).toBeDefined();
    });
  });
  describe("Auth controller endpoints works corectly", () => {
    it("User can register with proper data", async () => {
      const res = await supertest(app).post("/register").send({
        email,
        password,
        username: "Test usenrame",
      });
      expect(res.status).toBe(201);
    });
    it("User can login with proper data", async () => {
      const res = await supertest(app).post("/login").send({
        email,
        password,
      });
      expect(res.body.accessToken).toBeDefined();
    }),
      it("User can logout", async () => {
        const agent = supertest.agent(app);
        const login = await supertest(app).post("/login").send({
          email,
          password,
        });
        const refreshToken = login.headers["jwt"];
        const logout = await agent
          .get("/logout")
          .set("Cookie", [`jwt=${refreshToken}`])
          .send({});
        expect(logout.statusCode).toBe(204);
      });
  });
});
