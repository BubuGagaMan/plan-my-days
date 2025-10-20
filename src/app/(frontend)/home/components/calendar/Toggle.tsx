"use client";

import { useId } from "react";

interface ToggleProps {
    label?: string;
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    grid?: boolean;
}

export default function Toggle({ label, checked, onChange, disabled, grid }: ToggleProps) {
    const id = useId();

    return (
        <div
            className="gap-1.5"
            style={{
                display: grid ? "grid" : "flex",
                justifyContent: grid ? undefined : "space-between",
                justifyItems: grid ? "center" : undefined,
            }}
        >
            <label htmlFor={id} className="font-medium select-none">
                {label}
            </label>

            <button
                id={id}
                role="switch"
                aria-checked={checked}
                aria-label={label}
                aria-disabled={disabled}
                disabled={disabled}
                onClick={() => {
                    onChange();
                }}
                onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        onChange();
                    }
                }}
                className={`
          relative inline-flex h-4 w-9 md:h-6  md:w-11 shrink-0 rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500
          inset-shadow-[1px_1px_3px_1px_black]
          focus:ring-offset-2 ${checked ? "bg-neutral-800/90" : "bg-gray-300"}
          ${disabled ? "opacity-50" : ""}
        `}
                style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                }}
            >
                <span
                    aria-hidden="true"
                    className={`
            pointer-events-none inline-block h-3 w-3 md:h-5 md:w-5 transform rounded-full 
             transition duration-200 ease-in-out
            ${
                checked
                    ? "translate-x-5 bg-red-900/80 inset-shadow-[0_0_4px_5px_rgba(215,134,0,1)] shadow-[0_0_4px_3.5px_rgba(215,134,0,0.7)] "
                    : "translate-x-0 bg-gray-800/90 inset-shadow-[0_0_3px_4px_rgba(85,85,85,0.9)]  "
            }
            
          `}
                    //   style={{ color: "#d78600ff"}}
                />
            </button>
        </div>
    );
}
