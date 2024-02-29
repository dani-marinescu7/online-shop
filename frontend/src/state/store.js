import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./index";

const store = configureStore({
    reducer: {
        auth: authReducer, // Add other slices if needed
    },
});

export default store;