import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  GithubIcon, LinkedinIcon, Mail, MapPin, Phone, Download, ArrowUpRight, Sparkles,
  Code2, Cloud, Wrench, Layers, GraduationCap, Award,
  Rocket, Cpu, Zap, ExternalLink, ArrowRight, CheckCircle2,
} from "lucide-react";
const Github = GithubIcon;
const Linkedin = LinkedinIcon;
import portrait from "@/assets/anshika.jpg";
import { Navbar } from "@/components/Navbar";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Particles } from "@/components/Particles";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

// ---------- DATA EXTRACTED FROM RESUME ----------
const DATA = {
  name: "Anshika Tyagi",
  titles: ["Frontend Developer", "React JS Engineer", "JavaScript Specialist", "Firebase Builder", "UI Craftswoman"],
  role: "Frontend Developer · React JS · JavaScript · Firebase",
  location: "Muzaffarnagar, UP, India",
  email: "anshikaty11@gmail.com",
  phone: "+91 9760852829",
  linkedin: "https://www.linkedin.com/in/anshika-tyagi-8618602b5/",
  github: "https://github.com/anshika-07",
  summary:
    "Motivated and detail-oriented Frontend Developer (MCA, 2026) with hands-on experience building responsive, scalable web applications using React JS, JavaScript, Tailwind CSS, and Firebase. Strong foundation in component-based architecture, REST API integration, and real-time application development. Passionate about crafting clean, accessible UIs and continuously growing through real-world projects and modern frontend practices.",
  stats: [
    { label: "Years Coding", value: 3, suffix: "+" },
    { label: "Projects Built", value: 3, suffix: "+" },
    { label: "Certifications", value: 2, suffix: "" },
    { label: "Tech Stack", value: 15, suffix: "+" },
  ],
  skillCategories: [
    { icon: Code2, name: "Languages", items: ["JavaScript (ES6+)", "Java", "C"], color: "from-cyan-400 to-blue-500" },
    { icon: Layers, name: "Frontend", items: ["React JS", "Tailwind CSS", "HTML5", "CSS3", "Responsive Design", "Component Architecture"], color: "from-blue-500 to-purple-500" },
    { icon: Cloud, name: "Backend & APIs", items: ["Firebase Auth", "Firestore", "Realtime DB", "REST APIs", "Third-Party SDKs"], color: "from-purple-500 to-pink-500" },
    { icon: Wrench, name: "Tools", items: ["Git", "GitHub", "VS Code", "Postman"], color: "from-pink-500 to-cyan-400" },
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Dr. A.P.J. Abdul Kalam Technical University",
      city: "Lucknow",
      period: "2024 – 2026",
      status: "Completed",
      detail: "Advanced computer applications, software engineering, and modern web architecture.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "Chaudhary Charan Singh University",
      city: "Meerut",
      period: "2021 – 2024",
      status: "Completed",
      detail: "Foundation in programming, data structures, databases, and full-stack development.",
    },
  ],
  projects: [
    {
      name: "Weather Application",
      tagline: "Real-time weather intelligence",
      stack: ["JavaScript", "REST API", "OpenWeatherMap", "HTML5", "CSS3"],
      features: [
        "Real-time weather data via OpenWeatherMap REST API",
        "Dynamic temperature, humidity, location and conditions",
        "Async fetch() pipelines with graceful error handling",
        "Clean, responsive user interface",
      ],
      gradient: "from-cyan-500/30 via-blue-500/20 to-transparent",
    },
    {
      name: "Chat Application",
      tagline: "Peer-to-peer messaging engine",
      stack: ["Java", "TCP Sockets", "Multi-threading", "Client-Server"],
      features: [
        "Peer-to-peer chat over TCP socket programming",
        "Multi-threaded server handling concurrent clients",
        "Non-blocking real-time message exchange",
        "Local network client-server architecture",
      ],
      gradient: "from-purple-500/30 via-pink-500/20 to-transparent",
    },
  ],
  certifications: [
    {
      title: "Full Stack Web Development Certification",
      detail: "Frontend · Backend · REST APIs · Database Fundamentals",
    },
    {
      title: "React JS Frontend Development Certification",
      detail: "React Hooks · Component-Based UI · Responsive Design with Tailwind CSS",
    },
  ],
  strengths: [
    "Problem-Solving & Debugging",
    "Clean Code & Scalable Architecture",
    "Fast Learner & Self-Driven",
    "Collaborative Team Player",
    "UI/UX Sensibility",
    "Deadline-Oriented",
  ],
};

// ---------- Helper components ----------
function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mb-14 text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
        <Sparkles className="h-3 w-3" />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        <span className="text-gradient animate-gradient">{title}</span>
      </h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{sub}</p>}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const dur = 1400;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function TypingTitles({ titles }: { titles: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = titles[idx];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del && text === full) { setTimeout(() => setDel(true), 1400); return; }
      if (del && text === "") { setDel(false); setIdx((i) => (i + 1) % titles.length); return; }
      setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx, titles]);
  return (
    <span className="font-mono text-[var(--neon-cyan)]">
      {text}<span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-[var(--neon-cyan)]" />
    </span>
  );
}

