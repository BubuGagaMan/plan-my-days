interface StatefulInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: () => void
    name: string;
    required?: boolean;
    error?: boolean;
    placeholder?: string;
}

export default function StatefulInput({
    value,
    onChange,
    onFocus,
    onBlur,
    onClick,
    name,
    required = false,
    error = false,
    placeholder = "",
}: StatefulInputProps) {

    return (
        <input
            type="text"
            name={name}
            value={value}
            onClick={onClick}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
            placeholder={placeholder}
            className={`
        w-full px-4 py-2 rounded-lg 
        bg-neutral-900 text-white placeholder-gray-500
        border ${error ? "border-red-500" : "border-neutral-700"}
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
        transition-colors
      `}
        />
    );
}
