import { motion } from 'framer-motion'

export const fadeIn =(duration,distance) => {
  return{
    hidden: {
    opacity: 0,
    y: distance,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
}
}