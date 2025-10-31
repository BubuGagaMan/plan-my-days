export enum UKRegion {
    ENGLAND = "england-and-wales",
    SCOTLAND = "scotland",
    NORTHERN_IRELAND = "northern-ireland",
}

export const UKRegionSet = new Set<string>(Object.values(UKRegion));

type PublicHolidayEvent = {
    title: string;
    date: string;
    notes: string;
    bunting: boolean;
};

type PublicHolidaysData = {
    [key in UKRegion]: {
        division: string;
        events: PublicHolidayEvent[];
    };
};

const WEEK = 60 * 60 * 24 * 7;

export const getPublicHolidays = async (region: UKRegion) => {

    const res = await fetch("https://www.gov.uk/bank-holidays.json", {
        next: { revalidate: WEEK }, // cache external API data for 7 days
    });

    if (!res.ok) throw new Error("Failed to fetch holidays");

    const data: PublicHolidaysData = await res.json();
    return data[region].events;
};
