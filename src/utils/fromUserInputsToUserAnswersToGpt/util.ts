import { CvForm } from "@/app/page";
import { UserAnswersToGptArgs } from "@/services/userAnswersToGpt/service";

export const fromUserInputsToUserAnswersToGpt = (
  formData: CvForm
): UserAnswersToGptArgs => {
  const userAnswersToGptArgs: UserAnswersToGptArgs =
    formData.reduce<UserAnswersToGptArgs>((acc, curr) => {
      const userAnswersToGptField = curr.type.replace(
        /-\d+$/,
        ""
      ) as keyof UserAnswersToGptArgs;

      if (acc[userAnswersToGptField]) {
        acc[userAnswersToGptField] += ` ${curr.answer}`;
      } else {
        acc[userAnswersToGptField] = curr.answer;
      }

      return acc;
    }, {} as UserAnswersToGptArgs);

  return userAnswersToGptArgs;
};
