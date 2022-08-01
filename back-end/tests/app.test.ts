import app from '../src/app.js';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import {prisma} from '../src/database.js';
import { voteScenario, createTopScenario, createData} from './factories/scenarioFactory.js';

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

        it("should return an error when random recommendation", async () => {
                const response = await supertest(app).get('/random')
                expect(response.statusCode).toBe(404);
        })

        it("should top 10 recommendations", async () => {
                await createTopScenario()
                const response = await supertest(app).get("/recommendations/top/5")
                const top1 = response.body[0]
                const top2 = response.body[1]
                expect(response.statusCode).toBe(200)
                expect(response.body.length).toBe(5)
                expect(top1.score).toBeGreaterThanOrEqual(top2.score)
        })

        it("should return random recommendation", async () => {
                await createTopScenario()
                const response = await supertest(app).get("/recommendations/random")
                console.log(response.body[0])
                expect(response.statusCode).toBe(200)
                expect(response.body).toBeDefined()
        })

        it("should return a recommendation", async () => {
                await createTopScenario()
                const recommendations = await prisma.recommendation.findMany()
                const id = recommendations[0].id
                const response = await supertest(app).get(`/recommendations/${id}`)
                expect(response.statusCode).toBe(200)
                expect(response.body).toBeDefined()
        })

})

afterAll(async () => {
  await prisma.$executeRaw`
        TRUNCATE TABLE recommendations
    `
  await prisma.$disconnect()
})