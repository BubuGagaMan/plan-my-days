import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    monthsOptions: HTMLOptionElement[];
    daysOptions: HTMLOptionElement[];
    yearsOptions: HTMLOptionElement[];
    from: boolean;
}>;

export default function FullDateSelect({ children, monthsOptions, daysOptions, yearsOptions, from }: Props) {
    const searchParams = useSearchParams();
    const fromDate = searchParams.get("from-date");
    const [fullDate, setFullDate] = useState({
        date: 1,
        month: 0,
        year: 2025,
    });

    const handleDateChange = () => {};

    return (
        <div>
            <label>
                Date
                <select name={from ? "from-date" : "to-date"}>{daysOptions}</select>
            </label>
            <label>
                Month
                <select name={from ? "from-month" : "to-month"}>{monthsOptions}</select>
            </label>
            <label>
                Year
                <select name={from ? "from-month" : "to-month"}>{yearsOptions}</select>
            </label>
        </div>
    );
}