// ---------- HERO ----------
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-glow" />
      <motion.div style={{ y, opacity }} className="container relative z-10 mx-auto grid items-center gap-12 px-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--neon-cyan)] glow-cyan"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--neon-cyan)]" />
            Available for Opportunities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="text-gradient animate-gradient">Anshika</span>
            <br />
            <span className="text-foreground">Tyagi.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-muted-foreground sm:text-xl"
          >
            I'm a <TypingTitles titles={DATA.titles} /> crafting cinematic, accessible interfaces with React, Tailwind, and Firebase.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="/Anshika_Tyagi_Resume.pdf" download
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-blue)] to-[var(--neon-purple)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_0_30px_oklch(0.85_0.18_200/40%)] transition-transform hover:scale-105"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full border border-white/15 glass px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--neon-cyan)]/50">
              View Projects <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
              Contact <Mail className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[var(--neon-cyan)]" />{DATA.location}</span>
            <a className="flex items-center gap-1.5 hover:text-foreground" href={DATA.github} target="_blank" rel="noreferrer"><Github className="h-3.5 w-3.5" /> github.com/anshika-07</a>
            <a className="flex items-center gap-1.5 hover:text-foreground" href={DATA.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9 }}
          className="relative mx-auto w-full max-w-xs"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[var(--neon-cyan)]/40 via-[var(--neon-blue)]/30 to-[var(--neon-purple)]/40 opacity-60 blur-3xl pulse-glow" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 glass-strong p-2">
            <div className="relative overflow-hidden rounded-[1.6rem]">
              <img src={portrait} alt="Anshika Tyagi portrait" width={1024} height={1024} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent" />
            </div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}
              className="absolute -left-4 top-10 glass-strong rounded-2xl border-gradient px-3 py-2 text-xs font-mono"
            >
              <div className="flex items-center gap-2"><Code2 className="h-3.5 w-3.5 text-[var(--neon-cyan)]" /> React · Tailwind</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }}
              className="absolute -right-4 bottom-16 glass-strong rounded-2xl border-gradient px-3 py-2 text-xs font-mono"
            >
              <div className="flex items-center gap-2"><Cloud className="h-3.5 w-3.5 text-[var(--neon-purple)]" /> Firebase Realtime</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity }}
              className="absolute -bottom-4 left-10 glass-strong rounded-2xl border-gradient px-3 py-2 text-xs font-mono"
            >
              <div className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-[var(--neon-blue)]" /> MCA · 2026</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
        Scroll to explore ↓
      </div>
    </section>
  );
}

