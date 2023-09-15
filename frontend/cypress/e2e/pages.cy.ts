describe("The page works properly ", () => {
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
  it("Succesfully login with proper data and recive cookie token", () => {
    const email = "test@gmail.com";
    const password = "TestTest1";
    cy.visit("/login");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait(3000);
    cy.url().should("include", "dashboard");
    cy.getCookie("jwt").should("have.property", "value");
  });
});
