import app from '../src/app.js';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import {prisma} from '../src/database.js';


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


})