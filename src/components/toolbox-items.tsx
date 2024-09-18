import { Fragment } from "react";
import { TechIcon } from "./tech-icon";

interface ToolboxItemsProps {
    items: {
        title: string;
        icon: React.ElementType;
    }[];
    className?: string;
    itemsWrapperClassName?: string;
}

export const ToolboxItems = ({
    items,
    className,
    itemsWrapperClassName
}: ToolboxItemsProps) => {
    return (
        <div className={`flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}>
            <div className={`flex flex-none py-0.5 gap-6 pr-6 ${itemsWrapperClassName}`}>
                {[...new Array(2)].fill(0).map((_, idx) => (
                    <Fragment key={idx}>
                        {items?.map((item) => (
                            <div
                                key={item?.title}
                                className="inline-flex items-center gap-4 py-2 px-3 outline outline-2 outline-white/10 rounded-lg"
                            >
                                <TechIcon component={item?.icon} />
                                <span className="font-semibold">{item?.title}</span>
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}