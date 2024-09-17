import { Card } from "@/components/card"
import { SectionHeader } from "@/components/section-header";
import bookImage from "@/assets/images/book-cover.png";
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

const hobbies = [
    {
        title: "Reading",
        emoji: "📚",
        left: "5%",
        top: "5%",
    },
    {
        title: "Fitness",
        emoji: "🏋️‍♂️",
        left: "50%",
        top: "5%",
    },
    {
        title: "Music",
        emoji: "🎵",
        left: "10%",
        top: "35%",
    },
    {
        title: "Sleeping",
        emoji: "😴",
        left: "35%",
        top: "40%",
    },
    {
        title: "WatchBinge",
        emoji: "🎥",
        left: "70%",
        top: "45%",
    },
    {
        title: "Gaming",
        emoji: "🎮",
        left: "5%",
        top: "65%",
    },
]

export const AboutSection = () => {
    return (
        <div className="py-16 lg:py-24">
            <div className="container">
                <SectionHeader
                    header={"About Me"}
                    title={"A Glimpse Into My World"}
                    description={"Learn more about who I am, what I do, and what inspires me."}
                />
                <div className="mt-16 flex flex-col gap-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
                        <Card className="h-[320px] md:col-span-2 lg:col-span-1">
                            <CardHeader
                                title={"My Reads"}
                                description={"Explore the books shaping my prespective."}
                            />
                            <div className="w-40 mx-auto mt-2 md:mt-0">
                                <Image src={bookImage} alt="Book Cover" />
                            </div>
                        </Card>
                        <Card className="h-[320px] md:col-span-3 lg:col-span-2">
                            <CardHeader
                                title={"My Toolbox"}
                                description={"Explore the technologies and tools I use to craft exceptional digital experiences."}
                            />
                            <ToolboxItems
                                items={toolboxItems}
                            />
                            <ToolboxItems
                                items={toolboxItems}
                                itemsWrapperClassName="-translate-x-1/2"
                            />
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
                        <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
                            <CardHeader
                                title={"Beyond the Code"}
                                description={"Explore my interests and hobbies beyond the digital realm."}
                                className="px-6 py-6"
                            />
                            <div className="relative flex-1">
                                {hobbies?.map((hobby) => (
                                    <div
                                        key={hobby?.title}
                                        className="inline-flex gap-2 items-center px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                                        style={{
                                            left: hobby?.left,
                                            top: hobby?.top
                                        }}
                                    >
                                        <span className="text-gray-950 font-medium">{hobby?.title}</span>
                                        <span>{hobby.emoji}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
                            <Image
                                src={mapImage}
                                alt="Map"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
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
        </div>
    )
}