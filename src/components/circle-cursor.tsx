"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CircleFollowingCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 200);
    };

    return (
        <motion.div
            className="fixed z-50 w-10 h-10 rounded-full border-2 border-[#55e6a5]"
            style={{
                left: mousePosition.x - 20,
                top: mousePosition.y - 20,
                transform: 'translate(-50%, -50%)',
                background: isClicked ? '#55e6a5' : '',
                pointerEvents: 'none',
            }}
            onClick={handleClick}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 1 }}
            animate={{ scale: isClicked ? 0.5 : 1 }}
            transition={{ duration: 0.2 }}
        />
    );
};