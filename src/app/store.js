import { configureStore } from "@reduxjs/toolkit";
import getImagesReducer from "../features/getImages/getImages";

export default configureStore({
  reducer: {
    images: getImagesReducer,
  },
});
