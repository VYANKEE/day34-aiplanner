import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, Zap, ArrowRight, Copy, RefreshCw, 
  Cpu, Database, Globe, Command, Info, ShieldCheck, Rocket, MousePointer2,
  Lightbulb, Target
} from 'lucide-react';

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);
  return (
    <div 
      className="custom-cursor hidden md:block" 
      style={{ left: `${position.x}px`, top: `${position.y}px` }} 
    />
  );
};

// --- TYPEWRITER EFFECT ---
const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else clearInterval(timer);
    }, 5);
    return () => clearInterval(timer);
  }, [text]);
  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

// --- MARQUEE ANIMATION ---
const Marquee = () => (
  <div className="w-full bg-[#0b1221]/80 border-y border-white/5 py-4 overflow-hidden flex relative z-10 backdrop-blur-md">
    <div className="flex animate-marquee gap-16 whitespace-nowrap text-cyan-400/80 text-sm font-mono tracking-[0.2em] uppercase">
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-2"><Cpu size={14} className="text-purple-400"/> AI Architecture</span>
          <span className="flex items-center gap-2"><Database size={14} className="text-blue-400"/> Tech Stack Analysis</span>
          <span className="flex items-center gap-2"><Globe size={14} className="text-pink-400"/> Market Viability</span>
          <span className="flex items-center gap-2"><Zap size={14} className="text-yellow-400"/> MVP Scope Definition</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

function App() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [activeField, setActiveField] = useState(null);
  
  const [config, setConfig] = useState({ type: 'Web App', depth: 'Detailed', audience: 'Startups' });
  
  const generatorRef = useRef(null);
  const resultRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // --- API CALL (CONNECTED TO YOUR LIVE BACKEND) ---
  const generateRequirements = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      // 👇 YAHAN TERA LIVE URL UPDATE KAR DIYA HAI
      const res = await fetch('https://day34-aiplanner.onrender.com/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, ...config }),
      });
      const data = await res.json();
      setResponse(data.result);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (error) {
      setResponse("⚠️ System Offline: Backend connection failed. Please check Render logs.");
    } finally {
      setLoading(false);
    }
  };

  // --- DATA FOR HOLOGRAPHIC GUIDE ---
  const helpData = {
    type: { 
      title: "Platform Type", 
      icon: <Globe className="text-cyan-400" />,
      definition: "Choose the environment where your software will live.",
      useCase: "Web Apps are for broad access (SaaS). Mobile Apps are for GPS/Camera usage.",
      howToUse: "Select 'Web App' if you want users to access it via Chrome. Select 'Mobile' if you need an App Store launch."
    },
    depth: { 
      title: "Analysis Depth", 
      icon: <Database className="text-purple-400" />,
      definition: "Determines how detailed the AI's output document will be.",
      useCase: "MVP is for quick testing. Detailed is for developers & investors.",
      howToUse: "Use 'MVP Only' to strip away non-essentials. Use 'Detailed' when you are ready to start coding."
    },
    audience: { 
      title: "Target Audience", 
      icon: <ShieldCheck className="text-green-400" />,
      definition: "Who are you building this for?",
      useCase: "Startups need speed & growth features. Enterprise needs security & logs.",
      howToUse: "Select 'Startups' for modern tech stacks. Select 'Enterprise' for stable, scalable architecture."
    },
    idea: { 
      title: "Vision Input", 
      icon: <Sparkles className="text-yellow-400" />,
      definition: "The raw concept or problem statement you want to solve.",
      useCase: "Turning a one-line thought into a full technical specification.",
      howToUse: "Be descriptive. Mention the problem, the user, and the goal. Example: 'A drone delivery system for medical supplies'."
    }
  };

  return (
    <div className="min-h-screen relative text-slate-200 bg-[#020617] selection:bg-indigo-500 selection:text-white cursor-none md:cursor-auto">
      <CustomCursor />

      {/* BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="fixed inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Command size={18} />
            </div>
            VISION<span className="text-indigo-400">FORGE</span>
          </div>
          <button onClick={() => generatorRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hidden md:flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest border border-white/10 rounded hover:bg-white/5 transition-colors">
            <MousePointer2 size={14} /> Launch Terminal
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="z-10">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-cyan-400 border border-cyan-500/30 rounded bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              :: SYSTEM V2.0 ONLINE
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6 tracking-tight">
              Build <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-pulse">Faster.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed border-l-2 border-white/10 pl-6">
              Transform ideas into production-ready specs instantly.
            </p>
            <button onClick={() => generatorRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
              Start Building <ArrowRight size={18} />
            </button>
          </motion.div>

          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} className="hidden lg:block">
            <motion.div style={{ y: yHero }} className="relative h-[500px] cursor-pointer">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
               <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" className="relative w-full h-full object-cover rounded-3xl opacity-80 border border-white/10 shadow-2xl" alt="AI Core" />
            </motion.div>
          </Tilt>
        </div>
      </section>

      <Marquee />

      {/* GENERATOR */}
      <div ref={generatorRef} className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Zap className="text-yellow-400" /> Configure Neural Network</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {['type', 'depth', 'audience'].map((id) => (
                    <div key={id} onMouseEnter={() => setActiveField(id)} onMouseLeave={() => setActiveField(null)} className="group border-gradient rounded-xl p-[1px]">
                      <div className="bg-[#020617] rounded-xl p-1 h-full">
                        <label className="text-xs font-mono text-slate-400 uppercase mb-2 block px-3 pt-2">{id}</label>
                        <select className="w-full bg-transparent text-white px-3 pb-3 text-sm outline-none appearance-none cursor-pointer" 
                          value={config[id]} onChange={(e) => setConfig({...config, [id]: e.target.value})}>
                          {id === 'type' ? ['Web App', 'Mobile App', 'SaaS Platform'].map(o=><option key={o}>{o}</option>) : 
                           id === 'depth' ? ['Detailed', 'MVP Only', 'Technical Spec'].map(o=><option key={o}>{o}</option>) :
                           ['Startups', 'Enterprise', 'Developers'].map(o=><option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <div onMouseEnter={() => setActiveField('idea')} onMouseLeave={() => setActiveField(null)} className="border-gradient rounded-xl p-[1px]">
                  <textarea className="w-full bg-[#020617] rounded-xl p-6 min-h-[150px] text-lg outline-none resize-none placeholder:text-slate-700 text-white" 
                    placeholder="Describe your dream app..." value={idea} onChange={(e) => setIdea(e.target.value)} />
                </div>

                <button onClick={generateRequirements} disabled={loading || !idea} className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-50">
                  {loading ? <RefreshCw className="animate-spin" /> : <Rocket />} {loading ? 'Analyzing...' : 'Generate Blueprint'}
                </button>
              </div>
            </div>

            {/* --- HOLOGRAPHIC GUIDE PANEL --- */}
            <Tilt className="hidden lg:block lg:col-span-1 h-full" tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden transition-all flex flex-col justify-center text-left">
                <AnimatePresence mode='wait'>
                  {activeField ? (
                    <motion.div key={activeField} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                          {helpData[activeField].icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{helpData[activeField].title}</h3>
                      </div>

                      <div className="mb-6">
                        <p className="text-slate-300 text-lg leading-relaxed">{helpData[activeField].definition}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-lg">
                          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <Target size={12} /> Use Case
                          </h4>
                          <p className="text-sm text-indigo-100">{helpData[activeField].useCase}</p>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
                          <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <Lightbulb size={12} /> How to Use It
                          </h4>
                          <p className="text-sm text-purple-100">{helpData[activeField].howToUse}</p>
                        </div>
                      </div>

                    </motion.div>
                  ) : (
                    <div className="opacity-50 text-center">
                      <Info size={48} className="mb-4 text-slate-500 mx-auto" />
                      <h3 className="text-xl font-bold mb-2">System Ready</h3>
                      <p className="text-sm">Hover over inputs to see Use Cases & Instructions.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </Tilt>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {response && (
          <motion.div ref={resultRef} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="pb-20 px-6">
            <div className="max-w-5xl mx-auto bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#020617] p-4 flex justify-between items-center border-b border-white/10">
                <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-green-500" /></div>
                <button onClick={() => navigator.clipboard.writeText(response)} className="text-slate-400 hover:text-white"><Copy size={16} /></button>
              </div>
              <div className="p-10 prose prose-invert max-w-none prose-headings:text-indigo-300"><Typewriter text={response} /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;