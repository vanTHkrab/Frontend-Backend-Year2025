import {motion} from "framer-motion";
import {Zap, Package, Star} from "lucide-react";
import {useReducedMotion} from "framer-motion";
import {FloatingElement} from '@/components/motion/MotionWrappers.tsx';

const AppBackground = () => {
    const shouldReduceMotion = useReducedMotion();
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Enhanced Animated Grid Background - More Prominent */}
            <motion.div
                className="absolute inset-0 opacity-40"
                initial={{opacity: 0}}
                animate={{opacity: 0.4}}
                transition={{duration: 2}}
            >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        {/* Main Grid Pattern */}
                        <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <motion.path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.8"
                                className="text-foreground/30"
                                initial={{pathLength: 0}}
                                animate={{pathLength: 1}}
                                transition={{duration: 3, delay: 0.5}}
                            />
                        </pattern>

                        {/* Fine Grid Pattern */}
                        <pattern
                            id="fine-grid"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <motion.path
                                d="M 20 0 L 0 0 0 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.3"
                                className="text-foreground/15"
                                initial={{pathLength: 0}}
                                animate={{pathLength: 1}}
                                transition={{duration: 4, delay: 1}}
                            />
                        </pattern>

                        {/* Dot Grid Pattern */}
                        <pattern
                            id="dot-grid"
                            width="60"
                            height="60"
                            patternUnits="userSpaceOnUse"
                        >
                            <motion.circle
                                cx="30"
                                cy="30"
                                r="1"
                                fill="currentColor"
                                className="text-foreground/20"
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{duration: 2, delay: 1.5}}
                            />
                        </pattern>
                    </defs>

                    {/* Layer the grid patterns */}
                    <rect width="100%" height="100%" fill="url(#fine-grid)"/>
                    <rect width="100%" height="100%" fill="url(#grid)"/>
                    <rect width="100%" height="100%" fill="url(#dot-grid)"/>
                </svg>
            </motion.div>

            {/* Enhanced Star Field - Significantly More Stars */}
            {!shouldReduceMotion && (
                <>
                    {/* Small twinkling stars - increased from 20 to 60 */}
                    {[...Array(60)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 4,
                                ease: "easeInOut",
                            }}
                        >
                            <Star className="w-1 h-1 text-foreground/60" fill="currentColor"/>
                        </motion.div>
                    ))}

                    {/* Medium stars - increased from 8 to 25 */}
                    {[...Array(25)].map((_, i) => (
                        <motion.div
                            key={`medium-star-${i}`}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [-15, 15, -15],
                                x: [-8, 8, -8],
                                opacity: [0.3, 0.9, 0.3],
                                scale: [0.8, 1.3, 0.8],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                                ease: "easeInOut",
                            }}
                        >
                            <Star className="w-2 h-2 text-foreground/40" fill="currentColor"/>
                        </motion.div>
                    ))}

                    {/* Large floating stars - new addition */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={`large-star-${i}`}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [-25, 25, -25],
                                x: [-12, 12, -12],
                                opacity: [0.2, 0.7, 0.2],
                                scale: [0.9, 1.4, 0.9],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 8 + Math.random() * 6,
                                repeat: Infinity,
                                delay: Math.random() * 4,
                                ease: "easeInOut",
                            }}
                        >
                            <Star className="w-3 h-3 text-foreground/25" fill="currentColor"/>
                        </motion.div>
                    ))}

                    {/* Micro stars for density - new addition */}
                    {[...Array(40)].map((_, i) => (
                        <motion.div
                            key={`micro-star-${i}`}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0, 0.6, 0],
                                scale: [0, 0.8, 0],
                            }}
                            transition={{
                                duration: 1.5 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="w-0.5 h-0.5 bg-foreground/30 rounded-full"/>
                        </motion.div>
                    ))}

                    {/* Shooting stars - increased frequency */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`shooting-star-${i}`}
                            className="absolute"
                            style={{
                                top: `${Math.random() * 50}%`,
                                left: '-20px',
                            }}
                            animate={{
                                x: ['0px', '120vw'],
                                y: ['0px', `${30 + Math.random() * 40}vh`],
                                opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                                duration: 1.5 + Math.random() * 1,
                                repeat: Infinity,
                                delay: 3 + i * 4 + Math.random() * 2,
                                ease: "easeOut",
                            }}
                        >
                            <div className="relative">
                                <Star className="w-1.5 h-1.5 text-foreground/80" fill="currentColor"/>
                                <motion.div
                                    className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-foreground/60 to-transparent"
                                    animate={{
                                        scaleX: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        repeatDelay: i * 4 + 2.2,
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}

                    {/* Constellation patterns - new feature */}
                    {[...Array(4)].map((_, constellationIndex) => (
                        <motion.div
                            key={`constellation-${constellationIndex}`}
                            className="absolute"
                            style={{
                                left: `${20 + constellationIndex * 20}%`,
                                top: `${15 + constellationIndex * 20}%`,
                            }}
                            animate={{
                                rotate: [0, 360],
                                scale: [0.8, 1.1, 0.8],
                            }}
                            transition={{
                                duration: 30 + constellationIndex * 10,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            {[...Array(5)].map((_, starIndex) => (
                                <motion.div
                                    key={`constellation-star-${starIndex}`}
                                    className="absolute"
                                    style={{
                                        left: `${starIndex * 15}px`,
                                        top: `${Math.sin(starIndex) * 10}px`,
                                    }}
                                    animate={{
                                        opacity: [0.2, 0.8, 0.2],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: starIndex * 0.3,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Star className="w-1 h-1 text-foreground/50" fill="currentColor"/>
                                </motion.div>
                            ))}
                        </motion.div>
                    ))}
                </>
            )}

            {!shouldReduceMotion && (
                <>
                    <FloatingElement
                        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/8 to-primary/3 rounded-full blur-3xl"
                        amplitude={20}
                        duration={20}
                    >
                        <div/>
                    </FloatingElement>
                    <FloatingElement
                        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary/15 to-secondary/5 rounded-full blur-3xl"
                        amplitude={15}
                        duration={25}
                    >
                        <div/>
                    </FloatingElement>

                    {/* Enhanced Tech Grid Lines with more complexity */}
                    <motion.div
                        className="absolute top-1/4 right-1/4 w-1 h-32 bg-gradient-to-b from-foreground/30 to-transparent"
                        animate={{
                            scaleY: [0, 1, 0],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/3 left-1/3 w-32 h-1 bg-gradient-to-r from-foreground/30 to-transparent"
                        animate={{
                            scaleX: [0, 1, 0],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />

                    {/* Additional crossing grid lines */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-foreground/40 to-transparent"
                        animate={{
                            scaleY: [0, 1, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
                        animate={{
                            scaleX: [0, 1, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />

                    {/* Diagonal grid lines */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-px h-16 bg-gradient-to-b from-foreground/20 to-transparent rotate-45"
                        animate={{
                            scaleY: [0, 1, 0],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-px h-16 bg-gradient-to-b from-foreground/20 to-transparent -rotate-45"
                        animate={{
                            scaleY: [0, 1, 0],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 3
                        }}
                    />

                    {/* Floating Tech Icons */}
                    <motion.div
                        className="absolute top-1/2 left-10 opacity-5"
                        animate={{
                            y: [-20, 20, -20],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Zap className="w-16 h-16"/>
                    </motion.div>

                    {/* Additional floating elements */}
                    <motion.div
                        className="absolute bottom-1/4 right-10 opacity-10"
                        animate={{
                            y: [20, -20, 20],
                            x: [10, -10, 10],
                            rotate: [360, 0]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Package className="w-12 h-12"/>
                    </motion.div>

                    {/* Enhanced corner elements with grid intersection points */}
                    <motion.div
                        className="absolute top-10 right-10"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.9, 0.4]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="w-2 h-2 bg-foreground/60 rounded-full"/>
                    </motion.div>
                    <motion.div
                        className="absolute bottom-10 left-10"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.9, 0.4]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5
                        }}
                    >
                        <div className="w-2 h-2 bg-foreground/60 rounded-full"/>
                    </motion.div>

                    {/* Additional grid intersection points */}
                    <motion.div
                        className="absolute top-1/3 left-1/2"
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    >
                        <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full"/>
                    </motion.div>
                    <motion.div
                        className="absolute bottom-1/3 right-1/2"
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    >
                        <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full"/>
                    </motion.div>
                </>
            )}
        </div>
    );
}

export default AppBackground;