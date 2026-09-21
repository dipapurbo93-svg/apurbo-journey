import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Github, Linkedin, Mail, MapPin, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalData } from "@/data/personalData";
import heroVisual from "@/assets/engineering-ai-visual.jpg";

const navItems = [
  ["About", "about"], ["Journey", "education"], ["Skills", "skills"], ["Projects", "projects"],
  ["Certificate", "certificates"], ["Building", "building"], ["Vision", "vision"], ["Contact", "contact"],
] as const;

function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return <div className="section-heading"><span>{index}</span><div><p>{label}</p><h2>{title}</h2></div></div>;
}

export function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const categories = ["All", ...new Set(personalData.projects.map((project) => project.category))];
  const projects = filter === "All" ? personalData.projects : personalData.projects.filter((project) => project.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 md:px-8">
          <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => scrollTo("home")} aria-label="Go to home">
            <span className="brand-mark">AD</span><span className="truncate font-display text-sm font-semibold">Apurbo Kumar Dip</span>
          </button>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, id]) => <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</button>)}
          </nav>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="grid border-t border-border bg-background p-4 lg:hidden">{navItems.map(([label, id]) => <button key={id} className="mobile-nav" onClick={() => scrollTo(id)}>{label}<ArrowUpRight size={15} /></button>)}</nav>}
      </header>

      <main>
        <section id="home" className="relative min-h-[92vh] border-b border-border pt-18">
          <div className="mx-auto grid min-h-[calc(92vh-4.5rem)] max-w-7xl items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
            <div className="relative z-10">
              <p className="eyebrow"><span className="status-dot" /> EEE · AI · Automation</p>
              <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold leading-[.95] md:text-7xl lg:text-8xl">Apurbo<br/><span className="text-primary">Kumar Dip.</span></h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">{personalData.intro}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => scrollTo("projects")}>Explore my work <ArrowDown /></Button>
                <Button size="lg" variant="outline" asChild><a href={`mailto:${personalData.email}`}>Let’s Connect <ArrowUpRight /></a></Button>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground"><span className="inline-flex items-center gap-2"><MapPin size={15} className="text-primary" />{personalData.locations[0]}</span><span className="inline-flex items-center gap-2"><Zap size={15} className="text-primary" />Building intelligent systems</span></div>
            </div>
            <div className="hero-frame">
              <img src={heroVisual} alt="Abstract electrical engineering and artificial intelligence circuitry" width={1200} height={1504} className="h-full w-full object-cover" />
              <div className="hero-caption"><span>Engineering × Intelligence</span><span>01 / 09</span></div>
            </div>
          </div>
          <div className="ticker" aria-hidden="true"><span>MACHINE LEARNING</span><i/> <span>ELECTRONICS</span><i/> <span>AI AUTOMATION</span><i/> <span>EMERGING TECHNOLOGY</span></div>
        </section>

        <section id="about" className="section-shell reveal">
          <SectionHeading index="01" label="Who I am" title="Building at the intersection of EEE & AI." />
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div className="space-y-5 text-lg leading-8 text-muted-foreground">{personalData.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="data-panel">{personalData.details.map((item) => <div className="data-row" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div>
          </div>
          <div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">{personalData.highlights.map((item, index) => <article className="highlight" key={item.label}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.value}</p></article>)}</div>
          <div className="mt-10 border border-border bg-card/40 p-6 md:p-7">
            <p className="eyebrow"><span className="status-dot" /> Future Direction</p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">{personalData.futureDirection}</p>
          </div>
        </section>

        <section id="education" className="section-band reveal">
          <div className="section-inner"><SectionHeading index="02" label="Where I came from" title="A learning journey in motion." />
            <div className="timeline">{personalData.education.map((item) => <article className="timeline-item" key={item.title}><div className="timeline-year">{item.year}</div><div className="timeline-dot"/><div><p className="eyebrow">{item.detail}</p><h3>{item.title}</h3><p>{item.place}</p></div></article>)}</div>
          </div>
        </section>

        <section id="skills" className="section-shell reveal">
          <SectionHeading index="03" label="What I learned" title="A multidisciplinary toolkit." />
          <div className="skills-grid">{personalData.skills.map((skill, index) => <div className="skill-item" key={skill}><span>{String(index + 1).padStart(2, "0")}</span><h3>{skill}</h3><ArrowUpRight /></div>)}</div>
        </section>

        <section id="projects" className="section-band reveal">
          <div className="section-inner"><SectionHeading index="04" label="What I built" title="Experiments made tangible." />
            <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">{categories.map((category) => <Button key={category} size="sm" variant={filter === category ? "default" : "outline"} onClick={() => setFilter(category)}>{category}</Button>)}</div>
            <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">{projects.map((project, index) => <article className="project-card" key={project.title}><div className="flex items-start justify-between gap-4"><span className="project-index">{String(index + 1).padStart(2, "0")}</span><span className="project-category">{project.category}</span></div><h3>{project.title}</h3><div className="flex flex-wrap gap-2">{project.tech.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}</div><button className="project-toggle" aria-expanded={expanded === project.title} onClick={() => setExpanded(expanded === project.title ? null : project.title)}>Project details <ChevronDown className={expanded === project.title ? "rotate-180" : ""} size={16}/></button>{expanded === project.title && <p className="project-detail">{project.detail}</p>}</article>)}</div>
          </div>
        </section>

        <section id="certificates" className="section-shell reveal">
          <SectionHeading index="05" label="Certificate" title="Learning beyond the classroom." />
          <article className="certificate"><div className="certificate-seal"><Check size={26}/></div><div><p className="eyebrow">{personalData.certificate.type}</p><h3>{personalData.certificate.title}</h3><p>{personalData.certificate.detail}</p></div></article>
        </section>

        <section id="building" className="section-band reveal"><div className="section-inner"><SectionHeading index="06" label="Currently building" title="Active explorations." /><div className="build-list">{personalData.building.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><span className="live-label"><i/> In progress</span></div>)}</div></div></section>

        <section id="vision" className="vision-section reveal"><div className="mx-auto max-w-5xl"><p className="eyebrow">07 — Future vision</p><blockquote>“{personalData.vision}”</blockquote></div></section>

        <section id="contact" className="section-shell reveal">
          <SectionHeading index="08" label="Contact" title="Let’s build something meaningful." />
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="max-w-xl text-lg leading-8 text-muted-foreground">Open to conversations about engineering, AI automation, practical projects, and emerging technology.</p><a className="contact-email" href={`mailto:${personalData.email}`}>{personalData.email}<ArrowUpRight /></a></div><div className="flex flex-wrap gap-3"><Button variant="outline" asChild><a href={personalData.social.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a></Button><Button variant="outline" asChild><a href={personalData.social.github} target="_blank" rel="noreferrer"><Github/> GitHub</a></Button><Button asChild><a href={`https://wa.me/${personalData.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight/></a></Button></div></div>
        </section>
      </main>
      <footer className="border-t border-border px-5 py-8 text-sm text-muted-foreground md:px-8"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3"><span>© Apurbo Kumar Dip</span><span>Learn → Build → Experiment → Improve</span></div></footer>
    </div>
  );
}
