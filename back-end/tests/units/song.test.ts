import { faker } from "@faker-js/faker"
import * as songService from "../../src/services/recommendationsService.js"

describe("song tests", () => {
        it("should create a song", async () => {
                const name = faker.lorem.word()
                const youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

                await songService.recommendationService.insert({name, youtubeLink})
        }
)})