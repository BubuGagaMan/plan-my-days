// store/useAppStore.ts
import { create } from "zustand";

import { createDayMarkSlice, DayMarkSlice } from "./slices/dayMark/dayMarkSlice";
import { createActionsSelectionSlice, ActionsSelectionSlice } from "./slices/actionsSelection/actionsSelectionSlice";
import { createMarkMultipleDaysSlice, MarkMultipleDaysSlice } from "./slices/markMultipleDays/markMultipleDays";

export type UseAppStore = DayMarkSlice & ActionsSelectionSlice & MarkMultipleDaysSlice

export const useAppStore = create<UseAppStore>()((...a) => ({
    ...createDayMarkSlice(...a),
    ...createActionsSelectionSlice(...a),
    ...createMarkMultipleDaysSlice(...a)
}));
