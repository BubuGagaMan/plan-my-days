import { StateCreator } from "zustand";
import { UseAppStore } from "../../useAppStore";

export interface ActionsSettingsSlice {
    clear: boolean;
    setClear: (checked: boolean) => void;
    overwrite: boolean;
    setOverwrite: (checked: boolean) => void;
}

export const createActionsSettingsSlice: StateCreator<UseAppStore, [], [], ActionsSettingsSlice> = (set) => ({
    clear: false,

    setClear: (checked) => {
        console.log(checked)
        set({clear: checked})
    },
    overwrite: false,

    setOverwrite: (checked) => {
        set({overwrite: checked})
    }
});
