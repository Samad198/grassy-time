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