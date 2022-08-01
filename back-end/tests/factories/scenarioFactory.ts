import {faker} from '@faker-js/faker';
import {prisma} from '../../src/database.js';
import supertest from 'supertest';
import app from '../../src/app.js';
export async function voteScenario() {
        const name = faker.name.firstName();
        const youtubeLink = "https://www.youtube.com/watch?v=-oP2XaDt300"
        const result = await prisma.recommendation.create({
                data: {
                        name,
                        youtubeLink
                }
        })
        return result
}

export async function createData() {

        const name = faker.name.firstName();
        const youtubeLink = "https://www.youtube.com/watch?v=-oP2XaDt300"

        return prisma.recommendation.create({
                data: {
                        name,
                        youtubeLink
                }
                
        })
        
}
export async function createTopScenario() {
        for(let i = 0; i < 10; i++) {
                const recommendation = await createData()
                await prisma.recommendation.update({
                        where : {
                                name : recommendation.name
                        },
                        data : {
                                score : i
                        }
                })

        }
        return 
}