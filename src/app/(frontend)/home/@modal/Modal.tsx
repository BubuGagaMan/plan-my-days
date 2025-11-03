"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const onClose = () => {
        dialogRef.current?.close();
        router.back();
        router.refresh()
    };

    return (
        <dialog
            ref={dialogRef}
            className="border border-red-800/50 p-8 rounded backdrop:bg-slate-800/65 bg-black/85 w-full m-auto max-w-150 grid gap-4"
        >
            <button
                className="
                absolute 
                top-2 right-2 
                rounded-[2px]  
                hover:bg-red-800 transition-all duration-150
                cursor-pointer"
                onClick={onClose}
            >
                <IoClose size={24} color="white" />
            </button>
            {children}
            <button
                className="
                rounded-[3px]
                hover:bg-red-800 transition-all duration-150
                cursor-pointer 
                text-white
                text-lg
                border
                bg-red-800/60
                py-1
                border-red-800
                h-10
                "
                onClick={onClose}
            >
                close
            </button>
        </dialog>
    );
}
