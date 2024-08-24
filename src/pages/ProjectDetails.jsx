import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import FooterSection from '../components/FooterSection';

const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
};

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div>
            <motion.div 
                className="py-12 max-w-6xl mx-auto px-4"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="text-4xl sm:text-5xl font-semibold mb-6 text-center"
                    variants={fadeInVariants}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {project.title}
                </motion.h1>
                <motion.div 
                    className="mb-4"
                    variants={fadeInVariants}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <video src={project.videoSrc} controls className="w-full rounded-lg mb-4"></video>
                </motion.div>
                <motion.p 
                    className="text-lg text-gray-400 mb-4"
                    variants={fadeInVariants}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {project.description}
                </motion.p>
                <motion.div 
                    className="flex flex-col sm:flex-row justify-between mb-4"
                    variants={fadeInVariants}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {project.hasGithubLink && (
                        <motion.a 
                            href={project.githubLink} 
                            className="text-blue-500 hover:underline mb-2 sm:mb-0" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            variants={fadeInVariants}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            Get Source Code
                        </motion.a>
                    )}
                    {project.hasLiveLink && (
                        <motion.a 
                            href={project.liveLink} 
                            className="text-green-500 hover:underline" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            variants={fadeInVariants}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            Check Live
                        </motion.a>
                    )}
                </motion.div>
                <motion.div 
                    className="flex flex-col sm:flex-row justify-between my-10"
                    variants={fadeInVariants}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <motion.button 
                        onClick={() => navigate('/projects')} 
                        className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none mb-4 sm:mb-0"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        All Projects
                    </motion.button>
                    <motion.button 
                        onClick={() => navigate('/')} 
                        className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        Back to Home
                    </motion.button>
                </motion.div>
            </motion.div>
            <FooterSection />
        </div>
    );
};

export default ProjectDetails;
