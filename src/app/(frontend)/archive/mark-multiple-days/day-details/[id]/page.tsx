import { getMarkedDayById } from "@/app/services/markedDays.services";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function DayDetails({ params }: Props) {
    const dayId = (await params).id

    const markedDay = await getMarkedDayById(dayId)

    return(
        <div>
            <p>

                LOL!
            </p>
        </div>
    )
}
