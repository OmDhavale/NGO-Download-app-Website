import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import {
  Book, HelpCircle, Zap, Users, FileText,
  GraduationCap, HandHeart, School, ShieldCheck,
  CheckCircle, CalendarCheck, Eye, ClipboardList,
  UserPlus, Building2, KeyRound,
} from 'lucide-react';

// ─── helpers ─────────────────────────────────────────────────────────────────
const SectionCard = ({ icon, title, description, gradient, links }) => (
  <Card className="h-full hover:shadow-lg transition-shadow">
    <div className="flex flex-col items-center text-center h-full">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 shadow-md`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-[rgb(var(--text-primary))]">{title}</h3>
      <p className="text-sm text-[rgb(var(--text-secondary))] mb-6">{description}</p>
      <div className="flex flex-col gap-3 w-full mt-auto">
        {links.map(({ label, href }) => (
          <motion.a
            key={href}
            href={href}
            className="text-blue-500 hover:text-blue-600 font-medium transition-colors text-sm hover:underline text-left"
            whileHover={{ x: 4 }}
          >
            → {label}
          </motion.a>
        ))}
      </div>
    </div>
  </Card>
);

const GuideBlock = ({ id, icon, tag, title, children, delay = 0 }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="glass p-6 rounded-xl border border-[rgba(var(--border-color),0.2)]"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-[rgba(var(--accent-color),0.1)] text-[rgb(var(--accent-color))]">
        {icon}
      </div>
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--text-tertiary))]">{tag}</span>
        <h3 className="text-xl font-bold text-[rgb(var(--text-primary))]">{title}</h3>
      </div>
    </div>
    {children}
  </motion.div>
);

const Steps = ({ items }) => (
  <ol className="space-y-2 mt-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-[rgb(var(--text-secondary))]">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
          {i + 1}
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ol>
);

const Badges = ({ items }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {items.map(({ label, color }) => (
      <span key={label} className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {label}
      </span>
    ))}
  </div>
);

// ─── page ─────────────────────────────────────────────────────────────────────
export const UserManualPage = () => {
  const panels = [
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: 'Student',
      description: 'Browse events, register & track your own attendance',
      gradient: 'from-blue-500 to-cyan-500',
      links: [
        { label: 'View Upcoming Events', href: '#student-view-events' },
        { label: 'Register for an Event', href: '#student-register' },
        { label: 'My Attendance & Event Status', href: '#student-attendance' },
      ],
    },
    {
      icon: <HandHeart className="w-7 h-7" />,
      title: 'NGO',
      description: 'Create events & mark attendance for registered students',
      gradient: 'from-rose-500 to-pink-500',
      links: [
        { label: 'View Events', href: '#ngo-view-events' },
        { label: 'Add New Event', href: '#ngo-add-events' },
        { label: 'Mark Attendance', href: '#ngo-mark-attendance' },
      ],
    },
    {
      icon: <School className="w-7 h-7" />,
      title: 'College',
      description: 'Monitor student participation & download reports',
      gradient: 'from-indigo-500 to-violet-500',
      links: [
        { label: 'College Login', href: '#college-login' },
        { label: 'Add Students (Single / Bulk)', href: '#college-add-students' },
        { label: 'View Student Attendance', href: '#college-view-attendance' },
        { label: 'Export Attendance Report', href: '#college-export' },
      ],
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: 'Admin',
      description: 'Register colleges, NGOs & manage admins',
      gradient: 'from-amber-500 to-orange-500',
      links: [
        { label: 'Add NGO', href: '#admin-add-ngo' },
        { label: 'Add College', href: '#admin-add-college' },
        { label: 'Register New Admin', href: '#admin-new-admin' },
      ],
    },
  ];

  const faqs = [
    {
      id: 'faq-1',
      question: 'How does a student log in?',
      answer: 'Students log in using the email and default password provided by their college. They can change their password from the profile settings after first login in further updates.',
    },
    {
      id: 'faq-2',
      question: 'What does "Registered" status mean?',
      answer: '"Registered" means the student signed up for the event but the event date has not arrived yet, or attendance has not been marked. Once marked, it changes to "Present" or "Absent".',
    },
    {
      id: 'faq-3',
      question: 'Can a college export attendance data?',
      answer: 'Yes. After selecting a class/division, click the "Export Class Data" button to download an Excel report with colour-coded Present / Absent / Registered statuses.',
    },
    {
      id: 'faq-4',
      question: 'How do I add multiple students at once?',
      answer: 'College admins can use the "Bulk Upload" feature — download the Excel template, fill in student details, and upload it to register students in bulk.',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4 sm:px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 shadow-lg">
              <Book className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[rgb(var(--text-primary))]">
            User Manual
          </h1>
          <p className="text-xl text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            Step-by-step guide for every role in the MarkIn attendance app
          </p>
        </motion.div>
      </section>

      {/* PANEL CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {panels.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SectionCard {...p} />
            </motion.div>
          ))}
        </div>
      </section>
      {/* YOUTUBE VIDEO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 border border-[rgba(var(--border-color),0.2)]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 text-white">
              {/* YouTube play icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.379 3.5 12 3.5 12 3.5s-7.379 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.202 0 12 0 12s0 3.798.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.621 20.5 12 20.5 12 20.5s7.379 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.798 24 12 24 12s0-3.798-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--text-tertiary))]">Video Guide</p>
              <h3 className="text-xl font-bold text-[rgb(var(--text-primary))]">Full App Demo & Walkthrough</h3>
            </div>
          </div>

          <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/TC02bDez6NI"
              title="MarkIn App Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-xl"
            />
          </div>

          <p className="text-sm text-[rgb(var(--text-secondary))] mt-4 text-center">
            Watch the full demo to see all features in action.{' '}
            <a
              href="https://youtu.be/TC02bDez6NI?si=CbeHOjrJlCBpufwW"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
            >
              Open on YouTube ↗
            </a>
          </p>
        </motion.div>
      </section>

      {/* DETAILED GUIDE */}

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-2 text-[rgb(var(--text-primary))] flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-500" />
            Detailed Guide
          </h2>
          <p className="text-[rgb(var(--text-secondary))]">Follow the steps below for your role</p>
        </motion.div>

        <div className="space-y-6">

          {/* ── STUDENT ─────────────────────────────────────── */}
          <div className="flex items-center gap-3 pt-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))]">Student</h3>
          </div>

          <GuideBlock id="student-view-events" icon={<Eye className="w-5 h-5" />} tag="Student" title="View Upcoming Events" delay={0}>
            <p className="text-[rgb(var(--text-secondary))]">
              After logging in, students land on the <strong>Events</strong> screen where all upcoming NGO events are listed.
            </p>
            <Steps items={[
              'Open the MarkIn app and log in with your student credentials.',
              'Tap the "Events" tab at the bottom navigation.',
              'Browse the list of upcoming events — each card shows the event name, location, and date.',
              'Tap any event to see its full details including description and aim.',
            ]} />
          </GuideBlock>

          <GuideBlock id="student-register" icon={<CalendarCheck className="w-5 h-5" />} tag="Student" title="Register for an Event" delay={0.05}>
            <p className="text-[rgb(var(--text-secondary))]">
              Students can register for any upcoming event with a single tap.
            </p>
            <Steps items={[
              'Open the event you want to attend.',
              'Tap the "Register" button on the event detail screen.',
              'A confirmation message will appear — your spot is reserved.',
              'The event will now appear in "My Events" with status Registered.',
            ]} />
            <p className="text-sm text-[rgb(var(--text-tertiary))] mt-3">
              ℹ️ Registration closes once the event date has passed.
            </p>
          </GuideBlock>

          <GuideBlock id="student-attendance" icon={<ClipboardList className="w-5 h-5" />} tag="Student" title="My Attendance & Event Status" delay={0.1}>
            <p className="text-[rgb(var(--text-secondary))] mb-3">
              Students can view their own attendance record for every event they have registered for.
            </p>
            <Steps items={[
              'Tap "My Events" from the bottom navigation.',
              'Each event card shows one of three statuses:',
            ]} />
            <Badges items={[
              { label: '✅ Present', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
              { label: '❌ Absent', color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
              { label: '🕐 Registered', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
            ]} />
            <p className="text-sm text-[rgb(var(--text-secondary))] mt-3">
              <strong>Present</strong> — NGO marked you as attended. <strong>Absent</strong> — you were registered but didn't attend. <strong>Registered</strong> — event has not taken place yet or attendance is not yet marked.
            </p>
          </GuideBlock>

          {/* ── NGO ─────────────────────────────────────────── */}
          <div className="flex items-center gap-3 pt-8">
            <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-white">
              <HandHeart className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))]">NGO</h3>
          </div>

          <GuideBlock id="ngo-view-events" icon={<Eye className="w-5 h-5" />} tag="NGO" title="View Events" delay={0.1}>
            <Steps items={[
              'Open the app and tap "NGO" on the login screen.',
              'Select your NGO from the list and enter your password.',
              'After login, all your events are displayed on the home screen.',
              'Tap any event to see full details and the registered college list.',
              'Use the "Export Excel" button at the top to download an attendance report.',
            ]} />
          </GuideBlock>

          <GuideBlock id="ngo-add-events" icon={<CalendarCheck className="w-5 h-5" />} tag="NGO" title="Add New Event" delay={0.15}>
            <p className="text-[rgb(var(--text-secondary))]">
              Events must be created at least one day before the event date.
            </p>
            <Steps items={[
              'Tap the "+" / New button at the top right of the events screen.',
              'Fill in the event details:',
            ]} />
            <ul className="list-disc list-inside text-[rgb(var(--text-secondary))] space-y-1 ml-9 mt-2 text-sm">
              <li>Location</li>
              <li>Aim (category / purpose)</li>
              <li>Description</li>
              <li>Event Date</li>
              <li>Images (optional)</li>
            </ul>
            <Steps items={['Tap "Create Event" to save.']} />
          </GuideBlock>

          <GuideBlock id="ngo-mark-attendance" icon={<CheckCircle className="w-5 h-5" />} tag="NGO" title="Mark Attendance" delay={0.2}>
            <p className="text-[rgb(var(--text-secondary))] mb-2">
              When you tap "Mark Attendance" on an event, you see only the students who have <strong>registered</strong> for that event — not all students.
            </p>
            <Steps items={[
              'Open the event and tap "Mark Attendance".',
              'Select the college from the dropdown.',
              'The list shows only registered students for that college.',
              'Select the class/division from the second dropdown.',
              'Tap "Present" or "Absent" next to each student\'s name.',
              'Double-check your selections, then tap "Submit" on the confirmation pop-up.',
            ]} />
            <p className="text-sm text-[rgb(var(--text-tertiary))] mt-3">
              ℹ️ Only students who registered for this event appear in the list.
            </p>
          </GuideBlock>

          {/* ── COLLEGE ──────────────────────────────────────── */}
          <div className="flex items-center gap-3 pt-8">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
              <School className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))]">College</h3>
          </div>

          <GuideBlock id="college-login" icon={<KeyRound className="w-5 h-5" />} tag="College" title="College Login" delay={0.2}>
            <Steps items={[
              'Tap "College" on the login screen.',
              'Your college name will appear in the list — select it.',
              'Enter the college password and tap "Login".',
              'You will be taken to the college dashboard.',
            ]} />
          </GuideBlock>

          <GuideBlock id="college-add-students" icon={<UserPlus className="w-5 h-5" />} tag="College" title="Add Students (Single or Bulk)" delay={0.22}>
            <p className="text-[rgb(var(--text-secondary))] mb-4">
              College admins can add students one at a time or import them all at once via an Excel file.
            </p>

            {/* Single student */}
            <p className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-1">➕ Add a Single Student</p>
            <Steps items={[
              'From the college dashboard, go to the class/division you want to add the student to.',
              'Tap the "Add Student" button.',
              'Fill in the student details: Name, PRN, Department, and Email.',
              'Tap "Save" — the student is added to the class with a default password.',
            ]} />

            {/* Bulk upload */}
            <p className="text-sm font-semibold text-[rgb(var(--text-primary))] mt-5 mb-1">📥 Add Students in Bulk (Excel)</p>
            <Steps items={[
              'Tap the "Bulk Upload" / "Import Students" button in the class screen.',
              'Tap "Download Template" to get the pre-formatted Excel file.',
              'Fill in all student rows in the template: Name, PRN, Department, Email.',
              'Save the file and tap "Upload" to select it from your device.',
              'Review the preview list — then tap "Confirm Import" to add all students at once.',
            ]} />
            <p className="text-sm text-[rgb(var(--text-tertiary))] mt-3">
              ℹ️ All newly added students get a default password which they can update in future app versions.
            </p>
          </GuideBlock>

          <GuideBlock id="college-view-attendance" icon={<ClipboardList className="w-5 h-5" />} tag="College" title="View Student Attendance" delay={0.25}>
            <p className="text-[rgb(var(--text-secondary))] mb-2">
              The college dashboard lets you see every student's attendance status across all NGO events.
            </p>
            <Steps items={[
              'From the home screen, tap "View Attendance".',
              'Your classes/divisions are listed (e.g. FY-A, SY-B, TY-C).',
              'Tap a class to see all students in that division.',
              'Tap a student\'s name to view every event they registered for along with their status:',
            ]} />
            <Badges items={[
              { label: '✅ Present', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
              { label: '❌ Absent', color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
              { label: '🕐 Registered', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
            ]} />
          </GuideBlock>

          <GuideBlock id="college-export" icon={<FileText className="w-5 h-5" />} tag="College" title="Export Attendance Report" delay={0.3}>
            <Steps items={[
              'Go to the class/division whose data you want to export.',
              'Tap the "Export Class Data" button at the top.',
              'An Excel file will be downloaded with colour-coded attendance:',
            ]} />
            <ul className="list-disc list-inside text-[rgb(var(--text-secondary))] space-y-1 ml-9 mt-2 text-sm">
              <li>🟢 Green — Present</li>
              <li>🔴 Red — Absent</li>
              <li>🟡 Amber — Registered (not yet attended)</li>
            </ul>
            <p className="text-sm text-[rgb(var(--text-tertiary))] mt-3">
              You can also export all events at once using "Export All Events" from the events screen.
            </p>
          </GuideBlock>

          {/* ── ADMIN ────────────────────────────────────────── */}
          <div className="flex items-center gap-3 pt-8">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))]">Admin</h3>
          </div>

          <GuideBlock id="admin-add-ngo" icon={<Building2 className="w-5 h-5" />} tag="Admin" title="Add NGO" delay={0.3}>
            <Steps items={[
              'Log in with your Admin credentials.',
              'Tap "Add NGO" from the admin dashboard.',
              'Fill in the NGO name, email, mobile, address, registration number, and upload a logo.',
              'Tap "Submit" — the NGO will be registered and can now log in.',
            ]} />
          </GuideBlock>

          <GuideBlock id="admin-add-college" icon={<School className="w-5 h-5" />} tag="Admin" title="Add College" delay={0.35}>
            <Steps items={[
              'Log in with your Admin credentials.',
              'Tap "Add College" from the admin dashboard.',
              'Fill in the college name, email, address, and upload a college logo.',
              'Set a password for the college account.',
              'Tap "Submit" — the college will appear in the college list.',
            ]} />
          </GuideBlock>

          <GuideBlock id="admin-new-admin" icon={<UserPlus className="w-5 h-5" />} tag="Admin" title="Register New Admin" delay={0.4}>
            <Steps items={[
              'Log in with your Admin credentials.',
              'Tap "Register New Admin".',
              'Enter your own password to confirm this action.',
              'Fill in the new admin\'s name, email, and password.',
              'Tap "Submit" — the new admin can now log in.',
            ]} />
          </GuideBlock>

        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-[rgb(var(--text-primary))] text-center flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl border border-[rgba(var(--border-color),0.2)] hover:border-[rgba(var(--border-color),0.4)] transition-colors"
              >
                <h3 className="text-lg font-bold mb-3 text-[rgb(var(--accent-color))] flex items-center gap-2">
                  <span className="inline-flex w-6 h-6 rounded-full bg-blue-500 text-white text-center text-sm items-center justify-center flex-shrink-0">?</span>
                  {faq.question}
                </h3>
                <p className="text-[rgb(var(--text-secondary))]">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SUPPORT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-xl border border-[rgba(var(--border-color),0.2)] text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-[rgb(var(--text-primary))]">Need More Help?</h2>
          <p className="text-[rgb(var(--text-secondary))] mb-2 max-w-2xl mx-auto">
            Contact the CoderZhive team at{' '}
            <a href="mailto:coderzhiveai@gmail.com" className="text-blue-500 hover:text-blue-600 font-medium">
              coderzhiveai@gmail.com
            </a>
          </p>
        </motion.div>
      </section>
    </div>
  );
};
