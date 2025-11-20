import Calendar from "./components/calendar/Calendar";
import { CalendarClientWrapper } from "./components/calendarClientWrapper/CalendarClientWrapper";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MarkMultipleDaysPage({ searchParams }: Props) {
    const SP = await searchParams;

    // await setCalendarParamsAction(SP);
    return (
        <>
            <div className="w-full h-full">
                <CalendarClientWrapper>
                    <Calendar SP={SP} />
                </CalendarClientWrapper>
            </div>
        </>
    );
}
