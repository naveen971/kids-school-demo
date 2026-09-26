import { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Mail, Phone } from 'lucide-react';

interface BookVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookVisitModal({ isOpen, onClose }: BookVisitModalProps) {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childAge: '4',
    tourFocus: 'Early Years (Ages 3–5)',
    preferredDate: '2026-10-15',
    preferredTime: 'Morning (09:30 AM — Inquiry Circle & Atelier)',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] max-h-[92vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="bg-[#1E2522] text-white p-6 md:p-8 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F7DC6F] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Visit Experience</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-white">
              Come Walk Our Grounds
            </h3>
            <p className="text-xs md:text-sm text-neutral-300 font-sans mt-1">
              We invite families for small, unhurried morning visits (maximum 4 families per group) to experience authentic classrooms in session.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-10 flex flex-col items-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#E27D60]/20 text-[#E27D60] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="font-serif text-3xl text-[#1E2522]">
                Your Visit is Confirmed
              </h4>

              <p className="text-sm text-[#55605A] max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <span className="font-semibold text-[#1E2522]">{formData.parentName || 'Parent'}</span>. We have reserved your family’s morning visit pass for:
              </p>

              <div className="my-6 p-6 rounded-2xl bg-[#F0EBE3] border border-[#E2DAD0] text-left max-w-md w-full">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8C8275] mb-2">
                  <Calendar className="w-4 h-4 text-[#E27D60]" />
                  <span>{formData.preferredDate}</span>
                  <span>·</span>
                  <Clock className="w-4 h-4 text-[#E27D60]" />
                  <span>{formData.preferredTime.split('(')[0]}</span>
                </div>
                <div className="font-serif text-lg text-[#1E2522] font-medium">
                  {formData.tourFocus}
                </div>
                <div className="text-xs text-[#55605A] mt-1">
                  Child Age: {formData.childAge} years old · Confirmation sent to {formData.email || 'your email'}
                </div>
                <div className="mt-4 pt-3 border-t border-[#DFD7CB] text-[11px] font-mono text-[#7A8580]">
                  Location: The Welcome Atrium, WonderNest School (Main Gate)
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-full bg-[#1E2522] text-white text-xs font-semibold tracking-wider hover:bg-[#324039] transition-colors cursor-pointer"
              >
                RETURN TO WEBSITE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Parent Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#55605A] mb-1.5">
                    Parent / Guardian Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sarah Vance"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCD3C5] bg-white text-sm text-[#1E2522] focus:border-[#E27D60] focus:ring-1 focus:ring-[#E27D60] outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#55605A] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="email"
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCD3C5] bg-white text-sm text-[#1E2522] focus:border-[#E27D60] focus:ring-1 focus:ring-[#E27D60] outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#55605A] mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 342-9102"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCD3C5] bg-white text-sm text-[#1E2522] focus:border-[#E27D60] focus:ring-1 focus:ring-[#E27D60] outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Child Age */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#55605A] mb-1.5">
                    Child’s Age *
                  </label>
                  <select
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD3C5] bg-white text-sm text-[#1E2522] focus:border-[#E27D60] focus:ring-1 focus:ring-[#E27D60] outline-hidden transition-all"
                  >
                    {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
                      <option key={a} value={a}>
                        {a} Years Old
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tour Focus Program */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#55605A] mb-1.5">
                  Program Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Early Years (Ages 3–5)', 'Lower Primary (Ages 6–8)', 'Upper Primary (Ages 9–12)'].map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setFormData({ ...formData, tourFocus: p })}
                      className={`p-2.5 text-xs rounded-xl border text-center transition-all cursor-pointer ${
                        formData.tourFocus === p
                          ? 'border-[#E27D60] bg-[#E27D60]/10 text-[#1E2522] font-semibold'
                          : 'border-[#DCD3C5] bg-white text-[#55605A] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#55605A] mb-1.5">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    min="2026-10-01"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD3C5] bg-white text-sm text-[#1E2522] focus:border-[#E27D60] focus:ring-1 focus:ring-[#E27D60] outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#55605A] mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD3C5] bg-white text-sm text-[#1E2522] focus:border-[#E27D60] focus:ring-1 focus:ring-[#E27D60] outline-hidden transition-all"
                  >
                    <option value="Morning (09:30 AM — Inquiry Circle & Atelier)">
                      Morning (09:30 AM — Inquiry Circle & Atelier)
                    </option>
                    <option value="Mid-Day (11:30 AM — Garden & Lunch Refectory)">
                      Mid-Day (11:30 AM — Garden & Lunch Refectory)
                    </option>
                    <option value="Afternoon (02:00 PM — Tinkering & Forest Woods)">
                      Afternoon (02:00 PM — Tinkering & Forest Woods)
                    </option>
                  </select>
                </div>
              </div>

              {/* Questions or notes */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#55605A] mb-1.5">
                  Anything specific you’d like to explore? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Inquiring about support for second-language learners, or our child’s love of nature and clay..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCD3C5] bg-white text-sm text-[#1E2522] focus:border-[#E27D60] focus:ring-1 focus:ring-[#E27D60] outline-hidden transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8C8275]">
                  Small groups · Max 4 families per morning
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-full bg-[#E27D60] hover:bg-[#d66a4e] text-white text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'CONFIRMING VISIT...' : 'CONFIRM VISIT RESERVATION'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
