import type { ReactNode } from "react";

interface HomeLayoutProps {
    children: ReactNode;
    modal: ReactNode | null;
    // calendar: ReactNode;
}

export default function HomeLayout({ children, modal }: HomeLayoutProps) {
    return (
        <div className="flex flex-col h-screen w-full">
            <div className="w-full flex-1">{children}</div>
            <div>{modal}</div>
        </div>
    );
}
