"use client";

import { Listbox } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useAppStore } from "@/app/(frontend)/store/useAppStore";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { LoadingSpinner } from "../../../LoadingSpinner";
import { DayActions } from "@/app/(frontend)/store/slices/actionsOptions/actionsOptionsSlice";
import { useFormStatus } from "react-dom";
import DeleteDayMark from "./DeleteDayMark";

export type DayMarkOption = {
    id: string;
    title: string;
    background_color: string;
    font_color: string;
};

type DayMarkPickerProps = {
    markOptions: DayMarkOption[] | null;
};

export default function DayMarkPicker({ markOptions }: DayMarkPickerProps) {
    const dayMark = useAppStore((s) => s.dayMark);
    const setDayMark = useAppStore((s) => s.setDayMark);
    const initDayMark = useAppStore((s) => s.initDayMark);

    const selectedDayAction = useAppStore((s) => s.dayActionsOptions.selectionAction);

    const router = useRouter();
    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const handleSelect = (value: string) => {
        if (value === "create-new") {
            router.push(`/home/create-day-mark?${params}`);
        } else {
            const mark = markOptions?.find((option) => option.id === value);
            setDayMark(mark || null);
        }
    };

    useEffect(() => {
        initDayMark();
    }, [initDayMark]);

    const { pending } = useFormStatus();

    if (!dayMark) {
        return <LoadingSpinner />;
    }
    return (
        <div
            className="grid  w-25 md:w-40 relative inline-block text-xs md:text-base transition-opacity duration-100 ease-in-out"
            style={{
                opacity: selectedDayAction !== DayActions.MARK ? "0.5" : "1",
                pointerEvents: selectedDayAction !== DayActions.MARK ? "none" : "all",
            }}
        >
            <Listbox value={dayMark ? dayMark.id : undefined} onChange={handleSelect}>
                <Listbox.Label className="block font-medium text-center text-white">Mark days as:</Listbox.Label>
                <Listbox.Button
                    className={`w-full bg-[rgba(0,0,0,0.6)] p-1 md:px-2 md:py-1 rounded-sm text-left flex justify-center cursor-pointer`}
                >
                    <span
                        className={` p-1 rounded-sm w-full text-center `}
                        style={{
                            backgroundColor: dayMark.background_color,
                        }}
                    >
                        <p
                            style={{
                                color: dayMark.font_color,
                            }}
                        >
                            {dayMark.title}
                        </p>
                    </span>
                </Listbox.Button>

                {/* Make the options absolute */}
                <Listbox.Options className="absolute w-full p-1 md:p-3  bg-[rgba(0,0,0,0.6)]  rounded-sm shadow z-10 overflow-hidden">
                    {markOptions?.map((option) => (
                        <Listbox.Option key={option.id} value={option.id} as={Fragment}>
                            {({ active, selected }) => (
                                <li
                                    className={` cursor-pointer mt-1 md:mt-2 text-black flex items-center gap-1 justify-center${
                                        active ? "bg-gray-200" : ""
                                    } ${selected ? "font-bold" : ""}`}
                                >
                                    <span
                                        className={` p-1 rounded-sm w-full text-center`}
                                        style={{ backgroundColor: option.background_color }}
                                    >
                                        <p
                                            style={{
                                                color: option.font_color,
                                            }}
                                        >
                                            {option.title}
                                        </p>
                                    </span>
                                    <DeleteDayMark dayMark={option} />
                                </li>
                            )}
                        </Listbox.Option>
                    ))}
                    <Listbox.Option
                        className={
                            "cursor-pointer w-full px-2 py-1 border border-red bg-[gray] text-black mt-2 rounded-sm"
                        }
                        value="create-new"
                    >
                        <span>+ create new</span>
                    </Listbox.Option>
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
