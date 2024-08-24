import React, { useEffect, useRef, useState } from 'react';
import { FaNodeJs, FaWordpress, FaReact, FaPython, FaJava, FaGit } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

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
    "Certifications", "MERN", "Frontend", "React", "Python", "WordPress", "API Testing", "Git", "JavaScript", "Development",
    "Artificial", "Intelligence", "Data Science", "Certifications", "MERN", "Frontend", "React", "Python", "WordPress", "API Testing", "Git", "JavaScript", "Development",
    "Artificial", "Intelligence", "Data Science", "Certifications", "MERN", "Frontend", "React", "Python", "WordPress", "API Testing", "Git", "JavaScript", "Development",
    "Artificial", "Intelligence", "Data Science",
];

const generateSymbols = () => {
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

const certifications = [
    {
        title: "MERN Stack",
        organization: "WeboPedia",
        icon: <FaNodeJs className="text-5xl text-green-500" />,
    },
    {
        title: "Frontend Development",
        organization: "Meta",
        icon: <FaReact className="text-5xl text-blue-500" />,
    },
    {
        title: "Python for AI, Data Science, and Development",
        organization: "IBM",
        icon: <FaPython className="text-5xl text-blue-500" />,
    },
    {
        title: "WordPress Development",
        organization: "DigiSkills",
        icon: <FaWordpress className="text-5xl text-gray-700" />,
    },
    {
        title: "API Testing with Postman",
        organization: "Tigran Ter-Karapetyants",
        icon: <FaJava className="text-5xl text-red-500" />,
    },
    {
        title: "Version Control",
        organization: "Meta",
        icon: <FaGit className="text-5xl text-orange-500" />,
    },
];

const CertificationCard = ({ title, organization, icon }) => {
    return (
        <motion.div 
            className="bg-transparent border border-gray-400 rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
        >
            <div className="flex items-center mb-4">
                {icon}
                <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-gray-300 text-sm">{organization}</p>
                </div>
            </div>
        </motion.div>
    );
};

const CertificationsSection = () => {
    const controls = useAnimation();
    const ref = useRef(null);

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
            className="relative py-20"
            id='certifications'
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

            <div className="relative z-20 container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => (
                        <CertificationCard
                            key={index}
                            title={cert.title}
                            organization={cert.organization}
                            icon={cert.icon}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CertificationsSection;