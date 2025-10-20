import { StateCreator } from "zustand";
import { UseAppStore } from "../../useAppStore";

export interface ActionsOptionsSlice {
    dayActionsOptions: {
        selectionQuantity: DayActionsQuantity;
        selectionAction: DayActions;
    };
    setDayAction: (dayAction: DayActions) => void;
    setDayActionQuantity: (dayAction: DayActionsQuantity) => void;
}

export enum DayActions {
    MARK = "MARK",
    CLEAR = "CLEAR",
    SEE_DETAILS = "SEE DETAILS",
}

export enum DayActionsQuantity {
    SINGLE = "SINGLE",
    RANGE = "RANGE",
}

export const createActionsOptionsSlice: StateCreator<UseAppStore, [], [], ActionsOptionsSlice> = (set) => ({
    dayActionsOptions: {
        selectionQuantity: DayActionsQuantity.SINGLE,
        selectionAction: DayActions.MARK,
    },
    setDayAction: (actionOption) => {
        set((state) => ({ dayActionsOptions: { ...state.dayActionsOptions, selectionAction: actionOption } }));
    },
    setDayActionQuantity: (actionQuantityOption) => {
        set((state) => ({ dayActionsOptions: { ...state.dayActionsOptions,  selectionQuantity: actionQuantityOption} }));
    },

});
