"use client";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { TbArrowBadgeLeftFilled } from "react-icons/tb";
import { TbArrowBadgeLeft } from "react-icons/tb";
import { TbArrowBadgeRight } from "react-icons/tb";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
    month: number;
    year: number;
    toPath: string;
    decrement?: boolean;
};

export default function MonthArrow({ decrement, month, year, toPath }: Props) {
    const [hovered, setHovered] = useState(false);
    // Calculate next/prev month with wrap-around
    let newMonth = decrement ? month - 1 : month + 1;
    let newYear = year;

    if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
    } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
    }
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    params.set("month", String(newMonth));
    params.set("year", String(newYear));

    return (
        <Link
            href={`${toPath}?${params.toString()}`}
            className="px-2 py-1 hover:bg-white/15 rounded transition-colors flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            //onBlur={() => setHovered(prevState => !prevState)}
        >
            {/* Inline SVG arrow */}
            {decrement ? (
                hovered ? (
                    <TbArrowBadgeLeftFilled size={25} />
                ) : (
                    <TbArrowBadgeLeft size={25} />
                )
            ) : hovered ? (
                <TbArrowBadgeRightFilled size={25} />
            ) : (
                <TbArrowBadgeRight size={25} />
            )}
        </Link>
    );
}
