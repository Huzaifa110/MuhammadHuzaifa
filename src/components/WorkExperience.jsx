import React, { useEffect, useRef, useState } from 'react';
import { FaCalendar, FaLocationArrow } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const workExperienceData = [
    {
        number: 1,
        title: 'Web Developer Intern',
        company: 'CodSoft',
        dates: 'Sep, 23 - Oct, 23',
        description: 'Various development tasks from basic frontend tasks to complex MERN stack tasks were accomplished and the internship was completed successfully.',
        stack: 'HTML, CSS, JavaScript, React.js, MERN',
        link: 'https://www.codsoft.in/',
        shortname: 'CodSoft'
    },
    {
        number: 2,
        title: 'Web Developer Intern',
        company: 'NCL, NEDUET',
        dates: 'Sep, 22 - Oct, 22',
        description: 'Various frontend tasks were accomplished using React.js and APIs were built using GoLang, and the internship was completed successfully.',
        stack: 'HTML, CSS, JavaScript, React.js, GoLang',
        link: 'https://nclab.neduet.edu.pk/',
        shortname: 'NCL'
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

const symbols = [
    "CodSoft", "Neuro", "Computation", "Lab", "NCL", "NCAI", "Internship", "Web", "Development", "Tasks",  "CodSoft", "Neuro", "Computation", "Lab", "NCL", "NCAI", "Internship", "Web", "Development", "Tasks",  "CodSoft", "Neuro", "Computation", "Lab", "NCL", "NCAI", "Internship", "Web", "Development", "Tasks",  "CodSoft", "Neuro", "Computation", "Lab", "NCL", "NCAI", "Internship", "Web", "Development", "Tasks",  "CodSoft", "Neuro", "Computation", "Lab", "NCL", "NCAI", "Internship", "Web", "Development", "Tasks"
];

const generateSymbols = () => {
    const instances = symbols.map((symbol, i) => {
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
    return instances;
};

const WorkExperience = () => {
    const ref = useRef(null);
    const controls = useAnimation();

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
            id='experience'
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

            <div className="relative z-20 px-4">
                <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-10">Experience</h1>
                <div className="space-y-8">
                    {workExperienceData.map((experience) => (
                        <div className="flex mb-8 items-start" key={experience.number}>
                            <div className="w-14 h-14 bg-gray-700 rounded-full flex justify-center items-center mr-4 flex-shrink-0">
                                <span className="text-white text-lg">{experience.number}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl sm:text-2xl font-semibold">{experience.title}</h3>
                                <span className="flex items-center">
                                    <FaLocationArrow className="text-blue-500 mx-1 text-lg sm:text-xl" />
                                    <p className="text-gray-400 text-lg sm:text-xl">{experience.company}</p>
                                </span>
                                <span className="flex items-center">
                                    <FaCalendar className="text-blue-500 mx-1 text-lg sm:text-xl" />
                                    <p className="text-gray-400 text-md sm:text-lg">{experience.dates}</p>
                                </span>
                                <p className="mt-2 text-md sm:text-lg">{experience.description}</p>
                                <p className="text-sm sm:text-md">Stack: {experience.stack}</p>
                                <div className='mt-5'>
                                    <a href={experience.link} target='_blank' rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg mt-4 text-sm sm:text-base">
                                        Visit {experience.shortname}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default WorkExperience;