// export const revalidate = 604800

// export const dynamic = "force-dynamic"; // forces fresh data
// export const revalidate = 0; // disables ISR cache

import { getAllDayMarks } from "@/app/services/dayMarks.services";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const userDayMarks = (await getAllDayMarks()) ?? [];
    return Response.json(userDayMarks);
}
