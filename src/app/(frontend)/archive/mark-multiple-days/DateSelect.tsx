"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getMonthEnd } from "../../../utilities/getMonthEnd";

type DaysSelectProps = {
  name?: string;
  yearParam: string;  // name of the query param for year
  monthParam: string; // name of the query param for month
};

export default function DaysSelect({ name = "day", yearParam, monthParam }: DaysSelectProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get year and month from URL based on the prop names
  const yearParamValue = searchParams.get(yearParam);
  const monthParamValue = searchParams.get(monthParam);

  const currentYear = new Date().getFullYear();
  const year = yearParamValue ? parseInt(yearParamValue, 10) : currentYear;
  const month = monthParamValue ? parseInt(monthParamValue, 10) : 0; // default to Jan

  // If either param is missing, push defaults to URL
  useEffect(() => {
    if (!yearParamValue || !monthParamValue) {
      const params = new URLSearchParams(searchParams.toString());

      if (!yearParamValue) params.set(yearParam, currentYear.toString());
      if (!monthParamValue) params.set(monthParam, "0");

      router.replace(`?${params.toString()}`);
    }
  }, [yearParamValue, monthParamValue, currentYear, router, searchParams, yearParam, monthParam]);

  const daysInMonth = getMonthEnd(year, month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <select
      name={name}
      defaultValue={searchParams.get(name) || ""}
      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
    >
      <option value="">Select day</option>
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
}
