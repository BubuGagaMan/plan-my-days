import { useState } from "react";
import StatefulInput from "./StatefulInput";

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    placeholder?: string;
    name: string;
};

export default function ColorPickerInput({ value, onChange, error, placeholder, name }: Props) {
    const [showPalette, setShowPalette] = useState(false);

    const defaultColors = [
        "#e63946", // Red
        "#f28444", // Red-Orange (new)
        "#f3722c", // Orange
        "#f6b83d", // Orange-Yellow (new)
        "#f9c74f", // Yellow
        "#b4d876", // Yellow-Green (new)
        "#90be6d", // Green
        "#63b48c", // Green-Teal (new)
        "#43aa8b", // Teal
        "#4d908e", // Blue-green
        "#577590", // Blue
        "#6a4c93", // Indigo/Purple
        "#1c1c1c", // Dark
        "#f5f5f5", // Light
    ];

    return (
        <div className="relative">
            <StatefulInput
                value={value}
                onChange={(e) => onChange(e)}
                onFocus={() => setShowPalette(true)}
                onBlur={() => setTimeout(() => setShowPalette(false), 200)}
                onClick={() => setShowPalette(true)}
                placeholder={placeholder}
                error={error}
                name={name}
            />

            {showPalette && (
                <div className="absolute top-full left-0 mt-1 flex gap-2 flex-wrap grid bg-neutral-700 p-2 rounded shadow-lg z-10">
                    <h3>Preset colors</h3>
                    <div className="grid grid-cols-7 gap-1">
                        {defaultColors.map((color) => (
                            <div
                                key={color}
                                className="w-6 h-6 rounded cursor-pointer border border-gray-300"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    // Directly call the setter instead of faking an event
                                    onChange({ target: { value: color } } as React.ChangeEvent<HTMLInputElement>);
                                    // setShowPalette(false);
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
