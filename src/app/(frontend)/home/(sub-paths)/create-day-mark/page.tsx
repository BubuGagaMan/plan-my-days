import { getAllDayMarks } from "@/app/services/dayMarks.services";
import CreateDayMarkFormContent from "./components/CreateDayMarkFormContent";


export default async function CreateDayMarkPage() {

    const userDayMarks = await getAllDayMarks() ?? []
    const dayMarkTitles = new Set(userDayMarks.map(mark => mark.title))
    //console.log(dayMarkTitles)
    return <CreateDayMarkFormContent userDayMarkTitles={dayMarkTitles} formHeader={"Create a new day mark"} isNotModal />;
}
