"use client";

import { useFormStatus } from "react-dom";
import { updateDayNotes } from "../serverActions";
import { useRouter, useSearchParams } from "next/navigation";
import { useDetailsEdit } from "../DetailsEditContext";
import { LoadingSpinner } from "@/app/(frontend)/components/LoadingSpinner";

type Props = {
    date: string;
};

export default function SubmitNewDayNotes({ date }: Props) {
    const { pending } = useFormStatus();
    const { setIsEditing, isModal, setStateNotes } = useDetailsEdit();
    const router = useRouter();

    const searchParams = useSearchParams();
    console.log(searchParams);

    const formAction = async (formData: FormData) => {
        const newNotes = String(formData.get("notes"));
        await updateDayNotes(formData);
        if (isModal) {
            setStateNotes(newNotes || "");
            router.replace(`/home/day/${date}/details`);
        }

        setIsEditing((prevState) => ({ ...prevState, notes: false }));
    };

    return (
        <button
            disabled={pending}
            type="submit"
            formAction={formAction}
            className="w-full max-w-100 mx-auto bg-red-600 hover:bg-red-700 transition-colors py-2 rounded-lg text-white font-medium shadow-lg cursor-pointer"
        >
            {pending ? <LoadingSpinner /> : "Save"}
        </button>
    );
}
