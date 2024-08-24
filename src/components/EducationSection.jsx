import React, { useEffect, useRef, useState } from 'react';
import { FaCalendar, FaUniversity } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const educationData = [
    {
        number: 1,
        title: 'BE - Computer Systems Engineering',
        institution: 'NEDUET, Karachi',
        dates: 'Oct, 2020 - Aug, 2024',
        grade: 'CGPA: 3.571/4.00',
        link: 'https://www.neduet.edu.pk/',
        shortname: 'NEDUET'
    },
    {
        number: 2,
        title: 'Intermediate (HSC - Pre-Engineering)',
        institution: 'Adamjee Govt. College',
        dates: 'Aug, 2018 - Apr, 2020',
        grade: 'GRADE: A1 (89%)',
        link: 'https://www.facebook.com/agsckarachi/',
        shortname: 'Adamjee College'
    },
    {
        number: 3,
        title: 'Matriculation (SSC - Science)',
        institution: 'RRBK School',
        dates: 'Mar, 2016 - Apr, 2018',
        grade: 'GRADE: A1 (90%)',
        link: 'https://www.linkedin.com/company/r-r-b-k-school-razia-rahim-bux-khan-school/?originalSubdomain=pk',
        shortname: 'RRBK School'
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
    "NEDUET", "Engineering", "Education", "Adamjee College", "RRBK School", "CGPA", "Grades", "Academic", "Studies", "University", "High School", "NEDUET", "Engineering", "Education", "Adamjee College", "RRBK School", "CGPA", "Grades", "Academic", "Studies", "University", "High School", "CIS", "CIS"
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

const EducationSection = () => {
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
            id='education'
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
                <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-10">Education</h1>
                <div className="space-y-8">
                    {educationData.map((education, index) => (
                        <motion.div
                            className="flex mb-8 items-start"
                            key={education.number}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            animate={controls}
                            variants={{
                                hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                                visible: { opacity: 1, x: 0, transition: { duration: 1 } }
                            }}
                        >
                            <div className="w-14 h-14 bg-gray-700 rounded-full flex justify-center items-center mr-4 flex-shrink-0">
                                <span className="text-white text-lg">{education.number}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl sm:text-2xl font-semibold">{education.title}</h3>
                                <span className="flex items-center">
                                    <FaUniversity className="text-blue-500 mx-1 text-lg sm:text-xl" />
                                    <p className="text-gray-400 text-lg sm:text-xl">{education.institution}</p>
                                </span>
                                <span className="flex items-center">
                                    <FaCalendar className="text-blue-500 mx-1 text-lg sm:text-xl" />
                                    <p className="text-gray-400 text-md sm:text-lg">{education.dates}</p>
                                </span>
                                <div className="flex items-center mt-2">
                                    <svg className="w-6 h-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-lg font-semibold text-red-500">{education.grade}</p>
                                </div>
                                <div className='mt-5'>
                                    <a href={education.link} target='_blank' rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg mt-4 text-sm sm:text-base">
                                        Visit {education.shortname}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default EducationSection;