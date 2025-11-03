"use client";
import Link from "next/link";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export default function YearLink({
    label,
    decrement,
    toPath,
    currentYear
}: {
    label: string;
    decrement?: boolean;
    toPath: string;
    currentYear: number
}) {
    const newYearParam = decrement ? currentYear - 1 : currentYear + 1
    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    params.set("year", String(newYearParam))

    const route = `${toPath}?${params.toString()}`;
    return <Link href={route}>{label}</Link>;
}
