"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import CreateDayMarkFormContent from "../../(sub-paths)/create-day-mark/components/CreateDayMarkFormContent";
import Modal from "../Modal";

export default function CreateDayMarkIntercept() {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const handleSubmit = () => {
        () => dialogRef.current?.close();
        router.back();
    };

    return (
        <Modal>
            <CreateDayMarkFormContent formHeader="Create a new day mark" handleSubmit={handleSubmit} />
        </Modal>
    );
}
