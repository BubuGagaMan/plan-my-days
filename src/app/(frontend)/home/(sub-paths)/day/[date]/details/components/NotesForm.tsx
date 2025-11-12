import { UserMarkedDay } from "@/app/services/markedDays.services";
import SubmitNewDayNotes from "./SubmitNewDayNotes";

type Props = {
    day: UserMarkedDay;
};

export default function NotesForm({ day }: Props) {
    return (
        <form className="space-y-4 grid">
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                    Notes
                </label>
                <textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    // Use defaultValue to pre-fill the textarea
                    defaultValue={day.notes || ""}
                    placeholder="Add your notes for this day..."
                    className="w-full 
                    px-4 py-2
                    rounded-lg 
                    bg-neutral-900 border border-neutral-700 text-white 
                    placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent min-h-[120px]"
                />
            </div>

            {/* Hidden input to pass the date to the server action */}
            <input type="hidden" name="date" value={day.date} />

            <SubmitNewDayNotes date={day.date} />
        </form>
    );
}
