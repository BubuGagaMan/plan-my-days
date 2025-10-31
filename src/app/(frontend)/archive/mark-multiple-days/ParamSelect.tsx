"use client";

import { PropsWithChildren, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = PropsWithChildren<{
    name: string;
}>;

export default function ParamSelect({ children, name }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        // Create a new URLSearchParams object from current params
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        // Update the URL without a full page reload
        router.push(`?${params.toString()}`);
    };

    return (
        <select
            name={name}
            defaultValue={searchParams.get(name) || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
            {children}
        </select>
    );
}
