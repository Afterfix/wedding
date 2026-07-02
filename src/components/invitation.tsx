import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Volume2, VolumeX, MapPin, Calendar, Heart, Users, Car, Utensils,
  Camera, Baby, Bus, Info, Home as HomeIcon, CalendarDays, Image as ImageIcon,
  Send, X, ChevronRight, Sparkles, Moon
} from "lucide-react";

import brideAsset from "@/assets/bride.png";
import groomAsset from "@/assets/groom.png";
import collage1Asset from "@/assets/collage1.png";
import collage2Asset from "@/assets/collage2.png";
import couple1Asset from "@/assets/couple1.png";
import couple2Asset from "@/assets/couple2.png";
import couple3Asset from "@/assets/couple3.png";
import bgMusic from "@/assets/india_happy-oud-488103.mp3";
import landingMusic from "@/assets/kaazoom-shattered-strings-heavy-metal-played-on-oud-banjo-and-ukulele-335793.mp3";

const IMG = {
  bride: brideAsset,
  groom: groomAsset,
  collage1: collage1Asset,
  collage2: collage2Asset,
  couple1: couple1Asset,
  couple2: couple2Asset,
  couple3: couple3Asset,
};

const WEDDING_DATE = new Date("2026-07-09T17:00:00+10:30");

/* ---------------- Petals ---------------- */
function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 12,
        size: 8 + Math.random() * 14,
        rotate: Math.random() * 360,
        opacity: 0.35 + Math.random() * 0.4,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute animate-petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" style={{ transform: `rotate(${p.rotate}deg)` }}>
            <path
              d="M12 2 C 16 6, 18 12, 12 22 C 6 12, 8 6, 12 2 Z"
              fill="url(#pg)"
            />
            <defs>
              <linearGradient id="pg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#f2e6d0" />
                <stop offset="1" stopColor="#c8a66a" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ---------------- Fade ---------------- */
