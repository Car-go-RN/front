import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestArea } from "@/app/types/RestArea";

interface RestAreaState {
  list: RestArea[];
  page: number;
  hasMore: boolean;
  startCoord: { lat: number; lng: number } | null;
  endCoord: { lat: number; lng: number } | null;
}

const initialState: RestAreaState = {
  list: [],
  page: 1,
  hasMore: true,
  startCoord: null,
  endCoord: null,
}

const restAreaSlice = createSlice({
  name: "restArea",
  initialState,
  reducers: {
    addRestAreas(state, action: PayloadAction<RestArea[]>) {
      const patched = action.payload.map((rest) => ({
        ...rest,
        isFavorite: rest.isFavorite ?? false,
      }));

      const existingIds = new Set(state.list.map((item) => item.id));
      const newRestAreas = patched.filter((rest) => !existingIds.has(rest.id));
      state.list = [...state.list, ...newRestAreas];

      if (newRestAreas.length === 1 || patched.length < 15) {
        state.hasMore = false;
      }
    },

    setRestAreas(state, action: PayloadAction<RestArea[]>) {
      state.list = action.payload.map((rest) => ({
        ...rest,
        isFavorite: rest.isFavorite ?? false,
      }));
      state.page = 1;
      state.hasMore = false;
    },

    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.list = state.list.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      );
    },

    resetRestAreas(state) {
      state.list = [];
      state.page = 1;
      state.hasMore = true;
      startCoord: null;
      endCoord: null;
    },

    incrementPage(state) {
      state.page += 1;
    },

    setStartCoord: (state, action: PayloadAction<{ lat: number, lng: number }>) => {
      state.startCoord = action.payload;
    },
    setEndCoord: (state, action: PayloadAction<{ lat: number, lng: number }>) => {
      state.endCoord = action.payload;
    },
  }
})

export const { addRestAreas, setRestAreas, toggleFavorite, resetRestAreas, incrementPage, setStartCoord, setEndCoord } = restAreaSlice.actions;
export default restAreaSlice.reducer;