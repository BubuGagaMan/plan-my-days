// store/slices/themeSlice.ts
import { StateCreator } from "zustand";
import { initDayMark } from "./initDayMark";
import { DBDayMark } from "@/app/(frontend)/home/types/dateTypes";
import { UseAppStore } from "../../useAppStore";

export interface DayMarkSlice {
    dayMark: DBDayMark | null;
    setDayMark: (mark: DBDayMark | null) => void;
    initDayMark: () => Promise<void>;
}

export const createDayMarkSlice: StateCreator<UseAppStore, [], [], DayMarkSlice> = (set) => ({
    dayMark: null,
    setDayMark: (mark) => set({ dayMark: mark }),
    initDayMark: async () => {
        const mark = await initDayMark();
        set({ dayMark: mark });
    },
});
