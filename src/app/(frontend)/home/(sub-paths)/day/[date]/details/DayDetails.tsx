import { getMarkedDayByDate, UserMarkedDay } from "@/app/services/markedDays.services";
import Notes from "./components/Notes";
import NotesForm from "./components/NotesForm";
import { DetailsEditProvider } from "./DetailsEditContext";

// dynamic route page
type Props = { date: string; isModal?: boolean };

export default async function DayDetails({ date, isModal }: Props) {
    //@TODO need to add a 404 if date not found ?
    const data: UserMarkedDay[] | null = await getMarkedDayByDate(date);
    const day = data && data[0];

    if (!day) {
        return (
            <h1 className="text-white">
                Unmarked day - add a mark to enable details (perhaps could add notes to unmaked days if I get
                sponsored... as well as other things)
            </h1>
        );
    }

    return (
        <DetailsEditProvider isModal={isModal} notes={day?.notes}>
            <div className="w-full max-w-200 bg-neutral-800 rounded-2xl shadow-xl p-8 border border-neutral-700 mx-auto  gap-2 my-5">
                <h1 className="text-3xl font-semibold text-center text-white mb-6">
                    {new Date(date).toLocaleDateString("en-UK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC", // Ensure consistent date parsing
                    })}
                </h1>
                <div className="mb-6">
                    <h2 className="block text-sm font-medium text-gray-300 mb-2 text-center">Day Mark</h2>
                    <div className="flex justify-center">
                        {day?.day_mark ? (
                            <span
                                className="px-4 py-2 rounded-full font-medium text-sm shadow-lg"
                                style={{
                                    backgroundColor: day.day_mark.background_color,
                                    color: day.day_mark.font_color,
                                }}
                            >
                                {day.day_mark.title}
                            </span>
                        ) : (
                            <span className="text-gray-500 text-sm">No mark set</span>
                        )}
                    </div>
                </div>
                <Notes notes={day?.notes ? day.notes : ""} form={<NotesForm day={day} />} />
            </div>
        </DetailsEditProvider>
    );
}
