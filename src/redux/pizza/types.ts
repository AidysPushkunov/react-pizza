export type Pizza = {
    id: String;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

export type SearchPizzaParams = {
    sortBy: string;
    orderType: string;
    categoryType: string;
    search: string;
    currentPage: string;
}