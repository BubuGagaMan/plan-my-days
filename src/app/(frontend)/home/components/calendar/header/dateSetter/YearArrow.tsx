"use client";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { TbArrowBadgeLeftFilled } from "react-icons/tb";
import { TbArrowBadgeLeft } from "react-icons/tb";
import { TbArrowBadgeRight } from "react-icons/tb";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
    decrement?: boolean;
    year: number;
    toPath: string;
};

export default function YearArrow({ decrement = false, year, toPath }: Props) {
    const [hovered, setHovered] = useState(false);
    // Calculate next/prev month with wrap-around
    const newYear = decrement ? year - 1 : year + 1;

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    params.set("year", String(newYear));

    return (
        <Link
            href={`${toPath}?${params.toString()}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="px-2 py-1 hover:bg-white/20 rounded transition-colors flex items-center justify-center"
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
