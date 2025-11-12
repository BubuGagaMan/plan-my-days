import { Metadata } from "next";
import DayDetails from "./DayDetails";

type Props = { params: Promise<{ date: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { date } = await params;
    return {
        // @TODO - need to improve this maybe?
        title: `Calendary day of date: ${date}`,
        description: `A page showing details about a selcted date - such as notes and the user's mark for that day - all of which are also editable`,
    };
};

export default async function DayDetailsPage({ params }: Props) {
    const { date } = await params;

    return <DayDetails date={date} />;
}
