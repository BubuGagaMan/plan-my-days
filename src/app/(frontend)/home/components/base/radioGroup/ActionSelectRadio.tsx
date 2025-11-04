type Props = {
    name: string;
    value: string;
    label: string;
};

export default function ActionSelectRadio({ name, value, label }: Props) {
    return (
        <>
            <span className="text-shadow-[0_0_5px_black] text-center">{label}</span>
            <input type="radio" name={name} value={value} />
        </>
    );
}
