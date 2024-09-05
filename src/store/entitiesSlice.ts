import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entity } from '../types';

interface EntitiesState {
  entities: Entity[];
  loading: boolean;
  error: string | null;
}

const initialState: EntitiesState = {
  entities: [],
  loading: false,
  error: null,
};

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    setEntities: (state, action: PayloadAction<Entity[]>) => {
      state.entities = action.payload;
    },
    addEntity: (state, action: PayloadAction<Entity>) => {
      state.entities.push(action.payload);
    },
    updateEntity: (state, action: PayloadAction<Entity>) => {
      const index = state.entities.findIndex(e => e.uid === action.payload.uid);
      if (index !== -1) {
        state.entities[index] = action.payload;
      }
    },
    deleteEntity: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.filter(e => e.uid !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setEntities, addEntity, updateEntity, deleteEntity, setLoading, setError } = entitiesSlice.actions;

export default entitiesSlice.reducer;