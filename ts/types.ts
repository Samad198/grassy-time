import { GrassType } from "./enums";

export interface user {
    id: string;
    username: string;
    email: string;
    token: string;
}

export interface stat {
    grassType: string;
    growthRateSummer: number;
    growthRateWinter: number;
    baseLength: number;
}

export interface reminder {
    id:number;
    date: string;
    type: GrassType;
    nextDate:string;
}