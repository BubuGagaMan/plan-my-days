import { useFormStatus } from "react-dom";
import { markDayAction } from "./markDay.action";
import { Day, DBDayMark } from "@/app/types/dateTypes";
import { LoadingSpinner } from "@/app/(frontend)/components/LoadingSpinner";

type Props = {
    day: Day;
    selectedDayMark: DBDayMark | null;
    clear: boolean;
    overwrite: boolean;
    small?: boolean;
};

export default function SingleMarkDaySubmit({ day, selectedDayMark, clear, overwrite, small }: Props) {
    const { pending } = useFormStatus();
    const selectedMarkEqualsCurrent = selectedDayMark?.id === day.markedDay?.day_mark.id;

    if ((selectedMarkEqualsCurrent && !clear) || (clear && !day.markedDay) || (day.markedDay && !overwrite && !clear)) {
        return (
            <button
                disabled={true}
                type="submit"
                className={`
                        group
                        cursor-pointer absolute inset-0 px-1 
                        active:bg-[rgba(0,0,0,5)]
                        min-[500px]:text-[12px] max-[640px]:text-[12px]
                        min-[400px]:text-[10px] max-[500px]:text-[10px]
                        max-[330px]:text-[8.5px] 
                        sm:text-sm 
                        md:text-base
                        transition-all duration-200 
                        blur-[3rem] hover:blur-none
                        group-hover:opacity-[1] 
                        opacity-0
                        text-[red]
                        `}
                style={{
                    background: "rgba(0,0,0,0.8)",
                }}
            >
                <span className="opacity-[0] group-hover:opacity-[1]">
                    {!overwrite && !clear
                        ? "ENABLE OVERWRITE TO MARK"
                        : clear
                        ? "NOTHING TO CLEAR"
                        : `"${selectedDayMark?.title}" ALREADY APPLIED`}
                </span>
            </button>
        );
    }

    const formAction = markDayAction.bind(null, selectedDayMark, null, { clear, overwrite });

    return (
        <button
            disabled={pending}
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
                        group-hover:opacity-[1] 
                        opacity-0
                        `}
            style={{
                opacity: pending ? 1 : "",
                filter: pending ? "blur(0)" : "",
                background: "rgba(0,0,0,0.8)",
            }}
        >
            {pending ? (
                <LoadingSpinner />
            ) : small ? null : (
                <span className="opacity-[0] group-hover:opacity-[1]">
                    {clear ? "CLEAR" : `MARK AS "${selectedDayMark?.title}"`}
                </span>
            )}
        </button>
    );
}
