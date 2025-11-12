import { Metadata } from "next";
import Modal from "../../../Modal";
import DayDetails from "@/app/(frontend)/home/(sub-paths)/day/[date]/details/DayDetails";

type Props = { params: Promise<{ date: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { date } = await params;
    return {
        // use the data from the params to set a dynamic title
        title: `Calendary day of date: ${date}`,
        description: `A page showing details about a selcted date - such as notes and the user's mark for that day - all of which are also editable`,
    };
};

export default async function DayDetailsModalPage({ params }: Props) {
    const { date } = await params;

    return (
        <Modal>
            <DayDetails date={date} isModal />
        </Modal>
    );
}
