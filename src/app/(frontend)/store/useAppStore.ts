// store/useAppStore.ts
import { create } from "zustand";

import { createDayMarkSlice, DayMarkSlice } from "./slices/dayMark/dayMarkSlice";
import { createActionsSelectionSlice, ActionsSelectionSlice } from "./slices/actionsSelection/actionsSelectionSlice";
import { createMarkMultipleDaysSlice, MarkMultipleDaysSlice } from "./slices/markMultipleDays/markMultipleDays";
import { createActionsSettingsSlice, ActionsSettingsSlice } from "./slices/actionsSettings/actionsSettings";

export type UseAppStore = DayMarkSlice & ActionsSelectionSlice & MarkMultipleDaysSlice & ActionsSettingsSlice

export const useAppStore = create<UseAppStore>()((...a) => ({
    ...createDayMarkSlice(...a),
    ...createActionsSelectionSlice(...a),
    ...createMarkMultipleDaysSlice(...a),
    ...createActionsSettingsSlice(...a)
}));
