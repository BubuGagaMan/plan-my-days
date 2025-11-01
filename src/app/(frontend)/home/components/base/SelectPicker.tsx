"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface SelectPicker {
    paramTarget: string;
    paramValue: string;
    options: { value: string; label: string }[];
    label: string;
}

export default function SelectPicker({ paramTarget, paramValue, options, label }: SelectPicker) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [selectedParam, setSelectedParam] = useState(paramValue);

    useEffect(() => {
        setSelectedParam(paramValue);
    }, [paramValue]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectValue = e.target.value;
        setSelectedParam(newSelectValue);

        const params = new URLSearchParams(searchParams.toString());
        params.set(paramTarget, newSelectValue);

        router.push(`?${params.toString()}`);
    };

    return (
        <label className="flex items-center gap-2 text-xs md:text-base">
            <span className="w-9 @[455px]:w-full">{label}:</span>
            <select value={selectedParam} className="border border-white rounded-sm p-1" onChange={handleSelect}>
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="text-black text-start">
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}
