import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardTile } from '../components/DashboardTile';
import { Card } from '../components/Card';
import { Users, GraduationCap, HandHeart, Calendar, MapPin } from 'lucide-react';

const STATS_API = 'https://ngo-attendance-backend.el.r.appspot.com/api/v1/stats';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CATEGORY_GRADIENTS = [
  'from-blue-500 to-cyan-500',
  'from-rose-500 to-pink-500',
  'from-indigo-500 to-violet-500',
  'from-amber-500 to-orange-500',
  'from-green-500 to-emerald-500',
];

export const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(STATS_API);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError('Failed to load stats.');
        }
      } catch {
        setError('Could not reach server.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const counts = data?.counts ?? {};
  const monthlyData = data?.monthlyData ?? Array(12).fill(0);
  const topCategories = data?.topCategories ?? [];
  const recentEvents = data?.recentEvents ?? [];

  const maxMonthly = Math.max(...monthlyData, 1);

  const statTiles = [
    {
      title: 'Total Students',
      value: loading ? '...' : error ? 'N/A' : (counts.students ?? 0).toLocaleString(),
      icon: <GraduationCap />,
      color: 'blue',
      trend: null,
    },
    {
      title: 'Colleges Registered',
      value: loading ? '...' : error ? 'N/A' : (counts.colleges ?? 0).toLocaleString(),
      icon: <Users />,
      color: 'purple',
      trend: null,
    },
    {
      title: 'NGOs Registered',
      value: loading ? '...' : error ? 'N/A' : (counts.ngos ?? 0).toLocaleString(),
      icon: <HandHeart />,
      color: 'green',
      trend: null,
    },
    {
      title: 'Total Events',
      value: loading ? '...' : error ? 'N/A' : (counts.events ?? 0).toLocaleString(),
      icon: <Calendar />,
      color: 'orange',
      trend: null,
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--text-primary))]">
          Dashboard
        </h1>
        <p className="text-xl text-[rgb(var(--text-secondary))]">
          Live stats from the MarkIn App database
        </p>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </motion.div>

      {/* STAT TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statTiles.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {loading ? (
              <div className="glass rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-[rgb(var(--bg-tertiary))] rounded w-3/4 mb-4" />
                <div className="h-8 bg-[rgb(var(--bg-tertiary))] rounded w-1/2 mb-2" />
                <div className="h-3 bg-[rgb(var(--bg-tertiary))] rounded w-1/3" />
              </div>
            ) : (
              <DashboardTile {...stat} delay={index * 0.1} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* CHART — Events per month */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-1 text-[rgb(var(--text-primary))]">
              Events Over Time
            </h2>
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-6">
              Number of events created each month ({new Date().getFullYear()})
            </p>
            {loading ? (
              <div className="h-64 flex items-end justify-around gap-2 animate-pulse">
                {Array(12).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[rgb(var(--bg-tertiary))] rounded-t-lg min-w-[20px]"
                    style={{ height: `${Math.random() * 60 + 20}%` }}
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="h-64 flex items-end justify-around gap-2">
                  {monthlyData.map((count, i) => {
                    const heightPct = Math.round((count / maxMonthly) * 100);
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-1 hidden group-hover:flex bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-primary))] text-xs px-2 py-1 rounded shadow z-10 whitespace-nowrap">
                          {count} event{count !== 1 ? 's' : ''}
                        </div>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: heightPct > 0 ? `${heightPct}%` : '4px' }}
                          transition={{ delay: 0.6 + i * 0.05, type: 'spring', stiffness: 100 }}
                          className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg min-w-[20px]"
                          whileHover={{ opacity: 0.8 }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-around mt-3 text-xs text-[rgb(var(--text-tertiary))]">
                  {MONTHS.map(m => <span key={m}>{m}</span>)}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* TOP CATEGORIES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-1 text-[rgb(var(--text-primary))]">
            Top Categories
          </h2>
          <p className="text-sm text-[rgb(var(--text-secondary))] mb-6">By event aim</p>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {Array(4).fill(0).map((_, i) => (
                <div key={i}>
                  <div className="h-3 bg-[rgb(var(--bg-tertiary))] rounded w-3/4 mb-2" />
                  <div className="h-2 bg-[rgb(var(--bg-tertiary))] rounded-full" />
                </div>
              ))}
            </div>
          ) : topCategories.length === 0 ? (
            <p className="text-[rgb(var(--text-tertiary))] text-sm">No event data yet.</p>
          ) : (
            <div className="space-y-4">
              {topCategories.map((category, i) => (
                <div key={category.name}>
                  <div className="flex justify-between mb-1.5 text-sm">
                    <span className="text-[rgb(var(--text-secondary))] truncate max-w-[140px]" title={category.name}>
                      {category.name}
                    </span>
                    <span className="text-[rgb(var(--text-primary))] font-semibold ml-2">
                      {category.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-[rgb(var(--bg-tertiary))] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${CATEGORY_GRADIENTS[i % CATEGORY_GRADIENTS.length]} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* RECENT EVENTS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-2 text-[rgb(var(--text-primary))]">
          Recent Events
        </h2>
        <p className="text-[rgb(var(--text-secondary))] mb-6 text-sm">Latest NGO events registered in the app</p>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                <div className="h-5 bg-[rgb(var(--bg-tertiary))] rounded w-2/3 mb-4" />
                <div className="h-3 bg-[rgb(var(--bg-tertiary))] rounded w-1/2 mb-3" />
                <div className="h-3 bg-[rgb(var(--bg-tertiary))] rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : recentEvents.length === 0 ? (
          <p className="text-[rgb(var(--text-tertiary))]">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentEvents.map((event, index) => (
              <Card key={index} delay={0.8 + index * 0.1} enableTilt={false}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))] leading-tight pr-2">
                    {event.title}
                  </h3>
                  <span className="text-xs text-[rgb(var(--text-tertiary))] whitespace-nowrap">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[rgb(var(--accent-color))] flex-shrink-0" />
                  <p className="text-[rgb(var(--text-secondary))] text-sm truncate">{event.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[rgb(var(--accent-color))]" />
                  <span className="text-sm text-[rgb(var(--text-secondary))]">
                    {event.registeredStudents} student{event.registeredStudents !== 1 ? 's' : ''} registered
                  </span>
                </div>
                {event.eventDate && (
                  <div className="mt-3 pt-3 border-t border-[rgba(var(--border-color),0.15)]">
                    <span className="text-xs text-[rgb(var(--text-tertiary))]">
                      📅 {new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
