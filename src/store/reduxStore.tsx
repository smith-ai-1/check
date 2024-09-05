// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import entitiesReducer from './entitiesSlice';
import workspacesReducer from './workspacesSlice';

export const store = configureStore({
  reducer: {
    entities: entitiesReducer,
    workspaces: workspacesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;