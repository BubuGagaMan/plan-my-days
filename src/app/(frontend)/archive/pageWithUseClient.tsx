"use client";
import { useEffect, useState } from "react";
import { Day } from "../../types/dateTypes";
import { daysOfTheWeek, monthsOfTheYear } from "../../maps/dateMaps";
import { generateCalendarMonth } from "./generateCalendarMonth";


export default function Home() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [offDays, setOffDays] = useState<Day[]>([]);
    const [monthDays, setMonthDays] = useState(() => generateCalendarMonth(year, month + 1, offDays));
    const [assignedOffDays, setAssignedOffDays] = useState(0);

    useEffect(() => {
        const newMonthDays = generateCalendarMonth(year, month + 1, offDays);
        setMonthDays(newMonthDays);
    }, [month, year]);

    const decrementMonth = () => {
        setMonth((prevState) => (prevState - 1 < 0 ? 11 : prevState - 1));
    };
    const incrementMonth = () => {
        setMonth((prevState) => (prevState + 1 > 11 ? 0 : prevState + 1));
    };

    const incrementYear = () => {
        setYear((prevState) => prevState + 1);
    };
    const decrementYear = () => {
        setYear((prevState) => prevState - 1);
    };

    const handleDateClick = (day: Day) => {
        const isWeekend = day.day == 0 || day.day == 6;
        // can't assign the day of if there are no more assignable days off
        if ((!day.offDay && assignedOffDays < 1) || isWeekend) return;
        setMonthDays((prevState: Day[]) => {
            const newState = prevState.map((prevStateDay: Day) => {
                if (day.date == prevStateDay.date) {
                    return {
                        ...prevStateDay,
                        offDay: !prevStateDay.offDay,
                    };
                }
                return prevStateDay;
            });
            return newState;
        });

        if (!isWeekend) {
            setAssignedOffDays((prevValue: number) => (day.offDay ? prevValue + 1 : prevValue - 1));
        }

        if (!day.offDay) {
            setOffDays((prevState) => [...prevState, day]);
        } else {
            // added an extra return block for readibility...
            setOffDays((prevState: Day[]) => {
                return prevState.filter((prevStateDay: Day) => day.date !== prevStateDay.date);
            });
        }
    };

    return (
        <>
            <h1>
                HOME 
            </h1>
            <label>
                ASSIGNABLE OFF DAYS: <input onChange={(e: any) => setAssignedOffDays(Number(e.target.value))} />
            </label>
            <h3>{assignedOffDays}</h3>
            <div className="flex justify-between w-50 m-auto my-3">
                <button className="transition-[border-color] duration-60 cursor-pointer text-xl border border-white rounded-sm px-3 hover:border-yellow-600 hover:text-yellow-600" onClick={decrementYear}>{"<="}</button>
                <h3>{year}</h3>
                <button className="transition-[border-color] duration-60 cursor-pointer text-xl border border-white rounded-sm px-3 hover:border-yellow-600 hover:text-yellow-600" onClick={incrementYear}>{"=>"}</button>
            </div>
            <div className="flex justify-between w-50 m-auto">
                <button className="transition-[border-color] duration-60 cursor-pointer text-xl border border-white rounded-sm px-3 hover:border-yellow-600 hover:text-yellow-600" onClick={decrementMonth}>{"<="}</button>
                <h3>
                    {monthsOfTheYear[month]}
                </h3>
                <button className="transition-[border-color] duration-60 cursor-pointer text-xl border border-white rounded-sm px-3 hover:border-yellow-600 hover:text-yellow-600" onClick={incrementMonth}>{"=>"}</button>
            </div>
            <div className="flex justify-center m-5">
                <div className="grid gap-2 w-fit  grid-cols-[repeat(3,auto)] md:grid-cols-[repeat(7,auto)] ">
                    {/* tailwind classes are the most disgusting piece of tech debt, but good for quick projects, look at this slop below */}
                    {monthDays.map((day: Day) => (
                        <div
                            onClick={() => handleDateClick(day)}
                            key={day.date}

                            className={`transition-[background-color] duration-150 ease-in-out border grid gap-1 w-20 sm:w-25 md:w-25 lg:w-30 h-20 sm:h-25 md:h-30 p-1 md:p-3 cursor-pointer hover:bg-gray-700 rounded-xs text-xs sm:text-sm md:text-sm lg:text-base ${
                                day.offDay ? "border-green-700" : "border-red-800"
                            }`}
                        >
                            <h2>{day.date}</h2>
                            <h2 className="justify-self-center ">{daysOfTheWeek[day.day]}</h2>
                            <h2 className="justify-self-center">{day.offDay ? "OFF DAY" : "-"}</h2>
                        </div>
                    ))}
                </div>
            </div>
            {offDays.map((day: Day) => {
                return (
                    <div className="flex gap-4" key={`${day.date} + ${day.month} + ${day.year}`}>
                        <h3>{day.year}</h3>
                        <h3>{monthsOfTheYear[day.month - 1]}</h3>
                        <h3>{day.date}</h3>
                        <h3>{daysOfTheWeek[day.day]}</h3>
                    </div>
                );
            })}
        </>
    );
}
