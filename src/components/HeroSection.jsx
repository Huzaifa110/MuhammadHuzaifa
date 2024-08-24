import React, { useRef, useEffect, useState } from 'react';
import { FaLinkedin, FaGithub, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { motion, useAnimation } from 'framer-motion';
import image from '../assets/images/my_img.png';

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
    "{ }", ";", "React", "Node", "Express", "JavaScript", "Python", "WordPress", "MERN", "MongoDB", "def", "class", "function", "SQL", "<div>", "</div>", "<script>", "</script>", "const", "let", "var", "import", "module", "export", "NoSQL", "retun", "async", "await", "HTML", "CSS", "Bootstrap", "Tailwind", "JSX", "vercel", "extends", "API", "REST", "Django", "( )", "for", "while", "if", "else", "swich", "case", "try", "catch", "finally"
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

const HeroSection = ({ isNavbarOpen }) => {
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
        <div className="relative h-screen w-full flex items-center justify-center bg-gray-900 mt-10 lg:mt-0">
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

            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0, transition: { duration: 1 } }
                }}
                className="relative z-20 flex flex-col lg:flex-row items-center justify-between mx-auto p-6"
            >
                <div className="flex flex-col items-center lg:items-start lg:w-2/3 mb-8 lg:mb-0 sm:mt-1">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4 text-center lg:text-left">
                        I{' '}
                        {!isNavbarOpen && (
                            <span
                                className="typewriter-effect"
                                style={{
                                    display: 'inline-block',
                                    minWidth: '280px', 
                                    textAlign: 'left', 
                                }}
                            >
                                <Typewriter
                                    words={[
                                        'am Muhammad Huzaifa.',
                                        'am a Software Engineer.',
                                        'build MERN apps.',
                                        'build Django apps.',
                                        'do ML projects.',
                                        'make Power BI dashboards.',
                                        'test software applications.',
                                    ]}
                                    loop={0}
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </span>
                        )}
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-8 text-center lg:text-left">
                        An industrious and highly motivated Computer Engineer, driven to establish a robust presence in the modern professional sphere through the relentless pursuit of excellence in Software Development and Testing.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:space-y-4 sm:space-x-4 justify-center lg:justify-start items-center space-y-3 lg:space-y-0">
                        <a
                            href='https://drive.google.com/uc?export=download&id=1Sb2f5xHHbds48WfEpwXtATbifTE2gEK0'
                            download
                            target='_blank'
                            className="bg-blue-700 text-white hover:bg-blue-600 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out"
                        >
                            Download Resume
                        </a>
                        <a href="tel:+923111244967" className="text-xl text-blue-600 flex items-center">
                            <FaPhone className="mr-2 text-blue-600" /> +92 311 1244967
                        </a>
                        <a href="mailto:huzaifazafar750@gmail.com" className="text-xl text-red-600 flex items-center">
                            <FaEnvelope className="mr-2 text-red-600" /> huzaifazafar750@gmail.com
                        </a>
                        <span className="text-xl text-green-600 flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-green-600" /> Karachi, 75160
                        </span>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/muhammad-huzaifa-b698a9238" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-3xl">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/Huzaifa110" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-3xl">
                                <FaGithub />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100009237674045" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-3xl">
                                <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="w-full lg:w-1/3 z-0 hidden lg:h-full lg:block"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    style={{ border: 'none' }} 
                >
                    <img
                        src={image}
                        alt="Your Image"
                        className="h-full mx-auto z-0"
                        style={{
                            border: 'none',  
                            boxShadow: 'none', 
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
