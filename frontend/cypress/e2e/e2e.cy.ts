import Chance from "chance";

describe("The page works properly ", () => {
  const chance = new Chance();
  const email = chance.email();
  const password = "TestPassword123";
  it("succesfully loads and navigation works properly", () => {
    cy.visit("/");
    cy.get('header a[href="/"]').click().url().should("include", "/");
    cy.get('header a[href="/about"]').click().url().should("include", "/about");
    cy.get('header a[href="/search"]')
      .click()
      .url()
      .should("include", "/search");
    cy.get('header a[href="/explore"]')
      .click()
      .url()
      .should("include", "/explore");
    cy.get('header a[href="/login"]').click().url().should("include", "/login");
  });
  it("User can search for games and get specific game info", () => {
    cy.visit("/search");
    cy.get("button").click();
    cy.wait(1500);
    cy.get('a[id="game"]').first().click();
    cy.wait(3000);
    cy.contains("Average Playtime:"); // Means that we are in game detail page - evry game has this propery;
  });
  it("User cannot register when passwords do not match ", () => {
    cy.visit("/register");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="username"]').type("Test username");
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="repeatPassword"]').type("DiffrentPwd");
    cy.get('button[type="submit"]').click();
    cy.contains("Your passwords do no match");
  });
  it("User can succesfully register with proper data", () => {
    cy.visit("/register");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="username"]').type("Test username");
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="repeatPassword"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.contains("Account created");
  });
  it("Succesfully login with proper data and recive cookie token", () => {
    cy.login(email, password);
  });
  it("Logged user can add game to his game list", () => {
    cy.login(email, password);
    cy.visit("/game/3498"); // Game id for GTA V
    cy.wait(300);
    cy.get('div[id="My games"]').click();
    cy.wait(300);
    cy.contains("Game added to your games");
  });
  it("Logged user can remove game from his game list", () => {
    cy.login(email, password);
    cy.visit("/game/3498");
    cy.wait(750);
    cy.get('div[id="My games"]').click();
    cy.wait(300);
    cy.contains("Game delated from your games");
  });
  it("Logged user can change his username properly", () => {
    cy.login(email, password);
    cy.visit("/dashboard/settings");
    cy.contains("Change username").click();
    cy.wait(300);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="newUsername"]').type("Changed username");
    cy.get('input[name="repeatUsername"]').type("Changed username");
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.visit("/dashboard");
    cy.contains("Changed username");
  });
  it("User can logout", () => {
    cy.login(email, password);
    cy.visit("/dashboard/settings");
    cy.contains("Logout").click();
    cy.wait(1000);
    cy.url().should("include", "/");
    cy.getCookie("jwt").should("not.exist");
  });
});
