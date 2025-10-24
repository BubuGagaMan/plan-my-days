import { StateCreator } from "zustand";
import { UseAppStore } from "../../useAppStore";

export interface ActionsSettingsSlice {
    overwrite: boolean;
    setOverwrite: (checked: boolean) => void;
}

export const createActionsSettingsSlice: StateCreator<UseAppStore, [], [], ActionsSettingsSlice> = (set) => ({
    overwrite: false,

    setOverwrite: (checked) => {
        set({overwrite: checked})
    }
});
