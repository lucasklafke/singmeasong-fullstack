import {faker} from '@faker-js/faker';
import {prisma} from '../../src/database.js';
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