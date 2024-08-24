import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

const skillsData = [
    {
        number: 1,
        title: 'Frontend Development',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Three.js', 'Bootstrap', 'Tailwind CSS'],
        show: 'showFrontendSkills',
    },
    {
        number: 2,
        title: 'Backend Development',
        skills: ['Node.js', 'Express.js', 'Python (Django)', 'GoLang', 'PHP'],
        show: 'showBackendSkills',
    },
    {
        number: 3,
        title: 'Database',
        skills: ['MySQL', 'MongoDB'],
        show: 'showDatabaseSkills',
    },
    {
        number: 4,
        title: 'Other Skills',
        skills: ['WordPress', 'Git', 'RESTful APIs', 'Machine Learning', 'Software Testing', 'MS Office', 'Power BI', 'Expertise in Mathematics', 'Documentation'],
        show: 'showOtherSkills',
    },
    {
        number: 5,
        title: 'Soft Skills',
        skills: ['Effective Communication', 'Time Management', 'Team Collaboration', 'Problem Solving'],
        show: 'showSoftSkills',
    },
];

const FloatingSymbols = ({ text, position, speed }) => {
    const ref = useRef();
    const [fontSize, setFontSize] = useState(0.4);

    useEffect(() => {
        const adjustFontSize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setFontSize(0.2); 
            } else if (width < 1024) {
                setFontSize(0.3); 
            } else {
                setFontSize(0.4); 
            }
        };

        adjustFontSize();

        window.addEventListener('resize', adjustFontSize);

        return () => {
            window.removeEventListener('resize', adjustFontSize);
        };
    }, []);

    useFrame(() => {
        if (ref.current) {
            ref.current.position.x += speed[0];
            ref.current.position.y += speed[1];

            if (ref.current.position.x > 15) ref.current.position.x = -15;
            if (ref.current.position.x < -15) ref.current.position.x = 15;
            if (ref.current.position.y > 10) ref.current.position.y = -10;
            if (ref.current.position.y < -10) ref.current.position.y = 10;

            ref.current.rotation.y += 0.05;
        }
    });

    return (
        <Text
            ref={ref}
            position={position}
            fontSize={fontSize}
            color="rgba(255, 255, 255, 0.3)"  
            anchorX="center"
            anchorY="middle"
        >
            {text}
        </Text>
    );
};

const generateSymbols = () => {
    const symbols = [
        "Frontend", "Backend", "Database", "Skills", "React", "JavaScript", "Node.js", "Python", "Machine Learning", "Git", "RESTful APIs", "MongoDB", "SQL", "AI", "Power BI", "Software Testing", "MS Office", "Frontend", "Backend", "Database", "Skills", "React", "JavaScript", "Node.js", "Python", "Machine Learning", "Git", "RESTful APIs", "MongoDB", "SQL", "AI", "Power BI", "Software Testing", "MS Office",
    ];
    return symbols.map((symbol, i) => {
        const position = [
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            -10,
        ];
        const speed = [
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
        ];
        return <FloatingSymbols key={i} text={symbol} position={position} speed={speed} />;
    });
};

const SkillsSection = () => {
    const [showSkills, setShowSkills] = useState({
        showFrontendSkills: false,
        showBackendSkills: false,
        showDatabaseSkills: false,
        showOtherSkills: false,
        showSoftSkills: false,
    });

    const controls = useAnimation();
    const ref = useRef(null);

    const toggleSkills = (skillType) => {
        setShowSkills(prevState => ({
            ...prevState,
            [skillType]: !prevState[skillType]
        }));
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start('visible');
                } else {
                    controls.start('hidden');
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0, transition: { duration: 1 } }
            }}
            className="relative py-12"
            id='skills'
        >
            <Canvas
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                }}
            >
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 5, 2]} />
                {generateSymbols()}
            </Canvas>

            <div className="relative z-20 max-w-6xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-6">Skills</h1>
                <div className="space-y-8 my-10">
                    {skillsData.map((category) => (
                        <div
                            className="p-4 bg-white bg-opacity-10 border border-gray-300 rounded-3xl shadow-md relative w-full sm:max-w-lg mx-auto mt-6 sm:mt-10"
                            key={category.number}
                        >
                            <div className="w-14 h-14 bg-gray-700 rounded-full flex justify-center items-center absolute -top-7 left-1/2 transform -translate-x-1/2 sm:-left-8 sm:translate-x-0">
                                <span className="text-white text-lg font-semibold">{category.number}</span>
                            </div>
                            <div className="flex justify-between items-center mt-8 sm:mt-0">
                                <h3
                                    className="text-xl sm:text-2xl font-semibold mb-4 pl-6 cursor-pointer text-white"
                                    onClick={() => toggleSkills(category.show)}
                                >
                                    {category.title}
                                </h3>
                                <button onClick={() => toggleSkills(category.show)} className="text-white">
                                    {showSkills[category.show] ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                            </div>
                            {showSkills[category.show] && (
                                <div className="flex flex-wrap gap-2 pl-6 sm:pl-14">
                                    {category.skills.map((skill, index) => (
                                        <span
                                            className="text-white bg-gray-700 bg-opacity-60 rounded-full px-3 py-1 text-sm font-semibold"
                                            key={index}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SkillsSection;