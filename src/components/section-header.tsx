interface SectionHeaderProps {
    header: string;
    title: string;
    description: string;
}

export const SectionHeader = ({
    header,
    title,
    description
}: SectionHeaderProps) => {
    return (
        <>
            <div className="flex justify-center">
                <p className="uppercase font-semibold tracking-widest bg-gradient-to-r bg-clip-text text-transparent from-emerald-300 to-sky-400 text-center">
                    {header}
                </p>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-center mt-6">
                {title}
            </h2>
            <p className="text-center md:text-lg lg:text-xl text-white/60 mt-4 max-w-md mx-auto">
                {description}
            </p>
        </>
    )
}