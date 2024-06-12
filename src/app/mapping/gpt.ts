import { GptResponse } from "../types/gpt";


export const toGptResponse = (project: string, mission: string, technos: string): GptResponse => ({
    mission, project, technos

})

