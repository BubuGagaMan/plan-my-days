"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function QueryParamInput({ label }: { label: string }) {
    const [query, setQuery] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = () => {
    const params = new URLSearchParams(searchParams);
        params.set("faa", query);
        // params.set("sussy", "sadas")
    
        router.push(`/home?${params.toString()}`);
    };

    return (
        <>
            <label>
                {label}
                <input onChange={handleInputChange} />
            </label>
            <button onClick={handleSubmit}>SUBMIT</button>
        </>
    );
}
