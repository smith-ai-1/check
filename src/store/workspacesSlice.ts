// src/store/workspacesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workspace } from '../types';

interface WorkspacesState {
  workspaces: Workspace[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkspacesState = {
  workspaces: [],
  loading: false,
  error: null,
};

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setWorkspaces: (state, action: PayloadAction<Workspace[]>) => {
      state.workspaces = action.payload;
    },
    addWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.workspaces.push(action.payload);
    },
    updateWorkspace: (state, action: PayloadAction<Workspace>) => {
      const index = state.workspaces.findIndex(w => w.uid === action.payload.uid);
      if (index !== -1) {
        state.workspaces[index] = action.payload;
      }
    },
    deleteWorkspace: (state, action: PayloadAction<string>) => {
      state.workspaces = state.workspaces.filter(w => w.uid !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setWorkspaces,
  addWorkspace,
  updateWorkspace,
  deleteWorkspace,
  setLoading,
  setError
} = workspacesSlice.actions;

export default workspacesSlice.reducer;