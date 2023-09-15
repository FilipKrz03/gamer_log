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
    cy.visit("/login");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait(3000);
    cy.url().should("include", "dashboard");
    cy.getCookie("jwt").should("have.property", "value");
  });
});
