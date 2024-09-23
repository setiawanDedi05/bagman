"use client";

import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  hideLoading: () => void;
  showLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  hideLoading: () => {
    set(() => ({ loading: false }));
  },
  showLoading: () => {
    set(() => ({ loading: true }));
  },
}));
