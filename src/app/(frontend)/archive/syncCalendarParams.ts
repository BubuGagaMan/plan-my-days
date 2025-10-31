import { NextRequest, NextResponse } from "next/server";
import { validateCalendarGrid, validateMonth, validateRegion, validateYear } from "../../utilities/validators/validateCalendarParams";
import { UKRegion } from "../../api/public-holidays/route";

export function syncCalendarParams(req: NextRequest): NextResponse | null {
  const url = req.nextUrl.clone();
  const now = new Date();

  type CalendarParams = {
    [key: string]: {
      cookie?: string | null;
      searchParam?: string | null;
      validator: (input: any) => boolean;
      valid: string;
    };
  };

  const calendarParams: CalendarParams = {
    month: { validator: validateMonth, valid: now.getMonth().toString() }, // 0-11
    year: { validator: validateYear, valid: now.getFullYear().toString() },
    region: { validator: validateRegion, valid: UKRegion.ENGLAND },
    "calendar-grid": { validator: validateCalendarGrid, valid: "month" },
  };

  // Read cookies and searchParams
  for (const key in calendarParams) {
    calendarParams[key].cookie = req.cookies.get(key)?.value ?? null;
    calendarParams[key].searchParam = url.searchParams.get(key) ?? null;
  }

  let modified = false;
  const res = NextResponse.next(); // Response to write cookies

  for (const key in calendarParams) {
    const { validator, valid } = calendarParams[key];
    const cookieVal = calendarParams[key].cookie;
    const paramVal = calendarParams[key].searchParam;

    // Validate cookie, write if invalid
    if (!validator(cookieVal)) {
      res.cookies.set(key, valid);
    }

    // Validate searchParam, update URL if invalid
    if (!validator(paramVal)) {
      url.searchParams.set(key, valid);
      modified = true;
    }
  }

  // Redirect only if URL actually changed (prevents loops)
  if (modified && url.toString() !== req.url) {
    return NextResponse.redirect(url);
  }

  return res;
}
