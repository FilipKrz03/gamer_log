import supertest from "supertest";
import { app } from "../index";

describe("Games controller routes works properly", () => {
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
