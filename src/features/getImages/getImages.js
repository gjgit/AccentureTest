import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  images: [],
};

// A slice for images with our three reducers
const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    getImages: (state) => {
      state.loading = true;
    },
    getImagesSuccess: (state, { payload }) => {
      state.images = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getImagesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    setIncrement: (state, { payload }) => {
      const todo = state.images.find((todo) => todo.id === payload);
      if (todo && todo.isliked === true) {
        todo.likes -= 1;
        todo.isliked = !todo.isliked;
      } else {
        todo.likes += 1;
        todo.isliked = !todo.isliked;
      }
    },
    sortByLikes: (state, { payload }) => {
      state.images.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        }
        if (b.likes < a.likes) {
          return -1;
        }
        return 0;
      });
    },
    sortByComments: (state, { payload }) => {
      state.images.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (b.comments.length < a.comments.length) {
          return -1;
        }
        return 0;
      });
    },
    setComment: (state, { payload }) => {
      const todo = state.images.find((todo) => todo.id === payload.imageID);
      if (todo) {
        todo.comments.push(payload.comments);
      }
    },
    deleteComment: (state, { payload }) => {
      const todo = state.images.find((todo) => todo.id === payload.imageID);
      if (todo) {
        const index = todo.comments.indexOf(payload.comments);
        if (index > -1) {
          todo.comments.splice(index, 1);
        }
      }
    },
  },
});

// Three actions generated from the slice
export const {
  getImages,
  getImagesSuccess,
  getImagesFailure,
  setIncrement,
  sortByLikes,
  sortByComments,
  setComment,
  deleteComment,
} = imagesSlice.actions;

// A selector
export const imagesSelector = (state) => state.images;

// The reducer
export default imagesSlice.reducer;

// Asynchronous thunk action
export function fetchImages() {
  return async (dispatch) => {
    dispatch(getImages());
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json"
      );
      const data = await response.json();
      dispatch(getImagesSuccess(data.pics));
    } catch (error) {
      dispatch(getImagesFailure());
    }
  };
}
