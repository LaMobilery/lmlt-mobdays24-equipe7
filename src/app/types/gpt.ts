

export interface GptResponse {
    project: string; 
    mission:string; 
    technos:string;
}

export interface GptRequestBody {
    role: string;
    clientName: string;
    missionDescription: string;
    featuresList: string;
    techsList: string;
    methods: string; 
    
}