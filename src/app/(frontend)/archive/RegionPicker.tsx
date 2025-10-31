"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { UKRegion } from "../../services/publicHolidays.services";


interface RegionPickerProps {
  region: UKRegion;
}

export default function RegionPicker({ region }: RegionPickerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state with region prop
  const [selectedRegion, setSelectedRegion] = useState(region);

  useEffect(() => {
    setSelectedRegion(region);
  }, [region]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value as UKRegion;
    setSelectedRegion(newRegion);

    // Update URL params while keeping existing ones
    const params = new URLSearchParams(searchParams.toString());
    params.set("region", newRegion);

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <select
        className="text-xs md:text-base text-center "
        value={selectedRegion}
        onChange={handleSelect}
      >
        <option value={UKRegion.ENGLAND}>England & Wales</option>
        <option value={UKRegion.SCOTLAND}>Scotland</option>
        <option value={UKRegion.NORTHERN_IRELAND}>Northern Ireland</option>
      </select>
    </div>
  );
}