function Fade({ children, delay = 0, y = 24, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Ornament ---------------- */
function Ornament({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-champagne" />
      {label ? (
        <span className="text-champagne text-xs tracking-[0.4em] uppercase font-body">{label}</span>
      ) : (
        <Sparkles className="w-3.5 h-3.5 text-champagne" />
      )}
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-champagne" />
    </div>
  );
}

/* ---------------- Countdown ---------------- */
function useCountdown(date: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, date.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function CountdownCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass-card rounded-2xl px-3 py-4 text-center min-w-0">
      <div className="font-serif text-3xl md:text-4xl text-olive-dark tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] tracking-[0.35em] uppercase text-brown mt-1">{label}</div>
    </div>
  );
}

function Countdown({ big = false }: { big?: boolean }) {
  const { d, h, m, s } = useCountdown(WEDDING_DATE);
  if (big) {
    const items = [
      { v: d, l: "Days" }, { v: h, l: "Hours" }, { v: m, l: "Minutes" }, { v: s, l: "Seconds" },
    ];
    return (
      <div className="grid grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.l} className="relative">
            <div className="glass-card rounded-full aspect-square flex flex-col items-center justify-center">
              <div className="font-serif text-2xl text-olive-dark tabular-nums">{String(it.v).padStart(2, "0")}</div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-brown mt-0.5">{it.l}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-2">
      <CountdownCard value={d} label="Days" />
      <CountdownCard value={h} label="Hrs" />
      <CountdownCard value={m} label="Min" />
      <CountdownCard value={s} label="Sec" />
    </div>
  );
}

/* ---------------- Section title ---------------- */
function SectionTitle({ eyebrow, title, script }: { eyebrow?: string; title: string; script?: string }) {
  return (
    <Fade className="text-center px-6">
      {eyebrow && (
        <div className="text-champagne text-[11px] tracking-[0.4em] uppercase mb-3 font-body">{eyebrow}</div>
      )}
      {script && <div className="font-script text-champagne text-4xl leading-none mb-1">{script}</div>}
      <h2 className="font-serif text-4xl md:text-5xl text-olive-dark font-light">{title}</h2>
      <Ornament />
    </Fade>
  );
}

/* ---------------- Landing ---------------- */
function Landing({ onOpen, muted, toggleMute }: { onOpen: () => void; muted: boolean; toggleMute: () => void }) {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8 text-center overflow-hidden"
      style={{ background: "var(--gradient-ivory)" }}
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-champagne/30 blur-3xl" />
        <div className="absolute bottom-0 -right-16 w-80 h-80 rounded-full bg-olive/20 blur-3xl" />
      </div>
      <Petals count={10} />

      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-10 glass-card w-11 h-11 rounded-full flex items-center justify-center text-olive-dark"
        aria-label="Toggle music"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="relative"
      >
        <div className="font-arabic text-2xl md:text-3xl text-olive-dark leading-loose">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.1 }}
        className="mt-8 text-brown text-sm tracking-[0.15em] max-w-xs leading-relaxed"
      >
        With the blessings of Allah,<br />we joyfully invite you to celebrate our wedding.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 1.6 }}
        className="mt-10"
      >
        <div className="font-script text-champagne text-3xl">the wedding of</div>
        <div className="font-serif text-5xl md:text-6xl text-olive-dark mt-2 leading-none">Muhammed Anas</div>
        <div className="font-script text-champagne text-4xl my-1">&</div>
        <div className="font-serif text-5xl md:text-6xl text-olive-dark leading-none">Khadeeja Neha</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.2 }}
        className="mt-8 flex items-center gap-3"
      >
        <span className="h-px w-8 bg-champagne" />
        <span className="text-brown tracking-[0.35em] text-xs uppercase">9 · 11 · 12 July 2026</span>
        <span className="h-px w-8 bg-champagne" />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 2.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={onOpen}
        className="relative mt-14 group"
      >
        <span className="absolute inset-0 rounded-full bg-champagne/30 blur-xl group-hover:blur-2xl transition-all" />
        <span className="relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-olive-dark text-ivory tracking-[0.3em] text-xs uppercase shadow-[var(--shadow-luxe)]">
          Open Invitation <ChevronRight className="w-4 h-4" />
        </span>
      </motion.button>
    </motion.div>
  );
}

/* ---------------- Curved image ---------------- */
function CurvedImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: "50% 50% 46% 46% / 40% 40% 60% 60%" }}>
      <div className="absolute inset-0 ring-1 ring-champagne/40 rounded-[inherit] z-10 pointer-events-none" />
      <div className="absolute inset-[6px] ring-1 ring-champagne/20 rounded-[inherit] z-10 pointer-events-none" />
      <img src={src} alt={alt} className="w-full h-full object-cover animate-slow-zoom" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/40 via-transparent to-ivory/20 z-[5]" />
    </div>
  );
}

/* ---------------- Sections ---------------- */
function SaveTheDate() {
  return (
    <section id="home" className="pt-20 pb-24 px-6 relative">
      <SectionTitle eyebrow="the moment" title="Save the Date" script="Together forever" />
      <Fade delay={0.1}>
        <div className="relative mx-auto max-w-sm">
          <CurvedImage src={IMG.couple1} alt="Anas & Neha" className="aspect-[3/4] w-full" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-card rounded-full px-6 py-3 whitespace-nowrap">
            <div className="font-script text-champagne text-2xl leading-none">Neha &amp; Anas</div>
          </div>
        </div>
      </Fade>
      <Fade delay={0.25}>
        <div className="mt-16 text-center">
          <div className="text-brown text-xs tracking-[0.35em] uppercase mb-2">Celebrating on</div>
          <div className="font-serif text-3xl text-olive-dark">Saturday · 11 July 2026</div>
        </div>
      </Fade>
      <Fade delay={0.35}>
        <div className="mt-8 max-w-sm mx-auto">
          <Countdown />
        </div>
      </Fade>
      <Fade delay={0.45}>
        <div className="mt-8 flex justify-center">
          <a
            href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:Anas %26 Neha Wedding%0ADTSTART:20260711T113000Z%0ADTEND:20260711T160000Z%0ALOCATION:Heavens Auditorium, Makkaraparamba%0AEND:VEVENT%0AEND:VCALENDAR"
            download="anas-neha-wedding.ics"
            className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-3 text-olive-dark text-xs tracking-[0.3em] uppercase"
          >
            <Calendar className="w-4 h-4" /> Add to Calendar
          </a>
        </div>
      </Fade>
    </section>
  );
}

