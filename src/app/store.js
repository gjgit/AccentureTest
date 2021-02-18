import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import getImagesReducer from "../features/getImages/getImages";

export default configureStore({
  reducer: {
    counter: counterReducer,
    images: getImagesReducer,
  },
});
