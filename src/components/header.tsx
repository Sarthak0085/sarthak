"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import MenuIcon from "@/assets/icons/list-menu-icon.svg";
import { useClickOutside } from "@/hooks/use-click-outside";

const navItems = [
    {
        name: "Home",
        href: "#home"
    },
    {
        name: "About",
        href: "#about"
    },
    {
        name: "Projects",
        href: "#projects"
    },
    {
        name: "Contact",
        href: "#contact"
    },
]

export const Header = () => {
    const [select, setSelect] = useState("#home");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropDownRef = useRef(null);
    useClickOutside(dropDownRef, () => {
        if (isDropdownOpen) setIsDropdownOpen(false);
    });

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                    setSelect(`#${section.id}`);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className="sticky mx-auto wrapper top-3 z-50 flex items-center gap-2 w-full">
            <div className="container relative">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 10 }}
                    className="flex w-full justify-between mx-auto bg-white/10 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-white/15 p-2 px-8 rounded-full"
                >
                    <Link href={"/"} className="flex items-center gap-2 cursor-pointer bg-gradient-to-r text-transparent bg-clip-text from-emerald-300 to-sky-400 text-2xl font-bold">
                        Sarthak .
                    </Link>
                    <div className="flex items-center gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item?.name}
                                href={item?.href}
                                onClick={() => setSelect(item?.href)}
                                className={twMerge("nav-item", select === item?.href && "text-emerald-300 bg-white/10")}
                            >
                                {item?.name}
                            </Link>
                        ))}
                        <div className="block md:hidden cursor-pointer" onClick={() => setIsDropdownOpen(prev => !prev)}>
                            <MenuIcon className="size-4 fill-white/80" />
                        </div>
                    </div>
                </motion.div>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute block md:hidden bg-white/10 right-4 backdrop-blur-lg shadow-lg shadow-neutral-600/5 rounded mt-2 w-48 z-10"
                    >
                        <div ref={dropDownRef}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelect(item.href);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={twMerge("nav-item-mobile", select === item?.href && "text-emerald-300 bg-white/10")}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};