"use client";

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
    {
        title: "Github",
        href: "#"
    },
    {
        title: "Instagram",
        href: "#"
    },
    {
        title: "Twitter",
        href: "#"
    },
    {
        title: "LinkedIn",
        href: "#"
    },
];

export const Footer = () => {
    return (
        <footer className="relative -z-10 overflow-x-clip">
            <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-400/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10" />
            <div className="container">
                <div className="border-t border-white/15 py-16 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
                    <div className="text-white/40">&copy; {new Date().getFullYear()}. All rights reserved.</div>
                    <nav className="flex flex-col md:flex-row items-center gap-8">
                        {footerLinks.map((footer) => (
                            <a
                                key={footer?.title}
                                href={footer?.href}
                                className="inline-flex items-center gap-1.5 !cursor-pointer"
                            >
                                <span className="font-semibold">{footer?.title}</span>
                                <ArrowUpRightIcon className="size-4" />
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    )
}