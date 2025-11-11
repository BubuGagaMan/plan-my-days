"use client";
import { useFormStatus } from "react-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { createDayMarkAction } from "../createDayMark.action";

export default function SubmitNewDayMark({ disabled, handleSubmit }: { disabled: boolean; handleSubmit: () => void }) {
    const { pending } = useFormStatus();

    const formAction = async (formData: FormData) => {
        await createDayMarkAction(formData);
        handleSubmit();
    };

    return (
        <button
            type="submit"
            disabled={pending || disabled}
            formAction={formAction}
            className={`w-full py-2 rounded-lg text-white font-medium 
      ${pending || disabled ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 cursor-pointer"}
      transition-colors shadow-lg`}
        >
            {pending ? <LoadingSpinner /> : "Create new mark"}
        </button>
    );
}
