"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Education } from "@prisma/client";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

interface StickyScrollProps {
    content?: Education[];
    contentClassName?: string;
}

export const StickyScroll = ({
    content,
    contentClassName,
}: StickyScrollProps) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        // target: ref
        container: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = content?.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content?.map((_, index) => index / cardLength!);
        const closestBreakpointIndex = cardsBreakpoints?.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex!);
    });

    const backgroundColors = [
        "linear-gradient(to bottom right, rgba(0, 255, 255, 0.5), rgba(16, 185, 129, 0.5))",
        "linear-gradient(to bottom right, rgba(236, 72, 153, 0.5), rgba(99, 102, 241, 0.5))",
        "linear-gradient(to bottom right, rgba(249, 115, 22, 0.5), rgba(234, 179, 8, 0.5))",
    ];
    const linearGradients = [
        "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
        "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
        "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    ];

    const [backgroundGradient, setBackgroundGradient] = useState(
        linearGradients[0]
    );

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    return (
        <motion.div
            animate={{
                background: backgroundColors[activeCard % backgroundColors.length],
            }}
            className="h-[30rem] w-full overflow-y-auto flex justify-center relative space-x-10  rounded-md p-10"
            ref={ref}
        >
            <div className="div relative flex items-start px-4">
                <div className="max-w-xl">
                    {content?.map((item, index) => (
                        <div key={item.field + index} className="my-10">
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-xl font-bold text-slate-100"
                            >
                                {item?.degree && item?.degree + " in "} {item.field} • {new Date(item?.startDate).getFullYear()} - {new Date(item?.endDate).getFullYear() ?? "current"}
                            </motion.h2>
                            <motion.h4
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-lg font-medium text-slate-200"
                            >
                                From :- {item?.institution}
                            </motion.h4>
                            <motion.h4
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-lg font-medium text-slate-200"
                            >
                                {item?.cgpa && "CGPA :- " + item?.cgpa + " out of " + "10"} {item?.percentage && "Percentage :- " + item?.percentage + "%"}
                            </motion.h4>
                            <motion.p
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-md text-slate-300 max-w-sm mt-8"
                            >
                                {item.description}
                            </motion.p>
                            {item?.liveLink && <motion.a
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                href={item?.liveLink}
                            >
                                <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                                    <span>View Live</span>
                                    <ArrowUpRightIcon className="size-4" />
                                </button>
                            </motion.a>}
                        </div>
                    ))}
                    <div className="h-40" />
                </div>
            </div>
            <div
                style={{ background: backgroundGradient }}
                className={cn(
                    "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
                    contentClassName
                )}
            >
                <div className="w-full h-full flex items-center justify-center">
                    {content?.[activeCard]?.degree && content?.[activeCard]?.degree + " in "} {content?.[activeCard]?.field}
                </div>
            </div>
        </motion.div>
    );
};
