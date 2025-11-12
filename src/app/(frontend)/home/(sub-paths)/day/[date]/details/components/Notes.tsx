"use client";
import { useDetailsEdit } from "../DetailsEditContext";
export default function Notes({ notes, form }: { notes: string | null; form: React.ReactNode }) {
    const { isEditing, setIsEditing, stateNotes, isModal } = useDetailsEdit();

    console.log("STATE NOTES NOTES>TSX: ", stateNotes);

    const setEditingNotes = (setting: boolean) => {
        setIsEditing((prevState) => ({ ...prevState, notes: setting }));
    };

    const baseElements = (
        <>
            <p className="border border-gray-100/15 min-h-20 flex items-center justify-center rounded-sm p-2">
                {isModal ? stateNotes : notes}
            </p>
            <button
                className="w-full max-w-100 mx-auto bg-red-600 hover:bg-red-700 transition-colors py-2 rounded-lg text-white font-medium shadow-lg cursor-pointer"
                onClick={() => setEditingNotes(true)}
            >
                {notes || (isModal && stateNotes) ? "Edit" : "Add"} notes
            </button>
        </>
    );

    return (
        <>
            <div className="max-w-150 grid mx-auto gap-2 text-white">
                {!isEditing.notes && <h2>Notes:</h2>}
                {!isEditing.notes ? baseElements : form}
                {isEditing.notes && (
                    <button
                        className="w-full max-w-100 mx-auto bg-red-600 hover:bg-red-700 transition-colors py-2 rounded-lg text-white font-medium shadow-lg cursor-pointer"
                        onClick={() => setEditingNotes(false)}
                    >
                        Cencel
                    </button>
                )}
            </div>
        </>
    );
}
