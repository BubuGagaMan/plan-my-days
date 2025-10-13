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

export const fetchPublicHolidays = async (region: UKRegion) => {
    const res = await fetch("https://www.gov.uk/bank-holidays.json");
    const data: PublicHolidaysData = await res.json();

    const publicHolidays = data[region].events;
    return publicHolidays;
};