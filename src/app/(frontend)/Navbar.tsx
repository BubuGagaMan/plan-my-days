"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "@/app/(frontend)/auth/Logout";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";

interface NavBarProps {
    user: { name: string } | null;
}

interface calendarParams {
    regionParam?: string
    calendarGridParam?: string
}

export default function NavBar({ user }: NavBarProps) {
    const pathname = usePathname();
    const [calendarParams, setCalendarParams] = useState<calendarParams>({});
    const [loading, setLoading] = useState(true);

    const date = new Date();

    useEffect(() => {
        fetch("/api/calendar-params")
            .then((res) => res.json())
            .then((data) => setCalendarParams(data))
            .catch((err) => console.error(err));
        setLoading(false);
    }, [pathname]);

    useEffect(() => {
        console.log("data: ", calendarParams);
    }, [calendarParams]);

    // console.log("CALENDARPARAMS", calendarParams);

    if (loading) {
        return <LoadingSpinner />;
    }

    const homeParams = `/home?year=${date.getFullYear()}&month=${date.getMonth()}&region=${
        calendarParams?.regionParam
    }&calendar-grid=${calendarParams?.calendarGridParam}`;

    const links = [
        { href: homeParams, label: "Calendar", isActiveMatch: "/home" },
        { href: "/stats", label: "Stats", isActiveMatch: "/stats"},
        { href: "/profile", label: "Profile", isActiveMatch: "/profile"},
    ];

    return (
        <nav className="h-14 w-full bg-neutral-800 border-b border-neutral-700 grid grid-cols-2 sm:grid-cols-3 items-center justify-between px-6 shadow-lg">
            <div className="flex space-x-3 sm:space-x-6 justify-self-center col-start-1 sm:col-start-2">
                {links.map(({ href, label, isActiveMatch }) => {
                    const isActive = pathname === href || pathname.startsWith(isActiveMatch)
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={`transition-colors font-medium ${
                                isActive ? "text-red-400 border-b-2 border-red-400" : "text-gray-300 hover:text-red-400"
                            }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>
            <div className="grid justify-end">
                <Logout />
            </div>
        </nav>
    );
}
