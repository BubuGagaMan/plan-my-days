import { StateCreator } from "zustand";
import { UseAppStore } from "../../useAppStore";

export interface ActionsSelectionSlice {
    activeDayAction: DayActions | null;
    setActiveDayAction: (dayAction: DayActions | null) => void;
}

export enum DayActions {
    MARK_SINGLE = "MARK",
    MARK_MULTIPLE = "MARK MULTIPLE",
    SEE_DETAILS = "SEE DETAILS",
}

export const createActionsSelectionSlice: StateCreator<UseAppStore, [], [], ActionsSelectionSlice> = (set) => ({
    activeDayAction: DayActions.MARK_SINGLE,
    setActiveDayAction: (dayAction) => {
        console.log(111);
        set({ activeDayAction: dayAction });
    },
});
