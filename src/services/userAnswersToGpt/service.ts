import { ENDPOINTS } from "@/api/config";
import { GptRequestBody, GptResponse } from "@/app/types/gpt";

export const userAnswersToGpt = async ({
  clientName,
  featuresList,
  methods,
  missionDescription,
  role,
  techsList,
}: GptRequestBody): Promise<{
  status: "success" | "error";
  response: GptResponse | string;
}> => {
  try {
    const requestBody = {
      clientName,
      featuresList,
      methods,
      missionDescription,
      role,
      techsList,
    };

    const response = (await fetch(ENDPOINTS.USER_ANSWERS_TO_GPT, {
      body: JSON.stringify(requestBody),
    })) as unknown as GptResponse;

    return { status: "success", response };
  } catch (error) {
    const errorMessage = JSON.stringify(error);

    console.error(`An error ocurred, show this to an adult: ${errorMessage}`);
    return {
      status: "error",
      response: errorMessage,
    };
  }
};
