// import { faker } from "@faker-js/faker"
import { jest } from "@jest/globals";
import {recommendationService} from "../../src/services/recommendationsService.js"
import {recommendationRepository} from "../../src/repositories/recommendationRepository.js"
describe("song tests", () => {
        jest.spyOn(recommendationRepository, "create").mockImplementation(():any => {})
        jest.spyOn(recommendationRepository, "findByName").mockImplementation(():any => {})
        it("should create a song", async () => {
                const name = "lucas"
                const youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

                await recommendationService.insert({name, youtubeLink})
                expect(recommendationRepository.create).toHaveBeenCalled()
        })

        it("should return conflict error when create a song", async () => {
                jest.spyOn(recommendationRepository, "findByName").mockImplementation(():any => {
                        return {name: "lucas"}
                })
                const name = "lucas"
                const youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

                try{
                        await recommendationService.insert({name, youtubeLink})
                }catch(err){

                        expect(err).toBeDefined()
                }
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

        it("should find an error when upvote a song", async ( ) => {
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

        it("should get notFoundError when get random", async () => {
                jest.spyOn(recommendationService, "getByScore").mockImplementation(():any => {return []})

                try{
                        await recommendationService.getRandom()
                        
                }catch(err){
                        expect(err).toThrowError("notFoundError")
                }
        })
        it("should get gt in getScoreByFIlter", async () => {
                jest.spyOn(Math,"random").mockImplementation(():any => {
                        return 0.5
                })
                expect(recommendationService.getScoreFilter(0.5)).toEqual("gt")
        })

        it("should get gt in getScoreByFIlter", async () => {
                jest.spyOn(Math,"random").mockImplementation(():any => {
                        return 0.5
                })
                expect(recommendationService.getScoreFilter(0.9)).toEqual("lte")
        })

        it("should get an error when getByScore", async () => {
                jest.spyOn(recommendationRepository, "findAll").mockImplementation(():any => {})
                try{
                        await recommendationService.getByScore("lte")
                }catch(err){

                        expect(err).toBeDefined()
                }
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
