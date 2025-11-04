import { UKRegion } from "../../../../../services/publicHolidays.services";
import SelectPicker from "../../base/SelectPicker";
import { CalendarGrid } from "../../../../../types/dateTypes";
import DateSetter from "./dateSetter/DateSetter";

type Props = {
    month: number;
    year: number;
    toPath: string;
    region: UKRegion;
    calendarGrid: CalendarGrid;
};

export function CalendarHeader({ month, year, toPath, region, calendarGrid }: Props) {
    const calendarGridOptions = [
        { value: CalendarGrid.MONTH, label: "Month" },
        { value: CalendarGrid.YEAR, label: "Year" },
    ];

    const regionSelectOptions = [
        { value: UKRegion.ENGLAND, label: "England & Wales" },
        { value: UKRegion.SCOTLAND, label: "Scotland" },
        { value: UKRegion.NORTHERN_IRELAND, label: "Northern Ireland" },
    ];

    return (
        <div className="w-full bg-red-800/70 text-white rounded-t-md  relative shadow-[0_0_5px_1px_black] ">
            <div className="flex items-center justify-between px-0 sm:px-4 py-2 md:px-6 @container">
                <DateSetter
                    month={month}
                    year={year}
                    toPath={toPath}
                    withMonths={calendarGrid === CalendarGrid.MONTH}
                />
                <div className="flex flex-wrap gap-2">
                    <SelectPicker
                        label="View"
                        options={calendarGridOptions}
                        paramTarget="calendar-grid"
                        paramValue={calendarGrid}
                    />
                    <SelectPicker
                        label="Region"
                        options={regionSelectOptions}
                        paramTarget="region"
                        paramValue={region}
                    />
                </div>
            </div>
        </div>
    );
}