// ---------- ABOUT ----------
function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionTitle eyebrow="About" title="A storyteller in code" sub="Designing pixel-perfect interfaces, one component at a time." />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-strong border-gradient relative overflow-hidden rounded-3xl p-8 lg:p-10"
          >
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[var(--neon-purple)]/20 blur-3xl" />
            <p className="relative text-base leading-relaxed text-foreground/90 sm:text-lg">
              {DATA.summary}
            </p>
            <div className="relative mt-8 flex flex-wrap gap-2">
              {DATA.strengths.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {DATA.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-strong border-gradient flex flex-col justify-between rounded-3xl p-6"
              >
                <div className="font-display text-4xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- SKILLS ----------
function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionTitle eyebrow="Toolbox" title="Technical Expertise" sub="A curated stack for building fast, modern, real-time apps." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DATA.skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group glass-strong border-gradient relative overflow-hidden rounded-3xl p-6"
              >
                <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${cat.color} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`} />
                <div className={`relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-[var(--background)]" />
                </div>
                <h3 className="relative font-display text-lg font-semibold">{cat.name}</h3>
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {cat.items.map((it) => (
                    <span key={it} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- EDUCATION / JOURNEY ----------
function Journey() {
  return (
    <section id="experience" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionTitle eyebrow="Academic Journey" title="Education Timeline" sub="From foundational programming to advanced software engineering." />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--neon-cyan)]/50 via-[var(--neon-purple)]/50 to-transparent md:left-1/2" />
          <div className="space-y-12">
            {DATA.education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="ml-12 md:ml-0 md:px-6">
                  <div className="glass-strong border-gradient group rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--neon-cyan)]">
                      <GraduationCap className="h-4 w-4" /> {edu.period} · {edu.status}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold">{edu.degree}</h3>
                    <div className="mt-1 text-sm text-foreground/80">{edu.school}</div>
                    <div className="text-xs text-muted-foreground">{edu.city}</div>
                    <p className="mt-4 text-sm text-muted-foreground">{edu.detail}</p>
                  </div>
                </div>
                <div className="hidden md:block" />
                {/* Node */}
                <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-[var(--neon-cyan)] opacity-30" />
                    <div className="relative h-4 w-4 rounded-full border-2 border-[var(--background)] bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] shadow-[0_0_20px_oklch(0.85_0.18_200/70%)]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- PROJECTS ----------
function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionTitle eyebrow="Selected Work" title="Featured Projects" sub="Crafted with curiosity. Built for the real world." />
        <div className="grid gap-6 lg:grid-cols-2">
          {DATA.projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass-strong border-gradient group relative overflow-hidden rounded-3xl"
            >
              <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Rocket className="h-20 w-20 text-white/20 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12" />
                </div>
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/70">{`Project 0${i + 1}`}</div>
                    <h3 className="mt-1 font-display text-2xl font-bold">{p.name}</h3>
                  </div>
                  <a className="rounded-full glass-strong p-2 transition-colors hover:bg-white/15" href={DATA.github} target="_blank" rel="noreferrer" aria-label="View on GitHub">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground">{p.tagline}</p>
                <ul className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--neon-cyan)]" />
                      <span className="text-foreground/85">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-full border border-[var(--neon-cyan)]/20 bg-[var(--neon-cyan)]/5 px-2.5 py-1 text-[11px] font-mono text-[var(--neon-cyan)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- CERTIFICATIONS ----------
function Certifications() {
  return (
    <section id="certifications" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionTitle eyebrow="Credentials" title="Certifications" sub="Continuous learning, certified." />
        <div className="grid gap-5 md:grid-cols-2">
          {DATA.certifications.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-strong border-gradient group relative overflow-hidden rounded-3xl p-6"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <div className="relative flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)]/20 to-[var(--neon-purple)]/20 ring-1 ring-white/10">
                  <Award className="h-7 w-7 text-[var(--neon-cyan)]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-[var(--neon-cyan)]">
                    <CheckCircle2 className="h-3 w-3" /> Verified Skill
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- CONTACT ----------
function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionTitle eyebrow="Get in touch" title="Let's build something" sub="Open to frontend roles, internships and meaningful collaborations." />
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong border-gradient mx-auto max-w-4xl overflow-hidden rounded-3xl p-8 sm:p-12"
        >
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl font-bold text-gradient">Say hello 👋</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Whether it's a project, a question, or just a hi — my inbox is always open.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <a href={`mailto:${DATA.email}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-[var(--neon-cyan)]/40">
                  <Mail className="h-4 w-4 text-[var(--neon-cyan)]" />
                  <span className="flex-1 font-mono text-xs">{DATA.email}</span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
                <a href={`tel:${DATA.phone}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-[var(--neon-cyan)]/40">
                  <Phone className="h-4 w-4 text-[var(--neon-cyan)]" />
                  <span className="flex-1 font-mono text-xs">{DATA.phone}</span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <MapPin className="h-4 w-4 text-[var(--neon-cyan)]" />
                  <span className="font-mono text-xs">{DATA.location}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="grid grid-cols-2 gap-3">
                <a href={DATA.github} target="_blank" rel="noreferrer" className="glass group flex items-center justify-between rounded-2xl p-4 transition-transform hover:-translate-y-1">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">GitHub</div>
                    <div className="mt-1 text-sm font-semibold">anshika-07</div>
                  </div>
                  <Github className="h-5 w-5 text-[var(--neon-cyan)] transition-transform group-hover:rotate-12" />
                </a>
                <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="glass group flex items-center justify-between rounded-2xl p-4 transition-transform hover:-translate-y-1">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">LinkedIn</div>
                    <div className="mt-1 text-sm font-semibold">Anshika Tyagi</div>
                  </div>
                  <Linkedin className="h-5 w-5 text-[var(--neon-purple)] transition-transform group-hover:rotate-12" />
                </a>
              </div>
              <a
                href="/Anshika_Tyagi_Resume.pdf" download
                className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-blue)] to-[var(--neon-purple)] p-4 text-sm font-semibold text-[var(--background)] shadow-[0_0_40px_oklch(0.85_0.18_200/40%)] transition-transform hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" /> Download Full Resume (PDF)
              </a>
            </div>
          </div>
        </motion.div>

        <footer className="mt-16 flex flex-col items-center gap-2 text-xs text-muted-foreground">
          <div className="font-mono">© {new Date().getFullYear()} Anshika Tyagi · Designed & built with React</div>
          <div className="flex items-center gap-1.5"><Cpu className="h-3 w-3" /> Crafted at the edge of curiosity</div>
        </footer>
      </div>
    </section>
  );
}

// ---------- ROOT ----------
function Portfolio() {
  return (
    <main className="relative min-h-screen bg-[var(--background)]">
      <Particles />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Journey />
      <Projects />
      <Certifications />
      <Contact />
    </main>
  );
}
