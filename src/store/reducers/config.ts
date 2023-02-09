import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IMode = "light" | "dark";

export interface IConfigState {
  mode: "light" | "dark";
}

export const initialConfigState: IConfigState = {
  mode: "light"
}

export const configSlice = createSlice({
  name: "config",
  initialState: initialConfigState,
  reducers: {
    setMode(state: IConfigState, action: PayloadAction<IMode>) {
      state.mode = action.payload;
    }
  }
});

export const { setMode } = configSlice.actions;
export const configReducer = configSlice.reducer;