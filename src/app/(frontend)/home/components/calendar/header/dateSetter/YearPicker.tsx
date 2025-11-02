"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

type Props = {
    month: number;
    year: number;
    toPath: string;
};

export function YearPicker({ month, year, toPath }: Props) {
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // Generate a range of years, e.g., 10 years before and 10 years after the current year
    const yearRange = Array.from({ length: 11 }, (_, i) => year - 3 + i);

    return (
        <div className="relative inline-block select-none">
            {/* Current year display */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex items-center gap-2 text-md md:text-xl px-2 py-0.5 font-semibold rounded cursor-pointer hover:bg-white/10 ${
                    isOpen ? "bg-white/10" : ""
                }`}
            >
                {year}
                {/* Smaller SVG arrow */}
                <MdKeyboardArrowLeft
                    className={`transform transition-transform duration-200 ${isOpen ? "-rotate-90" : ""}`}
                    size={20}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute z-20 mt-1 text-xs  sm:text-sm  md:text-base  bg-white text-black rounded-md shadow-lg p-3 grid grid-cols-1 gap-2  w-35
               max-h-64 overflow-y-auto"
                    style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                    {yearRange.map((y) => {
                        const linkParams = new URLSearchParams(searchParams);
                        linkParams.set("year", y.toString());
                        linkParams.set("month", month.toString());
                        return (
                            <Link
                                key={y}
                                href={`${toPath}?${linkParams.toString()}`}
                                className={`px-2 py-1 rounded hover:bg-red-500/45 text-center ${
                                    y === year ? "bg-red-600/60" : ""
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {y}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
