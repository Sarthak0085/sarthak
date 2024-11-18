"use client";

import { Card } from "@/components/card"
import { SectionHeader } from "@/components/section-header";
import HTMLIcon from "@/assets/icons/html5.svg";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import CssIcon from "@/assets/icons/css3.svg";
import GithubIcon from "@/assets/icons/github.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import Image from "next/image";
import mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/card-header";
import { ToolboxItems } from "@/components/toolbox-items";
import { useRef } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { AboutSectionSchema } from "@/components/form/schema";

const toolboxItems = [
    {
        title: "Javascript",
        icon: JavascriptIcon
    },
    {
        title: "HTML5",
        icon: HTMLIcon
    },
    {
        title: "CSS3",
        icon: CssIcon
    },
    {
        title: "Chrome",
        icon: ChromeIcon
    },
    {
        title: "React",
        icon: ReactIcon
    },
    {
        title: "Github",
        icon: GithubIcon
    },
];

// const hobbies = [
//     {
//         title: "Reading",
//         emoji: "📚",
//         left: "5%",
//         top: "5%",
//     },
//     {
//         title: "Fitness",
//         emoji: "🏋️‍♂️",
//         left: "50%",
//         top: "5%",
//     },
//     {
//         title: "Music",
//         emoji: "🎵",
//         left: "10%",
//         top: "35%",
//     },
//     {
//         title: "Sleeping",
//         emoji: "😴",
//         left: "35%",
//         top: "40%",
//     },
//     {
//         title: "WatchBinge",
//         emoji: "🎥",
//         left: "70%",
//         top: "45%",
//     },
//     {
//         title: "Gaming",
//         emoji: "🎮",
//         left: "5%",
//         top: "65%",
//     },
// ]

interface AboutSectionProps {
    data?: z.infer<typeof AboutSectionSchema>;
}

export const AboutSection = ({ data }: AboutSectionProps) => {
    const constraintRef = useRef(null);
    return (
        <section id="about" className="py-16 lg:py-24">
            <div className="container">
                <SectionHeader
                    header={"About Me"}
                    title={"A Glimpse Into My World"}
                    description={"Learn more about who I am, what I do, and what inspires me."}
                />
                <div className="mt-16 flex flex-col gap-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
                        <Card className="h-[320px] md:col-span-2 lg:col-span-1">
                            {/* <CardHeader
                                title={"My Reads"}
                                description={"Explore the books shaping my prespective."}
                            /> */}
                            <CardHeader
                                title={data?.read?.title as string}
                                description={data?.read?.description as string}
                            />
                            <div className="w-40 mx-auto mt-2 md:mt-0">
                                {/* <Image src={bookImage} alt="Book Cover" /> */}
                                <Image src={data?.read?.image as string} alt="Book Cover" width={200} height={200} />
                            </div>
                        </Card>
                        <Card className="h-[320px] md:col-span-3 lg:col-span-2">
                            {/* <CardHeader
                                title={"My Toolbox"}
                                description={"Explore the technologies and tools I use to craft exceptional digital experiences."}
                            /> */}
                            <CardHeader
                                title={data?.language?.title as string}
                                description={data?.language?.description as string}
                            />
                            <ToolboxItems
                                items={toolboxItems}
                                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
                            />
                            <ToolboxItems
                                items={toolboxItems}
                                className="mt-6"
                                itemsWrapperClassName="animate-move-right [animation-duration:20s]"
                            />
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
                        <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
                            {/* <CardHeader
                                title={"Beyond the Code"}
                                description={"Explore my interests and hobbies beyond the digital realm."}
                                className="px-6 py-6"
                            /> */}
                            <CardHeader
                                title={data?.hobby?.title as string}
                                description={data?.hobby?.description as string}
                                className="px-6 py-6"
                            />
                            <div className="relative flex-1" ref={constraintRef}>
                                {data?.hobby?.hobbies?.map((hobby) => (
                                    <motion.div
                                        key={hobby?.id}
                                        className="inline-flex gap-2 items-center px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                                        style={{
                                            left: hobby?.left,
                                            top: hobby?.top
                                        }}
                                        drag
                                        dragConstraints={constraintRef}
                                    >
                                        <span className="text-gray-950 font-medium">{hobby?.name}</span>
                                        {/* <span>{hobby.emoji}</span> */}
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                        <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
                            <Image
                                src={mapImage}
                                alt="Map"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]" />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10" />
                                <Image
                                    src={smileMemoji}
                                    alt="Smiling Memoji"
                                    className="size-20"
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}