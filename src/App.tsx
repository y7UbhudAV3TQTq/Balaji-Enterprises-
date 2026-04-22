import React, { useState, useEffect } from 'react';
import { 
  FireExtinguisher, 
  ShieldCheck, 
  Clock, 
  Users, 
  IndianRupee, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  ChevronUp, 
  Star, 
  CheckCircle2, 
  AlertTriangle,
  Flame,
  Construction,
  Info,
  LogOut,
  Bell,
  Eye,
  Stethoscope,
  ShowerHead as Shower
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import ProductsPage from './components/ProductsPage';

// --- Components ---

const Navbar = ({ onNavigate, currentView }: { onNavigate: (v: string) => void; currentView: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', view: 'home' },
    { name: 'Products', view: 'products' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    if (link.view) {
      e.preventDefault();
      onNavigate(link.view);
      window.scrollTo(0, 0);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || currentView === 'products' ? 'glass-morphism py-3 shadow-premium' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="flex items-center active:scale-95 transition-transform group">
          <div className="overflow-hidden">
            <img 
              src="https://uploads.onecompiler.io/43dtnu92q/43dtqfeb8/Balaji%20enterprisess%20invoce%20logo.png" 
              alt="Balaji Enterprises" 
              className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
            />
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.view ? (
              <button 
                key={link.name}
                onClick={(e) => handleLinkClick(e, link)}
                className={`group relative font-semibold text-sm tracking-wide transition-colors ${isScrolled || currentView === 'products' ? (currentView === link.view ? 'text-primary' : 'text-secondary/80 hover:text-primary') : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
                {currentView === link.view && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" 
                  />
                )}
              </button>
            ) : (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-semibold text-sm tracking-wide transition-colors ${isScrolled || currentView === 'products' ? 'text-secondary/80 hover:text-primary' : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
              </a>
            )
          ))}
          <a 
            href="#contact" 
            className="bg-primary text-white px-5 py-2.5 rounded-full font-bold text-sm btn-hover shadow-lg shadow-primary/20"
          >
            FREE CONSULTATION
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white bg-primary p-2 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-morphism border-b overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={(e) => link.view ? handleLinkClick(e, link) : (setMobileMenuOpen(false))}
                  className="text-left font-bold text-secondary hover:text-primary transition-colors uppercase tracking-widest text-[10px]"
                >
                  {link.view ? link.name : <a href={link.href}>{link.name}</a>}
                </button>
              ))}
              <a 
                href="#contact" 
                className="bg-primary text-white text-center py-3 rounded-xl font-bold shadow-lg text-[10px] tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                CALL NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const EmergencyBanner = () => (
  <div className="bg-primary text-white py-2 overflow-hidden relative">
    <div className="container mx-auto px-4 text-center">
      <motion.p 
        animate={{ x: [10, -10, 10] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-xs md:text-sm font-bold tracking-widest flex items-center justify-center gap-2"
      >
        <AlertTriangle className="w-4 h-4" /> 
        EMERGENCY FIRE SAFETY SERVICES 24/7 • CALL NOW: +91 74116 16167
      </motion.p>
    </div>
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
  </div>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 300]);
  const yContent = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-secondary">
      {/* Parallax Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1611159063981-b8c8c4301869?auto=format&fit=crop&w=1920&q=80" 
          alt="Fire emergency background" 
          className="w-full h-full object-cover scale-110 opacity-60"
        />
      </motion.div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div style={{ y: yContent }} className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-sm shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">ISO 9001:2015 CERTIFIED</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-display font-black text-white leading-[0.95] tracking-tight mb-8"
          >
            THE ULTIMATE <br/> <span className="text-primary italic">SHIELD</span> FOR LIFE.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed font-medium"
          >
            Balaji Enterprises delivers mission-critical fire safety systems and industrial signage for Bangalore's high-stakes environments. Professional engineering meets rapid response.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a href="#products-preview" className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest btn-hover shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-95 transition-transform">
              EXPLORE ARMORY <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95">
              REQUEST AUDIT <ShieldCheck className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Scroll Down</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Protection Coverage', value: '1M', sub: 'Sq. Ft', icon: ShieldCheck },
    { label: 'Response Units', value: '24', sub: 'Stations', icon: Clock },
    { label: 'High-Value Clients', value: '500+', sub: 'Enterprises', icon: Users },
    { label: 'Safety Compliance', value: '100%', sub: 'Global Stds', icon: Star },
  ];

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-3 scale-95 group-hover:rotate-0 group-hover:scale-100 transition-all duration-500" />
              <div className="relative p-10 text-center flex flex-col items-center">
                <div className="bg-white p-6 rounded-[2rem] shadow-premium mb-6 group-hover:scale-110 transition-transform duration-500 animate-float">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <motion.div 
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  className="text-5xl font-display font-black text-secondary tracking-tighter mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">{stat.label}</div>
                <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionHeading = ({ subtitle, title, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-primary font-black tracking-widest text-xs uppercase block mb-3"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-display font-black text-secondary"
    >
      {title}
    </motion.h2>
    <div className={`h-1.5 w-20 bg-primary mt-6 rounded-full ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const About = () => (
  <section id="about" className="py-24 bg-[#f8fafc]">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <SectionHeading 
            subtitle="Who We Are" 
            title="Trusted Protection Since 2015" 
            centered={false}
          />
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Balaji Enterprises has been Bangalore's premier shield against fire hazards for nearly a decade. We combine state-of-the-art technology with deep regulatory expertise to bring you safety solutions that actually work.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'ISI Certified', icon: CheckCircle2 },
              { title: 'Certified Experts', icon: Users },
              { title: 'Best Prices', icon: IndianRupee },
              { title: 'Fast Delivery', icon: Clock },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="text-primary w-5 h-5 flex-shrink-0" />
                <span className="font-bold text-secondary text-sm">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80" 
              alt="Fire safety inspection" 
              className="w-full h-auto"
            />
          </motion.div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-premium border border-gray-100 hidden md:block">
            <div className="text-4xl font-display font-black text-primary">8+</div>
            <div className="text-sm font-bold text-secondary mt-1">YEARS OF<br/>EXCELLENCE</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 bg-secondary">
    <div className="container mx-auto px-6">
      <div className="mb-20 text-center">
        <span className="text-primary font-black tracking-widest text-xs uppercase block mb-3">What We Provide</span>
        <h2 className="text-4xl md:text-5xl font-display font-black text-white">Expert Safety Services</h2>
        <div className="h-1.5 w-20 bg-primary mt-6 rounded-full mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Installation', icon: Construction, desc: 'Professional setup of suppression systems and alarms.' },
          { title: 'Maintenance', icon: Clock, desc: 'Routine audits and equipment testing to ensure peak readiness.' },
          { title: 'Training', icon: Users, desc: 'Live fire drills and safety workshops for your personnel.' },
          { title: 'Audit & Compliance', icon: ShieldCheck, desc: 'Detailed inspections for regulatory & NFO compliance.' },
          { title: 'Emergency Repair', icon: AlertTriangle, desc: '24/7 rapid response for critical safety failures.' },
          { title: 'Consultancy', icon: Info, desc: 'Customized fire protection planning for complex sites.' }
        ].map((service, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white transition-all duration-500 cursor-default"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
              <service.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-display font-bold text-white group-hover:text-secondary mb-4 transition-colors duration-500">{service.title}</h3>
            <p className="text-white/40 group-hover:text-secondary/60 leading-relaxed transition-colors duration-500">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const SignBoards = () => {
  const signs = [
    { cat: 'prohibition', icon: LogOut, name: 'No Smoking', color: 'text-red-500', bg: 'bg-red-50' },
    { cat: 'mandatory', icon: Bell, name: 'Hard Hat Area', color: 'text-blue-500', bg: 'bg-blue-50' },
    { cat: 'warning', icon: AlertTriangle, name: 'High Voltage', color: 'text-amber-500', bg: 'bg-amber-50' },
    { cat: 'safe', icon: Stethoscope, name: 'First Aid', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { cat: 'fire', icon: Flame, name: 'Extinguisher', color: 'text-red-600', bg: 'bg-red-50' },
    { cat: 'evacuation', icon: ArrowRight, name: 'Fire Exit', color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Visual Safety" title="Signage Categories" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {signs.map((sign, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-3xl ${sign.bg} border border-transparent hover:border-gray-200 transition-all text-center`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm ${sign.color}`}>
                <sign.icon className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter mb-1">{sign.cat}</p>
              <h4 className="font-bold text-secondary text-sm">{sign.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 bg-[#f8fafc]">
    <div className="container mx-auto px-6">
      <div className="glass-morphism bg-white rounded-[2.5rem] overflow-hidden shadow-premium flex flex-col lg:flex-row">
        {/* Contact Info */}
        <div className="lg:w-2/5 bg-secondary p-12 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-black mb-8">Contact Our Team</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-1">Our Base</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    1st Main, Nageshi Mahalakshmi Temple Road, Vinayakanagara, Ramohalli Post, Bangalore - 560074
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-1">Call Us</h4>
                  <p className="text-lg font-bold">+91 74116 16167</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-1">Email Express</h4>
                  <p className="text-sm font-bold break-all">balajienterprises199415@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/10">
              <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-4">Follow Readiness</h4>
              <div className="flex gap-4">
                {['FB', 'IG', 'WA'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs hover:bg-primary transition-colors cursor-pointer">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full"></div>
        </div>

        {/* Form */}
        <div className="lg:w-3/5 p-12">
          <h3 className="text-2xl font-display font-black text-secondary mb-8">Send a Quick Message</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Full Name</label>
                <input type="text" className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-semibold outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-semibold outline-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">Enquiry Type</label>
              <select className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-semibold outline-none appearance-none">
                <option>Product Inquiry</option>
                <option>Service Request</option>
                <option>Safety Audit</option>
                <option>Emergency Service</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400">Message</label>
              <textarea rows={4} className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-semibold outline-none"></textarea>
            </div>
            <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs btn-hover shadow-xl shadow-primary/30">
              Deliver Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-secondary text-white pt-24 pb-12">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center mb-8">
            <div className="overflow-hidden">
              <img 
                src="https://uploads.onecompiler.io/43dtnu92q/43dtqfeb8/Balaji%20enterprisess%20invoce%20logo.png" 
                alt="Balaji Enterprises" 
                className="h-16 md:h-20 w-auto object-contain drop-shadow-md"
              />
            </div>
          </div>
          <p className="text-white/40 leading-relaxed text-sm">
            Bangalore's premium dedicated fire safety wing. Protecting high-value assets with professional grit since 2015.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-bold mb-6 text-primary tracking-widest text-xs uppercase">Quick Access</h4>
          <div className="flex flex-col gap-4 text-sm font-semibold text-white/50">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#products" className="hover:text-primary transition-colors">Products</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#about" className="hover:text-primary transition-colors">About Us</a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 text-primary tracking-widest text-xs uppercase">Core Services</h4>
          <div className="flex flex-col gap-4 text-sm font-semibold text-white/50">
            <p>Maintenance (AMC)</p>
            <p>Certified Installation</p>
            <p>Personnel Training</p>
            <p>Compliance Audit</p>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 text-primary tracking-widest text-xs uppercase">Newsletter</h4>
          <p className="text-white/40 text-xs mb-4 uppercase font-black tracking-tight">Stay Updated on Safety Standards</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-white/5 border-0 rounded-lg p-2 text-xs flex-grow outline-none focus:ring-1 focus:ring-primary/40" />
            <button className="bg-primary p-2 rounded-lg"><ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20">
        <p>© 2026 Balaji Enterprises Co. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors tracking-tighter">Designed with <Flame className="inline w-2 h-2 text-primary" /> in BLR</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState('home');
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative selection:bg-primary/30 selection:text-secondary">
      <EmergencyBanner />
      <Navbar onNavigate={setView} currentView={view} />
      
      <main className="overflow-x-hidden">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
            >
              <Hero />
              <Stats />
              <About />
              <section id="products-preview" className="py-32 bg-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 blur-[100px] rounded-full" />

                <div className="container mx-auto px-6 text-center relative z-10">
                  <SectionHeading subtitle="Hardware Preview" title="Advanced Safety Armory" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
                    {[
                      { id: 'ext-1', name: 'Clean Agent - 6 Kg', cat: 'Extinguisher', img: 'https://uploads.onecompiler.io/43dtnu92q/43pnhyp7f/clean%20agent%20stored%20pressure%20fire%20extinguisher%206%20kg.png' },
                      { id: 'ext-35', name: 'Trolley Mounted CO2', cat: 'Industrial', img: 'https://uploads.onecompiler.io/43dtnu92q/43pnhyp7f/trolley%20mounted%20co2%20type%20fire%20extinguisher%2022.5kg.jpg' },
                      { id: 'sign-glow-exit', name: 'Glow Emergency Sign', cat: 'Visual Safety', img: 'https://uploads.onecompiler.io/43dtnu92q/43pnhyp7f/Photoluminescent%20Fire%20Exit%20Sign%20LARGE%20-%20Man%20on%20Left%20-%20600%20x%20150Hmm%20-%20Self%20Adhesive%20Rigid%20Plastic%20-%20%5BAS-PH14-SARP%5D.jpeg' }
                    ].map((p, i) => (
                      <motion.div 
                        key={p.id} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        viewport={{ once: true, margin: "-100px" }}
                        whileHover={{ y: -10, rotateY: 5 }}
                        className="group p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 perspective-1000"
                      >
                        <div className="h-56 flex items-center justify-center mb-8 relative">
                          <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 blur-2xl" />
                          <img src={p.img} alt={p.name} className="h-full object-contain relative z-10 animate-float transition-all group-hover:scale-110" />
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 block">{p.cat}</span>
                        <h4 className="text-xl font-display font-black text-secondary tracking-tight">{p.name}</h4>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24"
                  >
                    <button 
                      onClick={() => { setView('products'); window.scrollTo(0,0); }}
                      className="group inline-flex items-center gap-4 bg-secondary text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest btn-hover shadow-2xl shadow-secondary/40"
                    >
                      EXPLORE FULL INVENTORY 
                      <div className="bg-primary p-1.5 rounded-full group-hover:translate-x-2 transition-transform">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  </motion.div>
                </div>
              </section>
              <Services />
              <SignBoards />
              <Contact />
            </motion.div>
          ) : view === 'products' ? (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
            >
              <ProductsPage onBack={() => setView('home')} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Back to Top */}
      <AnimatePresence>
        {showToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-xl shadow-2xl z-40 flex items-center justify-center btn-hover"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
