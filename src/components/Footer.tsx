import { Compass, Mail, Phone, MapPin, Instagram, Youtube, Linkedin, Globe } from 'lucide-react';

interface FooterProps {
  onBookVisit: () => void;
  onExploreCampus: () => void;
}

export default function Footer({ onBookVisit, onExploreCampus }: FooterProps) {
  return (
    <footer className="bg-[#151B18] text-[#FAF8F5] pt-20 pb-12 border-t border-[#232C27]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-white">
              WONDERNEST SCHOOL
            </h3>
            <p className="font-serif italic text-sm text-[#F7DC6F] mt-1.5">
              “Where Little Minds Grow Big Dreams.”
            </p>
            <p className="mt-4 text-xs md:text-sm text-neutral-400 font-sans max-w-sm leading-relaxed">
              An independent progressive school for children aged 3 to 12. Grounded in Reggio Emilia inquiry, fine atelier arts, acoustic music, and unhurried natural world stewardship.
            </p>
          </div>

          {/* Quick Exploration Links */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8C8275] mb-4">
              Campus Exploration
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-sans">
              <li>
                <a href="#our-world" className="hover:text-white transition-colors">
                  Our Pedagogical World
                </a>
              </li>
              <li>
                <button onClick={onExploreCampus} className="hover:text-white transition-colors cursor-pointer text-left">
                  3D Interactive Campus Model
                </button>
              </li>
              <li>
                <a href="#day-in-life" className="hover:text-white transition-colors">
                  A Day in Their World (08:30–15:30)
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-white transition-colors">
                  The Hundred Languages Atelier
                </a>
              </li>
              <li>
                <a href="#children-art" className="hover:text-white transition-colors">
                  Made by Little Hands Gallery
                </a>
              </li>
              <li>
                <button onClick={onBookVisit} className="hover:text-[#F7DC6F] transition-colors cursor-pointer text-left">
                  Schedule an In-Person Walkthrough
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8C8275] mb-4">
              Campus Sanctuary & Contact
            </div>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E27D60] shrink-0 mt-0.5" />
                <span>42 Cedar Meadow Way, Whispering Pines Campus, Sanctuary Valley</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E27D60] shrink-0" />
                <span>Admissions Office: +1 (555) 482-9012</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E27D60] shrink-0" />
                <span>welcome@wondernest-school.org</span>
              </div>
              <div className="pt-2 flex items-center gap-4 text-neutral-400">
                <span title="Instagram" className="hover:text-white transition-colors cursor-pointer">
                  <Instagram className="w-4 h-4" />
                </span>
                <span title="YouTube" className="hover:text-white transition-colors cursor-pointer">
                  <Youtube className="w-4 h-4" />
                </span>
                <span title="LinkedIn" className="hover:text-white transition-colors cursor-pointer">
                  <Linkedin className="w-4 h-4" />
                </span>
                <span title="Global Network" className="hover:text-white transition-colors cursor-pointer">
                  <Globe className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} WonderNest School. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#F7DC6F]">Designed with curiosity.</span>
            <span>Accredited Forest & Reggio Pedagogy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
