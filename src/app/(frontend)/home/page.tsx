import QueryParamInput from "./components/QueryParamInput";
import Calendar from "./components/calendar/Calendar";

export default function Home({ searchParams }: { searchParams: any }) {
    return (
        <>
            <h1>HOME</h1>
            <QueryParamInput label="assignable off days" />
            <Calendar searchParams={searchParams} />
        </>
    );
}
