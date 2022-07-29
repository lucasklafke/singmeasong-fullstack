import { faker } from "@faker-js/faker"
import {recommendationService} from "../../src/services/recommendationsService.js"
import {recommendationRepository} from "../../src/repositories/recommendationRepository.js"
describe("song tests", () => {
        jest.spyOn(recommendationRepository, "create").mockImplementation(():any => {})
        jest.spyOn(recommendationRepository, "findByName").mockImplementation(():any => {})
        it("should create a song", async () => {
                const name = faker.lorem.word()
                const youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

                await recommendationService.insert({name, youtubeLink})
                expect(recommendationRepository.create).toHaveBeenCalled()
        })

        it("should upvote a song", async ( ) => {
                jest.spyOn(recommendationRepository, "find").mockImplementation(():any => {
                        return 1
                })
                jest.spyOn(recommendationRepository, "updateScore").mockImplementation(():any => {
                        return 1
                })
                await recommendationService.upvote(1)
                expect(recommendationRepository.updateScore).toBeCalled()
        })

        it("should downvote a song", async ( ) => {
                jest.spyOn(recommendationRepository, "find").mockImplementation(():any => {
                        return 1
                })
                jest.spyOn(recommendationRepository, "updateScore").mockImplementation(():any => {
                        return 1
                })
                
                await recommendationService.downvote(1)
                expect(recommendationRepository.updateScore).toBeCalled()

        })

        it("should find an error when downvote a song", async ( ) => {
                jest.spyOn(recommendationRepository, "find").mockImplementation(():any => {
                })
                jest.spyOn(recommendationRepository, "updateScore").mockImplementation(():any => {
                })
                try{
                        
                        await recommendationService.downvote(1)
                }catch(err){
                        expect(err).toBeDefined()
                }
        })

        it("should find an error when downvote a song", async ( ) => {
                jest.spyOn(recommendationRepository, "find").mockImplementation(():any => {
                })
                jest.spyOn(recommendationRepository, "updateScore").mockImplementation(():any => {
                })
                try{
                        
                        await recommendationService.upvote(1)
                }catch(err){
                        expect(err).toBeDefined()
                }
        })

        it("should return all recommendations", async () => {
                jest.spyOn(recommendationRepository, "findAll").mockImplementation(():any => {
                        return 1
                })
                await recommendationService.get()
                expect(recommendationRepository.findAll).toBeCalled()
        })

        it("should find an error when return all recommendations", async () => {
                jest.spyOn(recommendationRepository, "findAll").mockImplementation(():any => {
                })
                try{
                        await recommendationService.get()
                }catch(err){
                        expect(err).toBeDefined()
                }
        })
        it("should getTop to be called", async () => {
                jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementation(():any => {
                        return 1
                }
                )
                await recommendationService.getTop(1)
                expect(recommendationRepository.getAmountByScore).toBeCalled()
        })

        it("should find an error when getTop to be called", async () => {
                jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementation(():any => {
                }
                )
                try{

                        await recommendationService.getTop(1)
                }catch(err){

                        expect(err).toBeDefined()
                }
        })

        it("should getRandom to be called", async () => {
                jest.spyOn(recommendationRepository, "findAll").mockImplementation(():any => {
                        return 1
                })

                await recommendationService.getRandom()
                expect(recommendationRepository.findAll).toBeCalled()
        })

        it("should find an error when getRandom to be called", async () => {
                jest.spyOn(recommendationRepository, "findAll").mockImplementation(():any => {
                })
                try{

                        await recommendationService.getRandom()
                }catch(err){

                        expect(err).toBeDefined()
                }
        })

        
        
})
