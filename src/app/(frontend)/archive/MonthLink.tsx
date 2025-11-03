"use client";
import Link from "next/link";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export default function MonthLink({
    label,
    decrement,
    toPath,
    currentMonth
}: {
    label: string;
    decrement?: boolean;
    toPath: string;
    currentMonth: number
}) {
    const newMonthParam = decrement ? `${currentMonth < 1 ? 11 : currentMonth - 1}` : `${currentMonth > 10 ? 0 : currentMonth + 1}`
    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    params.set("month", newMonthParam)


    const route = `${toPath}?${params.toString()}`;
    return <Link href={route}>{label}</Link>;
}
