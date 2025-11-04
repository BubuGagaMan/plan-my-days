"use client";

import { useAppStore } from "@/app/(frontend)/store/useAppStore";
import RadioGroup from "./RadioGroup";
import {  useEffect } from "react";
import { DayActions, DayActionsQuantity } from "@/app/(frontend)/store/slices/actionsOptions/actionsOptionsSlice";

type Option = {
    option: React.ReactNode
    value: DayActions | DayActionsQuantity;
};

type RadioOptions = Option[]

type Props = {
    optionsSet: RadioOptions[];
};

export default function SelectionOptions({ optionsSet }: Props) {
    const setDayAction = useAppStore((s) => s.setDayAction);
    const setDayActionQuantity = useAppStore((s) => s.setDayActionQuantity);
    const dayAction = useAppStore((s) => s.dayActionsOptions.selectionAction);
    const dayActionQ = useAppStore((s) => s.dayActionsOptions.selectionQuantity);

    useEffect(() => {
        console.log(dayAction, dayActionQ);
    }, [dayAction, dayActionQ]);
    // console.log(optionsSet)

    const config = [
        {
            handleChange: setDayAction,
            disabled: false,
        },
        {
            handleChange: setDayActionQuantity,
            disabled: dayAction === DayActions.SEE_DETAILS,
        },
    ];
    const optionsSetWithSetters = optionsSet.map((options: any, index: number) => ({
        options,
        handleChange: config[index].handleChange,
        disabled: config[index].disabled,
    }));

    // console.log(optionsSetWithSetters)

    return (
        <>
            <div className="grid gap-2">
                {optionsSetWithSetters.map((options, index: number) => {
                    return (
                        <RadioGroup
                            key={index}
                            options={options.options}
                            handleChange={options.handleChange}
                            disabled={options.disabled}
                        />
                    );
                })}
            </div>
        </>
    );
}
