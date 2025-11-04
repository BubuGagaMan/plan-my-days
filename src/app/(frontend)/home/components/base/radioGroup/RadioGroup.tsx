import "./styles.css";
import { ReactNode, useState } from "react";

type Option = {
    option: ReactNode;
    value: string;
};

type Props = {
    options: Option[];
    handleChange: (value: any) => void;
    disabled?: boolean;
};

export default function RadioGroup({ options, handleChange, disabled }: Props) {
    const optionValuesArr = options.map((opt) => opt.value);

    const [selectedOption, setSelectedOption] = useState(options[0].value);

    const radioOptsions = options.map((option) => {
        return (
            <label
                key={option.value}
                className="radio-option z-1 px-2 py-0.5  text-white font-semibold "
                style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                onClick={() => {
                    if (!disabled) {
                        setSelectedOption(option.value);
                        handleChange(option.value);
                    }
                }}
            >
                {option.option}
            </label>
        );
    });
    const singleOptionPercentageUptake = Number(((1 / options.length) * 100).toFixed(2));

    return (
        <div
            className={`relative text-center bg-neutral-800/90 inset-shadow-[1px_1px_3px_1px_black] rounded-sm  shadow-sm shadow-black items-center        
                
            min-[500px]:text-[12px] max-[640px]:text-[12px]
            min-[400px]:text-[10px] max-[500px]:text-[10px]
            max-[330px]:text-[10px] 
            sm:text-sm 
            md:text-base 
            lg:text-lg`}
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
                opacity: disabled ? "0.5" : "1",
            }}
        >
            {radioOptsions}
            {!disabled && (
                <div
                    className={`absolute h-full  transition-all duration-100 ease-in-out shadow-[0_0_4px_0px_yellow] bg-yellow-800/90  rounded-md`}
                    style={{
                        left: `${optionValuesArr?.indexOf(selectedOption) * singleOptionPercentageUptake}%`,
                        width: `${singleOptionPercentageUptake}%`,
                    }}
                />
            )}
        </div>
    );
}
