import { app } from "../index";
import supertest from "supertest";
import Chance from "chance";

describe("Backend works properly", () => {
  const chacne = new Chance();
  const email = chacne.email();
  const password = "ProperPwd123#";
  const agent = supertest.agent(app);
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
      }),
      it("User CANNOT login with bad password", async () => {
        const login = await supertest(app).post("/login").send({
          email,
          password: "BadPwd123#",
        });
        expect(login.statusCode).toBe(401);
      }),
      it("User cannot register with bad register data (backend form valdiation - password need to be at least 6 characters length)", async () => {
        const register = await supertest(app).post("/register").send({
          email,
          password: "badpw",
        });
        expect(register.statusCode).toBe(400);
      });
  }),

    describe("Users controller endopints works properly", () => {
      let accessToken: undefined | string = undefined;
      it("User can add games to games list", async () => {
        const res = await supertest(app).post("/login").send({
          email,
          password,
        });
        expect(res.body.accessToken).toBeDefined();
        accessToken = res.body.accessToken;
        const addGame = await agent
          .post("/newgame")
          .set("Authorization", `Bearer ${accessToken}`)
          .send({
            gameId: 1,
            title: "Simple",
            image: "Simple image",
            hasPc: true,
            hasXbox: true,
            hasPlayStation: true,
            genre: "Simple",
            rating: 4,
          });
        expect(addGame.statusCode).toBe(200);
      }),
        it("User can properly remove game from his game list", async () => {
          const removeGame = await agent
            .delete("/game")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              gameId: 1,
            });
          expect(removeGame.statusCode).toBe(200);
        }),
        it("User can properly change pwd", async () => {
          const changePwd = await agent
            .post("/changepwd")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              password,
              newPassword: "NewProperPwd123#",
            });
          expect(changePwd.statusCode).toBe(200);
        });
    });
});