function OurStory() {
  const items = [
    { title: "How We Met", date: "2023", body: "Two families, one gentle introduction — and a conversation that felt like it had always existed." },
    { title: "Engagement", date: "Winter 2025", body: "A quiet promise made in the presence of loved ones, sealed with prayer and gratitude." },
    { title: "Nikkah", date: "9 July 2026", body: "The sacred bond by which two hearts become one under the mercy of Allah." },
    { title: "Wedding Celebration", date: "11 · 12 July 2026", body: "A gathering of family, laughter, and light — a beginning made beautiful by those we love." },
  ];
  return (
    <section className="py-24 px-6">
      <SectionTitle eyebrow="the journey" title="Our Story" script="A love written" />
      <div className="relative max-w-md mx-auto">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-champagne to-transparent" />
        <div className="space-y-10">
          {items.map((it, i) => (
            <Fade key={it.title} delay={i * 0.05}>
              <div className="pl-12 relative">
                <div className="absolute left-2 top-2 w-5 h-5 rounded-full bg-ivory border border-champagne flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                </div>
                <div className="glass-card rounded-2xl p-5">
                  <div className="text-[10px] tracking-[0.35em] uppercase text-champagne">{it.date}</div>
                  <h3 className="font-serif text-2xl text-olive-dark mt-1">{it.title}</h3>
                  <p className="text-sm text-brown/90 leading-relaxed mt-2">{it.body}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function MeetTheCouple() {
  const cards = [
    { name: "Muhammed Anas", role: "The Groom", img: IMG.groom, note: "Devoted, thoughtful, steady of heart." },
    { name: "Khadeeja Neha", role: "The Bride", img: IMG.bride, note: "Grace, gentleness, and a quiet strength." },

  ];
  return (
    <section className="py-24 px-6">
      <SectionTitle eyebrow="the two of us" title="Meet the Couple" script="Beloved" />
      <div className="space-y-8 max-w-sm mx-auto">
        {cards.map((c, i) => (
          <Fade key={c.name} delay={i * 0.1}>
            <div className="relative rounded-[28px] p-2 bg-gradient-to-br from-champagne/60 via-cream to-champagne/60 shadow-[var(--shadow-luxe)]">
              <div className="rounded-[22px] overflow-hidden bg-ivory">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover animate-slow-zoom" loading="lazy" />
                </div>
                <div className="p-6 text-center">
                  <div className="text-[10px] tracking-[0.4em] uppercase text-champagne">{c.role}</div>
                  <h3 className="font-serif text-3xl text-olive-dark mt-1">{c.name}</h3>
                  <div className="gold-divider my-3 w-16 mx-auto" />
                  <p className="text-sm text-brown italic">{c.note}</p>
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function WeddingEvents() {
  const events = [
    {
      date: "9 July 2026",
      title: "Nikkah & Engagement",
      time: "10:00 AM",
      venue: "Family Residence",
      desc: "The sacred nikkah ceremony followed by an intimate engagement gathering.",
      maps: "https://maps.google.com/?q=Kunnappally+Pattambi",
    },
    {
      date: "11 July 2026",
      title: "Bride's Celebration",
      time: "12:00 PM",
      venue: "Kunnappally, Pattambi – Perinthalmanna Road",
      desc: "A joyful celebration hosted by the bride's family.",
      maps: "https://maps.google.com/?q=Kunnappally+Pattambi+Perinthalmanna+Road",
    },
    {
      date: "12 July 2026",
      title: "Groom's Reception",
      time: "4:00 PM – 8:00 PM",
      venue: "Heavens Auditorium, Makkaraparamba",
      desc: "An evening of warmth, dinner, and dua with our loved ones.",
      maps: "https://maps.google.com/?q=Heavens+Auditorium+Makkaraparamba",
    },
  ];
  return (
    <section id="events" className="py-24 px-6">
      <SectionTitle eyebrow="the celebrations" title="Wedding Events" script="Join us" />
      <div className="relative max-w-md mx-auto">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-champagne to-transparent" />
        <div className="space-y-8">
          {events.map((e, i) => (
            <Fade key={e.title} delay={i * 0.08}>
              <div className="pl-14 relative">
                <div className="absolute left-3 top-4 w-7 h-7 rounded-full bg-gradient-to-br from-champagne to-champagne-soft flex items-center justify-center shadow-[var(--shadow-glass)]">
                  <span className="font-serif text-ivory text-sm">{i + 1}</span>
                </div>
                <div className="glass-card rounded-3xl p-6">
                  <div className="text-[10px] tracking-[0.35em] uppercase text-champagne">{e.date}</div>
                  <h3 className="font-serif text-2xl text-olive-dark mt-1">{e.title}</h3>
                  <div className="gold-divider my-3" />
                  <div className="text-sm text-brown space-y-1">
                    <div><span className="text-olive-dark/70 uppercase tracking-widest text-[10px] mr-2">Time</span>{e.time}</div>
                    <div><span className="text-olive-dark/70 uppercase tracking-widest text-[10px] mr-2">Venue</span>{e.venue}</div>
                  </div>
                  <p className="text-sm text-brown/90 italic mt-3">{e.desc}</p>
                  <a
                    href={e.maps}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-olive-dark border border-champagne/60 rounded-full px-4 py-2 hover:bg-champagne/10 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" /> View Location
                  </a>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function BigCountdown() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full bg-champagne/10 blur-3xl" />
      </div>
      <SectionTitle eyebrow="the awaited day" title="Until We Celebrate" script="Counting the moments" />
      <Fade>
        <div className="max-w-sm mx-auto">
          <Countdown big />
        </div>
      </Fade>
      <Fade delay={0.2}>
        <div className="text-center mt-8 text-brown text-sm italic">
          Every heartbeat brings us closer.
        </div>
      </Fade>
    </section>
  );
}

function Venue() {
  return (
    <section id="venue" className="py-24 px-6">
      <SectionTitle eyebrow="the place" title="Venue" script="Where we begin" />
      <Fade>
        <div className="max-w-sm mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-luxe)] border border-champagne/30">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={IMG.couple2} alt="Venue" className="w-full h-full object-cover animate-slow-zoom" loading="lazy" />
            </div>
            <div className="p-6 bg-ivory text-center">
              <div className="text-[10px] tracking-[0.4em] uppercase text-champagne">Reception</div>
              <h3 className="font-serif text-3xl text-olive-dark mt-1">Heavens Auditorium</h3>
              <p className="text-sm text-brown mt-1">Makkaraparamba</p>
              <div className="gold-divider w-20 mx-auto my-4" />
              <a
                href="https://maps.google.com/?q=Heavens+Auditorium+Makkaraparamba"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-ivory bg-olive-dark rounded-full px-6 py-3"
              >
                <MapPin className="w-3.5 h-3.5" /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </Fade>
      <Fade delay={0.15}>
        <div className="max-w-sm mx-auto mt-6 rounded-3xl overflow-hidden border border-champagne/30 shadow-[var(--shadow-soft)]">
          <iframe
            title="Heavens Auditorium map"
            src="https://www.google.com/maps?q=Heavens+Auditorium+Makkaraparamba&output=embed"
            className="w-full h-56 border-0"
            loading="lazy"
          />
        </div>
      </Fade>
    </section>
  );
}

function TimelineOfDay() {
  const rows = [
    {  label: "Guest Arrival", icon: Users },
    { label: "Welcome Drinks", icon: Utensils },
    {  label: "Photography", icon: Camera },
    {  label: "Dinner", icon: Utensils },
    {  label: "Reception", icon: Heart },
  ];
  return (
    <section className="py-24 px-6">
      <SectionTitle eyebrow="the flow" title="Wedding Timeline" script="Our day" />
      <div className="max-w-md mx-auto space-y-3">
        {rows.map((r, i) => (
          <Fade key={r.label} delay={i * 0.05}>
            <div className="flex items-center gap-4 glass-card rounded-2xl p-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-champagne/70 to-champagne-soft/70 flex items-center justify-center text-ivory">
                <r.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-serif text-lg text-olive-dark leading-tight">{r.label}</div>
                <div className="text-[11px] tracking-[0.3em] uppercase text-brown">{r.t}</div>
              </div>
              <motion.div
                className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-champagne to-transparent origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.1 }}
                viewport={{ once: true }}
              />
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const shots = [
    { src: IMG.couple1, span: "row-span-2" },
    { src: IMG.collage1, span: "" },
    // { src: IMG.couple3, span: "" },
    { src: IMG.collage2, span: "row-span-2" },
    { src: IMG.couple2, span: "" },
    { src: IMG.bride, span: "" },
    { src: IMG.groom, span: "" },
  ];
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="py-24 px-6">
      <SectionTitle eyebrow="the memories" title="Gallery" script="Moments" />
      <div className="grid grid-cols-2 gap-3 auto-rows-[140px] max-w-md mx-auto">
        {shots.map((s, i) => (
          <Fade key={i} delay={i * 0.05} className={s.span}>
            <button
              onClick={() => setOpen(s.src)}
              className="group relative w-full h-full overflow-hidden rounded-2xl border border-champagne/30 shadow-[var(--shadow-glass)]"
            >
              <img src={s.src} alt="" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110 animate-slow-zoom" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/30 via-transparent to-transparent" />
            </button>
          </Fade>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-olive-dark/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <button className="absolute top-6 right-6 w-11 h-11 rounded-full glass-card flex items-center justify-center">
              <X className="w-5 h-5 text-olive-dark" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={open}
              alt=""
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DressCode() {
  return (
    <section className="py-24 px-6">
      <SectionTitle eyebrow="the attire" title="Dress Code" script="Elegant" />
      <div className="grid grid-cols-1 gap-5 max-w-sm mx-auto">
        {[
          { who: "Men", note: "Traditional / Formal", palette: ["#F7F2EA", "#5F6654", "#7A6856"] },
          { who: "Women", note: "Elegant Traditional", palette: ["#FAF8F5", "#C8A66A", "#F7F2EA"] },
        ].map((d, i) => (
          <Fade key={d.who} delay={i * 0.1}>
            <div className="rounded-3xl border border-champagne/50 p-6 bg-ivory/60 backdrop-blur-md text-center">
              <div className="text-[10px] tracking-[0.4em] uppercase text-champagne">{d.who}</div>
              <h3 className="font-serif text-3xl text-olive-dark mt-1">{d.note}</h3>
              <div className="flex justify-center gap-2 mt-4">
                {d.palette.map((c) => (
                  <span key={c} className="w-8 h-8 rounded-full border border-champagne/40" style={{ background: c }} />
                ))}
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function GuestInfo() {
  const items = [
    { icon: HomeIcon, t: "Reception", d: "Nearby stays arranged for out-of-town guests on request." },
    { icon: Car, t: "Parking", d: "Ample parking available at the venue premises." },
    { icon: Moon, t: "Prayer Area", d: "A dedicated prayer space with wudu facilities." },
    { icon: Utensils, t: "Dinner", d: "Traditional feast served from 6:30 PM onwards." },
    { icon: Camera, t: "Photography", d: "Professional coverage — kindly avoid flash during the nikkah." },
    { icon: Bus, t: "Transportation", d: "Shuttle service between events on request." },
  ];
  return (
    <section className="py-24 px-6">
      <SectionTitle eyebrow="for our guests" title="Guest Information" script="With care" />
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {items.map((it, i) => (
          <Fade key={it.t} delay={i * 0.04}>
            <div className="glass-card rounded-2xl p-4 h-full">
              <it.icon className="w-5 h-5 text-champagne" />
              <div className="font-serif text-lg text-olive-dark mt-2 leading-tight">{it.t}</div>
              <p className="text-[11px] text-brown/90 mt-1 leading-relaxed">{it.d}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function Family() {
  const cols = [
    {
      title: "Bride's Family",
      parents: "Mr. & Mrs. [Bride's Parents]",
      siblings: "Beloved siblings & cousins",
      img: IMG.bride,
    },
    {
      title: "Groom's Family",
      parents: "Mr. & Mrs. [Groom's Parents]",
      siblings: "Beloved siblings & cousins",
      img: IMG.groom,
    },
  ];
  return (
    <section className="py-24 px-6">
      <SectionTitle eyebrow="our roots" title="Family" script="With gratitude" />
      <div className="space-y-6 max-w-sm mx-auto">
        {cols.map((c, i) => (
          <Fade key={c.title} delay={i * 0.1}>
            <div className="rounded-3xl overflow-hidden border border-champagne/40 bg-ivory/60 backdrop-blur-md">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover animate-slow-zoom" loading="lazy" />
              </div>
              <div className="p-5 text-center">
                <div className="text-[10px] tracking-[0.4em] uppercase text-champagne">{c.title}</div>
                <div className="font-serif text-xl text-olive-dark mt-1">{c.parents}</div>
                <div className="text-sm text-brown italic mt-1">{c.siblings}</div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function RSVP() {
  const [state, setState] = useState({ name: "", phone: "", guests: "1", attending: "yes", note: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: state.name,
          phone: state.phone,
          guests: state.guests,
          attending: state.attending,
          note: state.note,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (error) {
      console.error("Failed to send RSVP:", error);
      alert("Failed to send RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-6">
      <SectionTitle eyebrow="kindly reply" title="" script="Grace us" />
      <Fade>
        <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto glass-card rounded-3xl p-6 space-y-4"
        >
          {(["name", "phone"] as const).map((k) => (
            <div key={k}>
              <label className="text-[10px] tracking-[0.35em] uppercase text-champagne">{k}</label>
              <input
                required
                value={state[k]}
                onChange={(e) => setState({ ...state, [k]: e.target.value })}
                className="mt-1 w-full bg-transparent border-b border-champagne/50 py-2 text-olive-dark focus:outline-none focus:border-olive-dark transition-colors font-serif text-lg"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.35em] uppercase text-champagne">Guests</label>
              <select
                value={state.guests}
                onChange={(e) => setState({ ...state, guests: e.target.value })}
                className="mt-1 w-full bg-transparent border-b border-champagne/50 py-2 text-olive-dark focus:outline-none focus:border-olive-dark font-serif text-lg"
              >
                {["1", "2", "3", "4", "5+"].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.35em] uppercase text-champagne">Attending</label>
              <select
                value={state.attending}
                onChange={(e) => setState({ ...state, attending: e.target.value })}
                className="mt-1 w-full bg-transparent border-b border-champagne/50 py-2 text-olive-dark focus:outline-none focus:border-olive-dark font-serif text-lg"
              >
                <option value="yes">Joyfully</option>
                <option value="no">Regretfully No</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-[0.35em] uppercase text-champagne">Special Note</label>
            <textarea
              rows={3}
              value={state.note}
              onChange={(e) => setState({ ...state, note: e.target.value })}
              className="mt-1 w-full bg-transparent border-b border-champagne/50 py-2 text-olive-dark focus:outline-none focus:border-olive-dark font-body text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sent || loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-olive-dark text-ivory tracking-[0.3em] text-xs uppercase py-3 rounded-full shadow-[var(--shadow-luxe)] disabled:opacity-50"
          >
            {loading ? "Sending..." : sent ? "Thank You" : "Send RSVP"} <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </Fade>
    </section>
  );
}

function Wishes() {
  const seed = [
    { n: "Ajmal", m: "May Allah bless your union with barakah and endless joy." },
    { n: "Sameera", m: "Wishing you a lifetime of love and laughter." },
    { n: "Rashid", m: "Two beautiful souls, one blessed journey. Mabrook!" },
  ];
  const [wishes, setWishes] = useState(seed);
  const [n, setN] = useState(""); const [m, setM] = useState("");
  return (
    <section className="py-24 px-6">
      <SectionTitle eyebrow="from the heart" title="Wedding Wishes" script="Your blessings" />
      <div className="max-w-sm mx-auto space-y-4">
        {wishes.map((w, i) => (
          <Fade key={i} delay={i * 0.05}>
            <motion.div
              className="glass-card rounded-2xl p-5 animate-soft-float"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div className="font-script text-champagne text-2xl leading-none">{w.n}</div>
              <p className="text-sm text-brown italic mt-2">“{w.m}”</p>
            </motion.div>
          </Fade>
        ))}
      </div>
      <Fade>
        <form
          onSubmit={(e) => { e.preventDefault(); if (n && m) { setWishes([{ n, m }, ...wishes]); setN(""); setM(""); } }}
          className="max-w-sm mx-auto mt-8 space-y-3"
        >
          <input placeholder="Your name" value={n} onChange={(e) => setN(e.target.value)} className="w-full glass-card rounded-full px-5 py-3 text-sm text-olive-dark placeholder:text-brown/60 focus:outline-none" />
          <textarea placeholder="Your wish for us..." rows={3} value={m} onChange={(e) => setM(e.target.value)} className="w-full glass-card rounded-2xl px-5 py-3 text-sm text-olive-dark placeholder:text-brown/60 focus:outline-none resize-none" />
          <button className="w-full bg-olive-dark text-ivory tracking-[0.3em] text-xs uppercase py-3 rounded-full">Send Wish</button>
        </form>
      </Fade>
    </section>
  );
}

function PhotoCarousel() {
  const photos = [IMG.couple1, IMG.couple2, IMG.couple3, IMG.collage1, IMG.collage2, IMG.bride, IMG.groom];
  return (
    <section className="py-24">
      <SectionTitle eyebrow="the album" title="Photo Memories" script="Snapshots" />
      <Fade>
        <div className="overflow-x-auto no-scrollbar px-6 -mx-6">
          <div className="flex gap-4 pb-4">
            {photos.map((p, i) => (
              <div key={i} className="shrink-0 w-56 aspect-[3/4] rounded-3xl overflow-hidden border border-champagne/30 shadow-[var(--shadow-luxe)]">
                <img src={p} alt="" className="w-full h-full object-cover animate-slow-zoom" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
}

function QuranVerse() {
  return (
    <section className="py-28 px-8">
      <Fade>
        <div className="max-w-md mx-auto text-center relative">
          <div className="absolute inset-0 -m-6 rounded-[40px] bg-gradient-to-br from-champagne/10 via-transparent to-olive/10 blur-2xl" />
          <div className="relative glass-card rounded-[32px] p-8">
            <Ornament label="Quran 30:21" />
            <div className="font-arabic text-2xl text-olive-dark leading-loose">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            </div>
            <div className="gold-divider w-16 mx-auto my-5" />
            <p className="font-serif italic text-lg text-brown leading-relaxed">
              “And among His signs is that He created for you mates from among yourselves,
              that you may find tranquility in them — and He placed between you affection and mercy.”
            </p>
          </div>
        </div>
      </Fade>
    </section>
  );
}

function ThankYou() {
  return (
    <section className="pt-24 pb-40 px-6 relative">
      <SectionTitle eyebrow="with love" title="Thank You" script="Shukran" />
      <Fade>
        <div className="max-w-sm mx-auto">
          <CurvedImage src={IMG.couple3} alt="Anas & Neha" className="aspect-[3/4] w-full" />
        </div>
      </Fade>
      <Fade delay={0.2}>
        <p className="text-center text-brown italic max-w-xs mx-auto mt-8 leading-relaxed">
          With love and gratitude, we look forward to celebrating this special day together.
        </p>
      </Fade>
      <Fade delay={0.3}>
        <div className="text-center mt-10">
          <div className="text-[10px] tracking-[0.4em] uppercase text-champagne">With Compliments From</div>
          <div className="font-serif text-3xl text-olive-dark mt-8">Anas &amp; Neha</div>
          <div className="text-brown text-xs tracking-[0.35em] mt-1 uppercase">11 · 07 · 2026</div>
        </div>
      </Fade>
    </section>
  );
}

/* ---------------- Bottom Nav ---------------- */
function BottomNav() {
  const items = [
    { id: "home", i: HomeIcon, l: "Home" },
    { id: "events", i: CalendarDays, l: "Events" },
    { id: "gallery", i: ImageIcon, l: "Gallery" },
    { id: "venue", i: MapPin, l: "Venue" },
    { id: "rsvp", i: Heart, l: "RSVP" },
  ];
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(400px,calc(100%-24px))]"
    >
      <div className="glass-card rounded-full px-3 py-2 flex items-center justify-between shadow-[var(--shadow-luxe)]">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded-full text-olive-dark hover:text-champagne transition-colors"
          >
            <it.i className="w-4 h-4" />
            <span className="text-[9px] tracking-[0.2em] uppercase">{it.l}</span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

/* ---------------- Parallax hero decoration ---------------- */
function GlobalDecor() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 300]);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-champagne/10 blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-olive/10 blur-3xl" />
      <motion.div style={{ y: y1 }} className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-champagne-soft/10 blur-3xl" />
    </div>
  );
}

/* ---------------- Root ---------------- */
export default function Invitation() {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (!muted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [open, muted]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Center the mobile invitation on desktop */}
      <div className="mx-auto max-w-[440px] relative">
        <GlobalDecor />
        <Petals count={12} />

        <audio ref={audioRef} loop src={open ? bgMusic : landingMusic} />

        <AnimatePresence>
          {!open && <Landing onOpen={() => { setOpen(true); setMuted(false); window.scrollTo(0, 0); }} muted={muted} toggleMute={() => setMuted((m) => !m)} />}
        </AnimatePresence>

        {open && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setMuted((m) => !m)}
            className="fixed top-4 right-4 z-40 glass-card w-10 h-10 rounded-full flex items-center justify-center text-olive-dark md:right-[calc(50%-210px)]"
            aria-label="Toggle music"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>
        )}

        <main className="relative z-10">
          <SaveTheDate />
          <OurStory />
          <MeetTheCouple />
          <WeddingEvents />
          <BigCountdown />
          <Venue />
          <TimelineOfDay />
          <Gallery />
          {/* <DressCode /> */}
          <GuestInfo />
          <Family />
          <RSVP />
          <Wishes />
          <PhotoCarousel />
          <QuranVerse />
          <ThankYou />
        </main>

        {/* {open && <BottomNav />} */}
      </div>
    </div>
  );
}
