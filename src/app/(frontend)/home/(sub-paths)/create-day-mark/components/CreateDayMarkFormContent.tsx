"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import StatefulInput from "./StatefulInput";
import SubmitNewDayMark from "./SubmitNewDayMark";
import Link from "next/link";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import ColorPickerInput from "./ColorPickerInput";
import PreviewDayCard from "./PreviewDayCard";

type Props = {
    formHeader: string;
    isNotModal?: boolean;
    handleSubmit?: (() => void) | null;
};

export default function CreateDayMarkFormContent({ formHeader, handleSubmit = null, isNotModal = false }: Props) {
    const [title, setTitle] = useState("");
    const [titleError, setTtitleError] = useState("");
    const [bgColor, setBgColor] = useState("#b12b2bff");
    const [bgColorError, setBgColorError] = useState(false);
    const [fontColor, setFontColor] = useState("#000000");
    const [fontColorError, setFontColorError] = useState(false);

    const validateAndSetTitle = (value: string) => {
        setTitle(value);
        if (value.length < 11) {
            setTtitleError("");
        } else {
            setTtitleError("Maximum length of 10 characters exceeded");
        }
    };

    const setColor = (
        e: ChangeEvent<HTMLInputElement>,
        valueSetter: Dispatch<SetStateAction<string>>,
        errorSetter: Dispatch<SetStateAction<boolean>>
    ) => {
        valueSetter(e.target.value);
        const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
        if (!hexRegex.test(e.target.value)) {
            errorSetter(true);
        } else {
            errorSetter(false);
        }
    };

    const router = useRouter();
    const searchParams: ReadonlyURLSearchParams = useSearchParams();

    const routeToHome = () => {
        router.push("/home");
    };

    return (
        <div className="w-full max-w-200 mx-auto bg-neutral-800 p-8 rounded-2xl shadow-xl border border-neutral-700 m-2">
            {formHeader && <h2 className="text-2xl font-semibold text-white text-center">{formHeader}</h2>}
            <div className="grid justify-center">
                <div>
                    <h2 className="text-center  m-1 text-white">Preview</h2>
                </div>
                <div className="w-20 h-20">
                    <PreviewDayCard
                        bgColor={bgColor}
                        fontColor={fontColor}
                        title={title.length > 10 ? title.slice(0, 8) + "..." : title}
                    />
                </div>
            </div>
            <form className="w-full max-w-md mx-auto bg-neutral-800 p-8 space-y-4">
                <div className="space-y-4">
                    <label className="block text-gray-300 text-sm font-medium">
                        Title:
                        <StatefulInput
                            required
                            onChange={(e) => validateAndSetTitle(e.target.value)}
                            name="title"
                            value={title}
                            error={titleError.length > 0 ? true : false}
                            placeholder="Enter title"
                        />
                        <p className="text-red-600">{titleError}</p>
                    </label>

                    <label className="block text-gray-300 text-sm font-medium">
                        Background color:
                        <ColorPickerInput
                            value={bgColor}
                            onChange={(color) => setColor(color, setBgColor, setBgColorError)}
                            error={bgColorError}
                            name="background_color"
                        />
                    </label>

                    <label className="block text-gray-300 text-sm font-medium">
                        Font color:
                        <ColorPickerInput
                            value={fontColor}
                            onChange={(color) => setColor(color, setFontColor, setFontColorError)}
                            error={fontColorError}
                            name="font_color"
                        />
                    </label>
                </div>

                <SubmitNewDayMark
                    disabled={fontColorError || bgColorError || !!titleError.length}
                    handleSubmit={handleSubmit ? handleSubmit : routeToHome}
                />

                {isNotModal && (
                    <Link
                        href={`/home?${new URLSearchParams(searchParams)}`}
                        className="
                            py-2 rounded-lg text-white font-medium
                            bg-neutral-700 hover:bg-neutral-600
                            border border-neutral-600
                            transition-colors shadow cursor-pointer
                            px-3 flex justify-center
                   
                        "
                    >
                        To home
                    </Link>
                )}
            </form>
        </div>
    );
}
