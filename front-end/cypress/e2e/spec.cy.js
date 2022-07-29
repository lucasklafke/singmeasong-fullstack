import { faker } from '@faker-js/faker';
describe('testing route /', () => {
  it('should create new song in timeline', () => {
    const name = faker.name.firstName();
    const youtube = "https://www.youtube.com/watch?v=7aekxC_monc";
    cy.visit("http://localhost:3000")
    cy.get("#name").type(name);
    cy.get("#youtube").type(youtube)
    cy.get("button").click()
  })

  it("should upvote an youtube link", () => {
    cy.visit("http://localhost:3000"); 
    cy.get("#upvote").click();
  })

  it("should upvote an youtube link", () => {
    cy.visit("http://localhost:3000");
    cy.get("#downvote").click();
  });
})