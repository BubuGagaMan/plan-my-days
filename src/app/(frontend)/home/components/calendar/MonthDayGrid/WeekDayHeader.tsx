export default function WeekDayHeader({ small }: { small?: boolean }) {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
        <>
            {weekDays.map((weekDay: string, i: number) => {
                return (
                    <div className="text-center" key={i + weekDay}>
                        {small ? weekDay[0] : weekDay}
                    </div>
                );
            })}
        </>
    );
}
