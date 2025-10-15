// store/useAppStore.ts
import { create } from "zustand";

import { createDayMarkSlice, DayMarkSlice } from "./slices/dayMark/dayMarkSlice";

export const useAppStore = create<DayMarkSlice>()((...a) => ({
    ...createDayMarkSlice(...a),
}));
