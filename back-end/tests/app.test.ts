import app from '../src/app.js';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import {prisma} from '../src/database.js';
import { voteScenario } from './factories/scenarioFactory.js';

beforeEach(async () => {
        await prisma.recommendation.deleteMany({})
})

describe("recommendations endpoint", () => {
        it ("given a name and youtubeLink, it should return status 201", async () => {
                const name = faker.name.firstName();
                const youtubeLink = "https://www.youtube.com/watch?v=-oP2XaDt300"
                const response = await supertest(app).post('/recommendations').send({
                        name,
                        youtubeLink
                });
                expect(response.statusCode).toBe(201);
        })

        it("given a name without link, it should return status 400", async () => {
                const name = faker.name.firstName();
                const response = await supertest(app).post('/recommendations').send({
                        name
                });
                expect(response.statusCode).toBe(422);
        })

        it("downvote, expect status 200", async () => {
                const recommendation = await voteScenario()
                const id = recommendation.id
                const response = await supertest(app).post(`/recommendations/${id}/downvote`)
                expect(response.statusCode).toBe(200);
        })

        it("upvote, expect status 200", async () => {
                const recommendation = await voteScenario()
                const id = recommendation.id
                const response = await supertest(app).post(`/recommendations/${id}/upvote`)
                expect(response.statusCode).toBe(200);
        })


})