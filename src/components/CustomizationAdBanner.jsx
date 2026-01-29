import React from 'react'
import { motion } from 'framer-motion'

const CustomizationAdBanner = ({ onCustomize }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-1 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Inner container with glassmorphism */}
      <div className="relative bg-white/10 backdrop-blur-xl rounded-[22px] p-8 lg:p-12 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-white/40 to-transparent rounded-full blur-3xl"
            animate={{
              rotate: [360, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <span className="text-white font-['Cinzel'] text-xs tracking-widest uppercase">
                  ✨ Create Your Own
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-white mb-4 leading-tight">
                Design Your Perfect Bouquet
              </h2>
              
              <p className="text-white/90 font-['Cormorant_Garamond'] text-lg lg:text-xl leading-relaxed">
                Can't find exactly what you want? Create a custom bouquet tailored to your taste. 
                Choose your flowers, colors, wrapping, and add-ons.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { icon: '🌸', text: 'Select your favorite flowers' },
                { icon: '🎨', text: 'Choose custom wrapping & ribbons' },
                { icon: '🎁', text: 'Add personalized message cards' },
                { icon: '✨', text: 'Preview in real-time' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-white/90"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="font-['Lato'] text-sm lg:text-base">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={onCustomize}
              className="group relative px-8 py-4 bg-white hover:bg-white/95 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-['Cinzel'] font-semibold text-base tracking-wider rounded-full shadow-xl transition-all overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background */}
              <span className="absolute inset-0 bg-white rounded-full" />
              
              {/* Shine effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear"
                }}
              />
              
              <span className="relative flex items-center gap-2">
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  START CUSTOMIZING
                </span>
                <svg
                  className="w-5 h-5 text-pink-600 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </motion.button>
          </div>

          {/* Right side - Visual */}
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            {/* Decorative circles */}
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              {/* Outer circle */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-white/30 border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle circle */}
              <motion.div
                className="absolute inset-8 rounded-full border-4 border-white/20 border-dashed"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner glow circle */}
              <motion.div
                className="absolute inset-16 rounded-full bg-white/20 backdrop-blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-8xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  💐
                </motion.div>
              </div>

              {/* Floating flower emojis */}
              {['🌹', '🌺', '🌻', '🌷', '🌸'].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="absolute text-4xl"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${10 + (index % 2) * 30}%`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default CustomizationAdBanner
