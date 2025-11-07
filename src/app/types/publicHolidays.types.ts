export enum UKRegion {
    ENGLAND = "england-and-wales",
    SCOTLAND = "scotland",
    NORTHERN_IRELAND = "northern-ireland",
}

export const UKRegionSet = new Set<string>(Object.values(UKRegion));