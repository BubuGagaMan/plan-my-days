import { LoadingSpinner } from "../../LoadingSpinner";
import { useAppStore } from "@/app/(frontend)/store/useAppStore";
import { DBDayMark } from "../../../../../types/dateTypes";
import { getDateRange } from "../../../../../utilities/getDateRange";
import { markDayAction } from "./markDay.action";
import { useFormStatus } from "react-dom";

type Props = {
    date: string;
    selectedDayMark: DBDayMark | null;
    clear: boolean;
    overwrite: boolean;
    small?: boolean;
};

export default function MarkFromToSubmit({ date, selectedDayMark, clear, overwrite, small }: Props) {
    const fromDate = useAppStore((s) => s.fromDate);
    const setFromDate = useAppStore((s) => s.setFromDate);

    const { pending } = useFormStatus();

    const formAction = (formData: FormData) => {
        if (!fromDate) {
            setFromDate(date);
        } else {
            const dates = getDateRange(fromDate, date);
            setFromDate(null);
            return markDayAction(selectedDayMark, dates, { clear, overwrite }, formData);
        }
    };

    return (
        <button
            disabled={pending}
            // onClick={handleClick}
            formAction={formAction}
            type="submit"
            className={`
                        group
                        cursor-pointer absolute inset-0  px-1 text-white
                        active:bg-[rgba(0,0,0,5)]
                        min-[500px]:text-[12px] max-[640px]:text-[12px]
                        min-[400px]:text-[10px] max-[500px]:text-[10px]
                        max-[330px]:text-[8.5px] 
                        sm:text-sm 
                        md:text-base
                        transition-all duration-200 
                        blur-[3rem]  hover:blur-none
                        group-hover:opacity-[1] bg-[rgba(0,0,0,0.65)]
                        opacity-0
                    `}
            style={{
                opacity: fromDate === date || pending ? 1 : "",
                filter: pending || fromDate === date ? "blur(0)" : "",
                background: fromDate === date ? "rgba(0,0,0,0.65)" : "",
            }}
        >
            {pending ? (
                <LoadingSpinner />
            ) : small ? null : (
                <span>
                    {fromDate == date
                        ? ` ${clear ? "CLEAR" : "MARK"} FROM`
                        : `${clear ? "CLEAR" : "MARK"} ${fromDate ? "TO" : "FROM"}`}
                </span>
            )}
        </button>
    );
}
