import { motion } from 'framer-motion';
import { ImageIcon, Clock } from 'lucide-react';

export const GalleryPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-lg"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-2xl mb-8 mx-auto"
        >
          <ImageIcon className="w-12 h-12 text-white" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(var(--accent-color),0.1)] text-[rgb(var(--accent-color))] text-sm font-semibold mb-6 border border-[rgba(var(--accent-color),0.2)]"
        >
          <Clock className="w-4 h-4" />
          Coming Soon
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent"
        >
          Gallery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-[rgb(var(--text-secondary))] mb-6"
        >
          We're curating photos and screenshots from real NGO events powered by MarkIn.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-[rgb(var(--text-tertiary))]"
        >
          Check back soon — the gallery will be live shortly! 🎉
        </motion.p>

        {/* Decorative placeholder grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-3 mt-12"
        >
          {Array(9).fill(0).map((_, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-[rgba(var(--border-color),0.2)]"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
