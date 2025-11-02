import MonthArrow from "./MonthArrow";
import { MonthPicker } from "./MonthPicker";
import YearArrow from "./YearArrow";
import { YearPicker } from "./YearPicker";

type Props = {
    month: number;
    year: number;
    toPath: string;
    withMonths?: boolean;
};

export default function DateSetter({ withMonths, month, year, toPath }: Props) {
    if (withMonths) {
        return (
            <div className="flex items-center gap-0 @[350px]:gap-2 justify-center px-1 py-2 md:px-6">
                <MonthArrow decrement month={month} year={year} toPath={toPath} />

                <div className="flex flex-col items-center w-[90px] md:w-[120px] select-none justify-center">
                    <MonthPicker year={year} month={month} toPath="/home" />
                    <YearPicker year={year} month={month} toPath="/home" />
                </div>

                <MonthArrow month={month} year={year} toPath={toPath} />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-0 @[350px]:gap-2 justify-center px-1 py-2 md:px-6">
            <YearArrow decrement year={year} toPath={toPath} />

            <div className="flex flex-col items-center w-[90px] md:w-[120px] select-none justify-center">
                <YearPicker year={year} month={month} toPath="/home" />
            </div>

            <YearArrow year={year} toPath={toPath} />
        </div>
    );
}
