import { ValidationSchema } from '../schemas/gpt';
import { GptRequestBody, GptResponse } from '../types/gpt';

function GptBodyValidator(data: GptRequestBody): Array<string> {
  const userSchema = new ValidationSchema<GptRequestBody>([
    { name: "clientName", fn: (value) => typeof value.clientName === "string" && value.clientName.length > 0 },
    { name: "featuresList", fn: (value) => typeof value.featuresList === "string" && value.featuresList.length > 0 },
    { name: "methods", fn: (value) => typeof value.methods === "string" && value.methods.length > 0 },
    { name: "missionDescription", fn: (value) => typeof value.missionDescription === "string" && value.missionDescription.length > 0 },
    { name: "role", fn: (value) => typeof value.role === "string" && value.role.length > 0 },
    { name: "techsList", fn: (value) => typeof value.techsList === "string" && value.techsList.length > 0 },
  
  ]);

  const errors = userSchema.validate(data);
  return errors;
}


export const Validators = {
    GptBodyValidator
}