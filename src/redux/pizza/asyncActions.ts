import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
    const { sortType, orderType, categoryType, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
        `https://64457ab8914c816083cfb742.mockapi.io/items?page=${currentPage}&limit=4&${categoryType}&sortBy=${sortType}&order=${orderType}${search}`,
    );

    return data;
});