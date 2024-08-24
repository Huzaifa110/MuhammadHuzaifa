import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import projects from '../data/projects';

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
    "Project", "React", "MERN", "Web", "Development", "App", "Frontend", "Backend", "JavaScript", "Node.js", "Express", "MongoDB", "Projects", "React", "MERN", "Web", "Development", "App", "Frontend", "Backend", "JavaScript", "Node.js", "Express", "MongoDB", "Project", "React", "MERN", "Web", "Development", "App", "Frontend", "Backend", "JavaScript", "Node.js", "Express", "MongoDB", "Projects", "React", "MERN", "Web", "Development", "App", "Frontend", "Backend", "JavaScript", "Node.js", "Express", "MongoDB"
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

const ProjectSection = () => {
    const displayedProjects = projects.slice(0, 3);

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
            className="relative py-12"
            id='projects'
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
                <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-6">Projects</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProjects.map(project => (
                        <Link to={`/project/${project.id}`} key={project.id}>
                            <motion.div
                                className="p-4 bg-white bg-opacity-10 border border-gray-400 rounded-3xl shadow-xl relative w-full max-w-lg mx-auto"
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-xl font-semibold text-white mb-4">{project.title}</h3>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-64 object-cover rounded-lg mb-4 opacity-40"
                                />
                            </motion.div>
                        </Link>
                    ))}
                </div>
                <div className="mt-6 flex justify-center">
                    <Link to="/projects">
                        <button className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none">
                            View All Projects
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectSection;