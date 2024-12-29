export interface Action {
    id: string;
    name: string;
    order: number;
    metaData: object | null;
}

export interface Trigger {
    id: string;
    name: string;
}

export interface AvailableActions {
    id : string,
    name : string
}