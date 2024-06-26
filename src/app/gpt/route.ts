import OpenAI from "openai";
import { GptRequestBody, GptResponse } from "../types/gpt";
import { toGptResponse } from "../mapping/gpt";
import { Validators } from "../utils/validation";

export const dynamic = "force-dynamic"; // defaults to auto


export async function POST(request: Request): Promise<GptResponse | any> {
  try {
    
    const body: GptRequestBody = await request.json();
    const errors = Validators.GptBodyValidator(body as GptRequestBody);
  
  
    if (errors.length > 0) {
      return new Response(errors.join(", "), {
        status: 400,
        statusText: "",
      });
    }
  
    const openai = new OpenAI({
      apiKey: process.env.GPT_API_KEY,
    });
  
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1000,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `Agissez en tant que rédacteur professionnel de CV. Vous allez recevoir des informations sur le type de mission, le client, les technologies et les méthodes utilisées et la durée du projet. À partir de ces informations, générez une entrée de CV détaillée adaptée à un cadre professionnel.
              Structure ta réponse en 3 blocs:
              1. description du projet
              2. description de la mission et des activités projets
              3. description des technologies et méthodes
              Il faudrait impérativement 700 caractères minimum par bloc.
              Si tu n'as pas assez d'informations venant de l'utilisateur, dis 'Je n'ai pas assez d'informations pour générer une réponse'.
              Mets l’emphase sur les éléments qui ont généré un apprentissage plutôt que de lister basiquement ce que fais une technologie.
              Retire tout contenu négatif généré dans ta réponse ainsi que le contenu non professionel. Les technos mentionnées doivent exister. Le contenu doit être présentable à un client.
              Le retour JSON doit comporter une clé "project", une clé "mission" et une clé "technos"`,
        },
        {
          role: "user",
          content: `Créez une entrée de CV avec les détails suivants :
              - Type de Mission : ${body.role}
              - Client :  ${body.clientName}
              - Descriptif de la mission: ${body.missionDescription}
              - Descriptif des features: ${body.featuresList}
              - Technologies : ${body.techsList}
              - Méthodes Utilisées : ${body.methods}`,
        },
      ],
    });
    if (!completion.choices[0].message.content) {
      return new Response(null, {
        status: 400,
        statusText: "",
      });
    }
    let content = null
    let replaced = null
    

    if (completion.choices[0].message.content.includes("Je n'ai pas assez d'informations pour générer une réponse")) {
      return new Response(JSON.stringify({
        error: "Not enough information to generate a response",
        errorName: "NotEnoughInformation",
      })
      , {
        status: 400,
        statusText: "",
      });
    }
    try {
       replaced = completion.choices[0].message.content
      .replace("```json", "")
      .replace("```", "");
       content = JSON.parse(replaced);
    } catch (error) {
      console.log("🚀 ~ POST ~ error:", error)
      return new Response(JSON.stringify({
        error: "Invalid response from GPT",
        errorName: "InvalidResponse",
      })
      , {
        status: 400,
        statusText: "",
      });
      
    }
    const mapped = toGptResponse(content.project, content.mission, content.technos);
    const response = JSON.stringify({ ...mapped });
    return new Response(response, {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    
    return new Response(JSON.stringify({
      error: "Internal Server Error",
      errorName: "InternalServerError",
    }), {
      status: 500,
      statusText: "",
    });
  }
}
