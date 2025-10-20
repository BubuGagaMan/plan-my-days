// store/useAppStore.ts
import { create } from "zustand";

import { createDayMarkSlice, DayMarkSlice } from "./slices/dayMark/dayMarkSlice";

import { createMarkMultipleDaysSlice, MarkMultipleDaysSlice } from "./slices/markMultipleDays/markMultipleDays";
import { createActionsSettingsSlice, ActionsSettingsSlice } from "./slices/actionsSettings/actionsSettings";

import { createActionsOptionsSlice, ActionsOptionsSlice } from "./slices/actionsOptions/actionsOptionsSlice";

export type UseAppStore = DayMarkSlice & ActionsOptionsSlice & MarkMultipleDaysSlice & ActionsSettingsSlice

export const useAppStore = create<UseAppStore>()((...a) => ({
    ...createDayMarkSlice(...a),
    ...createActionsOptionsSlice(...a),
    ...createMarkMultipleDaysSlice(...a),
    ...createActionsSettingsSlice(...a)
}));
