import StarIcon from "@/assets/icons/star.svg";

interface CardHeaderProps {
    title: string;
    description: string;
    className?: string;
}

export const CardHeader = ({
    title,
    description,
    className
}: CardHeaderProps) => {
    return (
        <div className={`flex flex-col p-6 md:py-8 md:px-10 ${className}`}>
            <div className="inline-flex items-center gap-2 ">
                <StarIcon className="text-emerald-400 size-9" />
                <h3 className="font-serif text-3xl">{title}</h3>
            </div>
            <p className="text-sm lg:text-base max-w-xs text-white/60 mt-2">
                {description}
            </p>
        </div>
    )
}