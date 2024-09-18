"use client";

import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const StarIndicator = () => {
    const { scrollYProgress } = useScroll();
    const [percentage, setPercentage] = useState(0);
    const [isTextVisible, setIsTextVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((value) => {
            setPercentage(value * 100);
            setIsTextVisible(value > 0);
        });

        return unsubscribe;
    }, [scrollYProgress]);

    return (
        <div className="fixed z-50 bottom-6 right-6 w-20 h-20 md:w-30 md:h-30">
            <motion.svg className="absolute inset-0" viewBox="-5 0 80 80">
                <motion.path
                    d="M 30,10 L 40,30 L 60,35 L 45,50 L 50,70 L 30,55 L 10,70 L 15,50 L 0,35 L 20,30 Z"
                    fill="transparent"
                    strokeWidth="3"
                    stroke="#ccc"
                    style={{
                        pathLength: scrollYProgress,
                        stroke: '#55e6a5',
                    }}
                />
            </motion.svg>
            <div
                className={twMerge(`absolute inset-0 flex items-center justify-center text-[14px] md:text-[16px] font-bold`, isTextVisible ? 'text-[#55e6a5]' : 'text-transparent')}
            >
                {Math.round(percentage)}%
            </div>
        </div>
    );
};
