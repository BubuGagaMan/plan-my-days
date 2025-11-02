"use client";

import { MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { monthsOfTheYear } from "@/app/maps/dateMaps";

type Props = {
    month: number;
    year: number;
    toPath: string;
};

export function MonthPicker({ month, year, toPath }: Props) {
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block select-none">
            {/* Current month display */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex items-center gap-2 text-md md:text-xl font-semibold rounded cursor-pointer hover:bg-white/10 px-2 py-0.5 ${
                    isOpen ? "bg-white/10" : ""
                }`}
            >
                {monthsOfTheYear[month]}
                {/* Smaller SVG arrow */}
                <MdKeyboardArrowLeft
                    className={`transform transition-transform duration-200 ${isOpen ? "-rotate-90" : ""}`}
                    size={20}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute z-20 mt-1 w-65  text-xs sm:w-80 sm:text-sm lg:w-100 lg:text-base   overflow-y-auto bg-white text-black rounded-md shadow-lg p-3 grid grid-cols-3 gap-2"
                    style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                    {Object.entries(monthsOfTheYear)
                        .sort(([a], [b]) => Number(a) - Number(b))
                        .map(([num, name]) => {
                            // Create fresh URLSearchParams for each Link
                            const linkParams = new URLSearchParams(searchParams);
                            linkParams.set("month", num);
                            linkParams.set("year", year.toString());
                            return (
                                <Link
                                    key={num}
                                    href={`${toPath}?${linkParams.toString()}`}
                                    className={`px-2 py-1 rounded hover:bg-red-500/45  text-center ${
                                        Number(num) === month ? "bg-red-600/60" : ""
                                    }`}
                                    onClick={() => setIsOpen(false)} // close menu on click
                                >
                                    {name}
                                </Link>
                            );
                        })}
                </div>
            )}
        </div>
    );
}
