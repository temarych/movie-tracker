import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFavoriteState {
  movieIds: string[];
}

export const initialFavoriteState: IFavoriteState = {
  movieIds: []
}

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialFavoriteState,
  reducers: {
    addMovie(state, action: PayloadAction<string>) {
      state.movieIds.push(action.payload);
    },
    removeMovie(state, action: PayloadAction<string>) {
      state.movieIds.filter(movieId => movieId === action.payload);
    }
  }
});

export const { addMovie, removeMovie } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;