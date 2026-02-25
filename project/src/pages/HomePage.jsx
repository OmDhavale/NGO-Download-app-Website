import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { Card } from '../components/Card';
import { GraduationCap, HandHeart, School, ShieldCheck } from 'lucide-react';

export const HomePage = () => {
  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Students Panel',
      description: 'Students can securely log in, browse upcoming NGO events, register with a single tap, and track their own attendance history.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <HandHeart className="w-8 h-8" />,
      title: 'NGO Panel',
      description: 'Organizers can easily manage their events and mark student attendance on the spot.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: <School className="w-8 h-8" />,
      title: 'College Panel',
      description: 'College administrators get full transparency into which events their students are attending, complete with date-range filters and clean, professional data tables.',
      gradient: 'from-indigo-500 to-violet-500',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Admin Panel',
      description: 'Registers Colleges and NGOs on the app.',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div>
      <Hero />

      {/* WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--text-primary))]">
            Our Features
          </h2>
          <p className="text-xl text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            Our platform brings together technology and compassion to create meaningful change
          </p>
        </motion.div>

        {/* FEATURES GRID (no phone mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} delay={index * 0.1}>
              <div className="flex items-start gap-4">
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-[rgb(var(--text-primary))]">
                    {feature.title}
                  </h3>
                  <p className="text-[rgb(var(--text-secondary))]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl p-12 text-center text-white shadow-lg"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Monitor Attendance Seamlessly ?
          </h2>

          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Get started with our app whether you are a student, college, ngo !
          </p>

          <motion.button
            className="bg-blue-800 px-8 py-4 rounded-2xl font-semibold text-lg text-white hover:bg-blue-900 transition-all focus-glow shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </section> */}
    </div>
  );
};
