import reduce from "./reducer/Reducers";

const { createStore } = require("redux");

export const store = createStore (
    reduce
)
