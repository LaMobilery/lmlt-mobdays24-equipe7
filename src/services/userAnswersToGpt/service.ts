import { ENDPOINTS } from "@/api/config";
import { GptRequestBody, GptResponse } from "@/app/types/gpt";
import http from "axios";

export type UserAnswersToGptArgs = GptRequestBody;
export type UserAnswersToGptResponse = GptResponse;

export const userAnswersToGpt = async ({
  clientName,
  featuresList,
  methods,
  missionDescription,
  role,
  techsList,
}: UserAnswersToGptArgs): Promise<UserAnswersToGptResponse | void> => {
  try {
    const requestBody = {
      clientName,
      featuresList,
      methods,
      missionDescription,
      role,
      techsList,
    };

    console.log("heeerre");

    const response = (await http.post(
      window.location.origin + ENDPOINTS.USER_ANSWERS_TO_GPT,
      {
        ...requestBody,
      }
    )) as unknown as GptResponse;

    return response;
  } catch (error) {
    const errorMessage = JSON.stringify(error);

    console.error(`An error ocurred, show this to an adult: ${errorMessage}`);

    throw new Error(error as string);
  }
};
