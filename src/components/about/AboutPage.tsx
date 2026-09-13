import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  ChevronDown,
  Clock,
  ExternalLink,
  GraduationCap,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { orgDetails, addToast } = useApp();

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const faqs = [
    {
      q: 'How can I submit a formal student concern or classroom facility request?',
      a: 'Learners may submit directly using our online "Student Concern & Suggestion Box" or the Student Voice Forum. You can also visit the SSLG Headquarters at Room 302, Science & Technology Building during afternoon office hours (3:30 PM – 5:00 PM).',
    },
    {
      q: 'What is the accreditation procedure for newly formed student clubs?',
      a: 'Clubs must download the official Club Accreditation Packet from the Resource Center, obtain the endorsement of a qualified faculty adviser, submit a list of at least 15 active members, and file their constitution with the SSLG Committee on Student Organizations by the 3rd week of September.',
    },
    {
      q: 'How does the SSLG ensure financial and budget transparency?',
      a: 'In accordance with DepEd orders and SSLG Resolution No. 01-2026, all operational allocations, itemized disbursement vouchers, and quarterly cash liquidations are verified by the Auditor and publicly published on our Transparency Portal.',
    },
    {
      q: 'How can a learner run for SSLG office in the next annual elections?',
      a: 'Candidates must be bonafide TCSHS students with good academic and disciplinary standing (no failing grades or pending disciplinary infractions). Nomination forms and certificate of candidacies are released by the SSLG Commission on Elections (COMELEC) every March.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    addToast('Message sent to the SSLG Secretariat! We will respond within 24–48 hours.', 'success');
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
          <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
          <span>About TCSHS & The Supreme Learner Government</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          LEADERSHIP ROOTED IN PURPOSE & EXCELLENCE
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The official constitutional mandate, historical legacy, institutional values, and student services desk of the Taguig City Science High School SSLG.
        </p>
      </div>

      {/* 1. School Legacy & Culture */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
            Institutional Legacy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Nurturing Future Scientists, Leaders, and Public Servants
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Founded with a commitment to mathematical and scientific excellence, Taguig City Science High School (TCSHS) serves as the premier secondary STEM institution in the Division of Taguig City and Pateros. Within this demanding academic environment, the Supreme Secondary Learner Government serves as the bedrock of student advocacy and civic participation.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Operating under DepEd Order No. 47, s. 2014 and DepEd Order No. 49, s. 2011, the SSLG ensures that student leadership actively complements academic rigor—creating a vibrant ecosystem where scientific inquiry is paired with empathetic servant leadership.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xl font-extrabold text-blue-900">100%</span>
              <p className="text-[11px] text-slate-500">Student Representation</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xl font-extrabold text-blue-900">DepEd</span>
              <p className="text-[11px] text-slate-500">Official Constitution</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xl font-extrabold text-blue-900">SY 26-27</span>
              <p className="text-[11px] text-slate-500">Active Mandate</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="p-8 rounded-3xl bg-blue-900 text-white shadow-xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-800 text-white border border-blue-700 flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Our Constitutional Mandate</h3>
              <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                "To uphold the ideals of student democracy, protect learners’ welfare, cultivate scientific and civic leadership, and serve as an active partner in school policy formulation."
              </p>
            </div>
            <div className="pt-4 border-t border-blue-800 text-xs text-blue-200">
              Supreme Secondary Learner Government • Taguig City Science High School
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars / Values */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
            Ethical Framework
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Council Core Pillars
          </h2>
          <p className="text-xs text-slate-500">
            Guiding principles that govern every resolution passed and project financed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Unwavering Integrity
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leading with truth and strict adherence to open financial reporting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Servant Leadership
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prioritizing student welfare, mental health, and academic inclusion above titles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Scientific Excellence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Applying evidence-based solutions, research, and data analytics to student policies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Full Accountability
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proactive audits, public question hours, and accessible records for every learner.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions (Interactive Accordion) */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
            Student Inquiries
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">
            Quick clarity on student concerns, club accreditations, room bookings, and elections.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;

            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isExpanded ? 'rotate-180 text-blue-900' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Official Contact Desk & Direct Message */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
              Get in Touch
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              SSLG Secretariat Office
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Visit our physical office or reach out via official institutional channels.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-slate-900 mb-0.5">
                  Office Location
                </strong>
                <p className="text-slate-600">
                  Room 302, 3rd Floor, Science & Technology Building, Taguig City Science High School, Taguig City
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-slate-900 mb-0.5">
                  Institutional Email
                </strong>
                <a href={`mailto:${orgDetails.officialEmail}`} className="text-blue-600 hover:underline">
                  {orgDetails.officialEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-slate-900 mb-0.5">
                  Office & Consultation Hours
                </strong>
                <p className="text-slate-600">
                  Monday to Friday: 7:30 AM – 8:00 AM | 3:30 PM – 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Send a Direct Communication
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Inquiries regarding partnerships, invitations, or formal council endorsements.
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Juan dela Cruz"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="juan@tcshs.edu.ph"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Subject
              </label>
              <input
                type="text"
                required
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="e.g. Math Club Inter-School Collaboration Invitation"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Message Body
              </label>
              <textarea
                required
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="State your purpose, relevant dates, or request details..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
