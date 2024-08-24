import React from 'react';
import { motion } from 'framer-motion';

const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    hiddenMobile: { opacity: 0, y: -50 },
    visibleMobile: { opacity: 1, y: 0 },
};

const Sidebar = ({ categories, selectedCategory, onCategorySelect }) => {
    const isMobile = window.innerWidth < 768;

    return (
        <motion.div
            initial={isMobile ? "hiddenMobile" : "hidden"}
            animate={isMobile ? "visibleMobile" : "visible"}
            variants={sidebarVariants}
            transition={{ duration: 0.5 }}
        >
            <ul>
                {categories.map(category => (
                    <motion.li
                        key={category}
                        className={`cursor-pointer p-2 mb-2 rounded-md ${selectedCategory === category ? 'bg-gray-600' : ''}`}
                        onClick={() => onCategorySelect(category)}
                        whileHover={{ scale: 1.05, backgroundColor: "#3b82f6", color: "#ffffff" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {category}
                    </motion.li>
                ))}
                <motion.li
                    key="All"
                    className={`cursor-pointer p-2 mb-2 rounded-md ${selectedCategory === 'All' ? 'bg-gray-600' : ''}`}
                    onClick={() => onCategorySelect('All')}
                    whileHover={{ scale: 1.05, backgroundColor: "#3b82f6", color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    All
                </motion.li>
            </ul>
        </motion.div>
    );
};

export default Sidebar;
