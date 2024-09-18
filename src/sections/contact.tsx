import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";

export const ContactSection = () => {
    return (
        <section id="contact" className="py-12 lg:py-20">
            <div className="container">
                <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-950 py-8 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-0">
                    <div className="absolute inset-0 -z-30 opacity-5"
                        style={{ backgroundImage: `url(${grainImage.src})` }}
                    ></div>
                    <div className="flex flex-col gap-8 md:gap-16 md:flex-row items-center">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-serif text-2xl md:text-3xl">Let&apos;s create something amazing together.</h2>
                            <p className="text-sm md:text-base">
                                Ready to bring your next project to life? Let&apos;s connect and discuss how I can help you achieve your goals.
                            </p>
                        </div>
                        <div>
                            <button className="inline-flex text-white bg-gray-950 items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-950">
                                <span className="font-semibold">Contact Me</span>
                                <ArrowUpRightIcon className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}