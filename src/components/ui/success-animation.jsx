import { motion } from 'framer-motion';

export const SuccessAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-purple-900 to-purple-950 p-8 rounded-lg shadow-xl border-2 border-yellow-500"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <motion.div
          className="text-6xl mb-4"
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-yellow-400 text-center">Welcome aboard!</h2>
        <p className="text-yellow-100 mt-2 text-center">Get ready to build some amazing decks!</p>
      </motion.div>
    </motion.div>
  );
}; 