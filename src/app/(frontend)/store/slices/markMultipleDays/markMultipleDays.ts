import { StateCreator } from "zustand";
import { UseAppStore } from "../../useAppStore";

export interface MarkMultipleDaysSlice {
    fromDate: string | null;
    setFromDate: (date: string | null) => void;
    toDate: string | null;
    setToDate: (date: string | null) => void;
}

export const createMarkMultipleDaysSlice: StateCreator<UseAppStore, [], [], MarkMultipleDaysSlice> = (set) => ({
    fromDate: null,
    setFromDate: (date) => {

        set({ fromDate: date });
    },
    toDate: null,
    setToDate: (date) => {

        set({ toDate: date });
    },
});
