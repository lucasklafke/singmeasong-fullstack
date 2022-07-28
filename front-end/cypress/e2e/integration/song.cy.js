/// <reference types="cypress" />
import {faker} from "@faker-js/faker"
describe("should create a song", () => {
        it("should create a song", () => {
                const name = faker.name.firstName()
                const youtube = "https://www.youtube.com/watch?v=eWb1G-7jBwY";
                cy.visit("http://localhost:3000")
                cy.get("#name").type(name)
                cy.get("#youtube").type(youtube)
                cy.get("button").click()
                
        })
})