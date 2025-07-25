import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Calendar,
  ArrowDown,
  Star,
  CheckCircle,
  Users,
  Award,
  Target,
  Zap,
  Shield,
  Flame,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BUTTON_STYLES,
  TEXT_STYLES,
  LAYOUT_STYLES,
} from "../../constants/styles";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const buttonsRef = useRef(null);
  const trustRef = useRef(null);
  const statsRef = useRef(null);
  const backgroundRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();
    const currentHeroRef = heroRef.current;

    // Mouse tracking for interactive background
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Scroll tracking to hide scroll indicator
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollIndicator(scrollY < 100); // Hide after scrolling 100px
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial setup - hide elements
    gsap.set(
      [
        titleRef.current,
        subtitleRef.current,
        badgeRef.current,
        buttonsRef.current,
        trustRef.current,
        statsRef.current,
        scrollIndicatorRef.current,
      ],
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      }
    );

    // Enhanced entrance animations
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
    })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.4)",
        },
        "-=0.6"
      )
      .to(
        statsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        trustRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      );

    // Enhanced floating animations
    setTimeout(() => {
      gsap.utils.toArray(".floating-element").forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: -30 - index * 5,
            rotation: 5 + index * 2,
            scale: 1.1,
            duration: 4 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
          });
        }
      });
    }, 500);

    // Interactive background animation
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: "200% 200%",
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }

    // Enhanced parallax effects
    if (currentHeroRef) {
      gsap.to(".parallax-slow", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: currentHeroRef,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".parallax-fast", {
        yPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: currentHeroRef,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(".floating-element");
      gsap.killTweensOf(".parallax-slow");
      gsap.killTweensOf(".parallax-fast");
      if (currentHeroRef) gsap.killTweensOf(currentHeroRef);
    };
  }, []);

  const trustIndicators = [
    { icon: CheckCircle, text: "BCCI Certified", color: "text-[#FFD600]" },
    { icon: Trophy, text: "Award Winning", color: "text-[#E63946]" },
    { icon: Star, text: "500+ Students", color: "text-[#4FC3F7]" },
  ];

  const stats = [
    { number: "500+", label: "Students Trained", icon: Users },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Success Rate", icon: Target },
  ];

  return (
    <section
      ref={heroRef}
      className="relative mt-20 sm:mt-25 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white"
    >
      {/* Mobile-Optimized Background System */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero-specific subtle pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.03)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(5,150,105,0.02)_0%,transparent_50%)]"></div>
        </div>

        {/* Mobile-optimized grid pattern */}
        <div className="absolute inset-0 opacity-[0.01] sm:opacity-[0.015]">
          <div className="h-full w-full bg-[linear-gradient(45deg,#D97706_1px,transparent_1px),linear-gradient(-45deg,#059669_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:6rem_6rem]"></div>
        </div>

        {/* Mobile-optimized floating elements */}
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-40 sm:w-60 h-40 sm:h-60 bg-gradient-to-br from-amber-400/4 sm:from-amber-400/6 to-orange-400/4 sm:to-orange-400/6 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 sm:bottom-32 right-20 sm:right-32 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-green-400/3 sm:from-green-400/5 to-emerald-400/3 sm:to-emerald-400/5 rounded-full blur-2xl sm:blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div className="absolute top-1/3 left-1/3 w-32 sm:w-44 h-32 sm:h-44 bg-gradient-to-br from-red-400/2 sm:from-red-400/4 to-pink-400/2 sm:to-pink-400/4 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 sm:w-36 h-24 sm:h-36 bg-gradient-to-br from-gray-300/4 sm:from-gray-300/8 to-slate-300/4 sm:to-slate-300/8 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl rotate-12"></div>

        {/* Mobile-optimized accent lines */}
        <div className="absolute top-0 left-1/5 w-px h-full bg-gradient-to-b from-transparent via-amber-200/20 sm:via-amber-200/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-200/20 sm:via-green-200/30 to-transparent"></div>
        <div className="absolute left-0 top-2/5 h-px w-full bg-gradient-to-r from-transparent via-red-200/20 sm:via-red-200/30 to-transparent"></div>
        <div className="absolute right-0 bottom-1/3 h-px w-2/3 bg-gradient-to-l from-transparent via-gray-200/20 sm:via-gray-200/30 to-transparent"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl sm:max-w-4xl md:max-w-6xl mx-auto">
          {/* Enhanced Interactive Hero Badge */}
          <div
            ref={badgeRef}
            className="magic-hover inline-flex items-center px-4 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 mb-8 sm:mb-12 md:mb-16 relative group cursor-pointer transition-all duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-gray-50/95 to-white/98 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-100/50 sm:border-2 group-hover:shadow-3xl group-hover:shadow-amber-200/30 transition-all duration-700"></div>
            
            {/* Interactive glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-orange-400/0 to-red-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/10 group-hover:to-red-400/10 rounded-2xl sm:rounded-3xl transition-all duration-700"></div>
            
            {/* Magnetic hover effect background */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse shadow-lg group-hover:scale-125 group-hover:shadow-green-400/50 transition-all duration-500"></div>
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse group-hover:scale-125 group-hover:shadow-amber-400/50 transition-all duration-500"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-gray-800 tracking-wide sm:tracking-wider uppercase group-hover:text-gray-900 transition-colors duration-500">
                🏏 West Bengal's Premier Academy
              </span>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse group-hover:scale-125 group-hover:shadow-red-400/50 transition-all duration-500"
                  style={{ animationDelay: "0.6s" }}
                ></div>
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse group-hover:scale-125 group-hover:shadow-amber-400/50 transition-all duration-500"
                  style={{ animationDelay: "0.9s" }}
                ></div>
              </div>
            </div>
            
            {/* Floating particles on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-2 left-4 w-1 h-1 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute top-4 right-6 w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-3 left-8 w-1 h-1 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-2 right-4 w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
            </div>
          </div>

          {/* Enhanced Interactive Typography */}
          <div ref={titleRef} className="mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 md:mb-10 leading-tight sm:leading-none tracking-tight">
              <span className="group block text-gray-900 mb-3 sm:mb-4 md:mb-6 drop-shadow-sm hover:drop-shadow-lg transition-all duration-700 cursor-default magic-hover">
                <span className="inline-block transition-all duration-700 group-hover:scale-105 group-hover:text-gray-800">Master The</span>
              </span>
              <span className="group block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 filter drop-shadow-lg hover:drop-shadow-2xl transition-all duration-700 cursor-default magic-hover relative">
                <span className="inline-block transition-all duration-700 group-hover:scale-105 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text group-hover:from-amber-400 group-hover:via-orange-400 group-hover:to-red-400">Art of Cricket</span>
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-700"></div>
              </span>
              <span className="group block text-gray-800 text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl hover:text-gray-700 transition-all duration-700 cursor-default magic-hover">
                <span className="inline-block transition-all duration-700 group-hover:scale-105">Excellence</span>
              </span>
            </h1>
          </div>

          {/* Mobile-Optimized Hero Subtitle */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 leading-relaxed font-medium sm:font-semibold max-w-4xl sm:max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0"
          >
            Where passion meets precision. Join
            <span className="text-amber-600 font-black">
              {" "}
              West Bengal's most elite
            </span>{" "}
            cricket academy with
            <span className="text-green-600 font-black">
              {" "}
              15+ years of proven excellence
            </span>{" "}
            and
            <span className="text-red-600 font-black">
              {" "}
              500+ champion cricketers
            </span>
          </p>

          {/* Enhanced Interactive Stats Cards */}
          <div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20 max-w-4xl sm:max-w-5xl mx-auto px-4 sm:px-0"
          >
            {[
              {
                number: "500+",
                label: "Champions Created",
                icon: Trophy,
                color: "from-amber-500 to-orange-600",
                hoverColor: "from-amber-400 to-orange-500",
                accentColor: "amber"
              },
              {
                number: "15+",
                label: "Years of Excellence",
                icon: Award,
                color: "from-green-500 to-emerald-600",
                hoverColor: "from-green-400 to-emerald-500",
                accentColor: "green"
              },
              {
                number: "98%",
                label: "Success Rate",
                icon: Target,
                color: "from-red-500 to-pink-600",
                hoverColor: "from-red-400 to-pink-500",
                accentColor: "red"
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="magic-hover group relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-700 border border-gray-100/50 sm:border-2 hover:border-gray-200/80 hover:scale-105 cursor-pointer overflow-hidden"
              >
                {/* Enhanced background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.hoverColor} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-2xl sm:rounded-3xl`}></div>
                
                {/* Interactive particle effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className={`absolute top-2 left-4 w-1 h-1 bg-${stat.accentColor}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                  <div className={`absolute top-6 right-3 w-1 h-1 bg-${stat.accentColor}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.3s' }}></div>
                  <div className={`absolute bottom-8 left-2 w-1 h-1 bg-${stat.accentColor}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.5s' }}></div>
                  <div className={`absolute bottom-3 right-5 w-1 h-1 bg-${stat.accentColor}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.7s' }}></div>
                </div>
                
                {/* Floating shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-700 rounded-2xl sm:rounded-3xl"></div>
                
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} group-hover:bg-gradient-to-br group-hover:${stat.hoverColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 md:mb-8 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl relative z-10`}
                >
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-30 group-hover:scale-150 blur-md transition-all duration-500`}></div>
                </div>
                
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-2 sm:mb-3 md:mb-4 group-hover:scale-105 group-hover:text-gray-900 transition-all duration-500 relative z-10">
                  <span className="inline-block group-hover:animate-pulse">{stat.number}</span>
                </div>
                
                <div className="text-gray-600 font-bold text-sm sm:text-base md:text-lg group-hover:text-gray-700 transition-colors duration-500 relative z-10">
                  {stat.label}
                </div>

                {/* Enhanced progress bar with animation */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-2xl sm:rounded-b-3xl`}
                ></div>
                
                {/* Subtle pulsing border */}
                <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-${stat.accentColor}-400/0 group-hover:border-${stat.accentColor}-400/20 transition-all duration-700`}></div>
              </div>
            ))}
          </div>

          {/* Enhanced Interactive Action Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0"
          >
            <Link
              to="/programs"
              className="magic-hover group relative inline-flex items-center justify-center px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black text-lg sm:text-xl md:text-2xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-700 hover:scale-105 sm:hover:scale-110 transform overflow-hidden"
            >
              {/* Enhanced background gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Ripple effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 group-hover:animate-ripple transition-opacity duration-700 rounded-2xl sm:rounded-3xl"></div>
              
              {/* Magnetic glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-700"></div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-2 left-6 w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute bottom-3 left-12 w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-2 right-6 w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
              </div>
              
              <Trophy className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-3 sm:mr-4 md:mr-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-500 relative z-10" />
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-500">Begin Your Legacy</span>
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ml-3 sm:ml-4 md:ml-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-500 relative z-10" />
            </Link>

            <a
              href="#contact"
              className="magic-hover group relative inline-flex items-center justify-center px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 bg-white/95 backdrop-blur-sm border-2 sm:border-3 md:border-4 border-gray-300 text-gray-800 font-black text-lg sm:text-xl md:text-2xl rounded-2xl sm:rounded-3xl hover:bg-gray-50 transition-all duration-700 shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transform hover:scale-105 sm:hover:scale-110 overflow-hidden"
            >
              {/* Enhanced background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Subtle border glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-gray-400/0 group-hover:border-gray-400/30 transition-all duration-700"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-700 rounded-2xl sm:rounded-3xl"></div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-2 left-6 w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="absolute top-4 right-8 w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute bottom-3 left-12 w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-2 right-6 w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
              </div>
              
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-3 sm:mr-4 md:mr-5 group-hover:scale-125 transition-transform duration-500 relative z-10" />
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-500">Free Trial Session</span>
            </a>
          </div>

          {/* Enhanced Interactive Trust Indicators */}
          <div
            ref={trustRef}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0"
          >
            {[
              {
                icon: CheckCircle,
                text: "BCCI CERTIFIED",
                color: "from-green-500 to-emerald-600",
                hoverColor: "from-green-400 to-emerald-500",
                accentColor: "green",
              },
              {
                icon: Trophy,
                text: "AWARD WINNING",
                color: "from-amber-500 to-orange-600",
                hoverColor: "from-amber-400 to-orange-500",
                accentColor: "amber",
              },
              {
                icon: Star,
                text: "500+ CHAMPIONS",
                color: "from-red-500 to-pink-600",
                hoverColor: "from-red-400 to-pink-500",
                accentColor: "red",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="magic-hover group flex items-center justify-center sm:justify-start px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-700 border border-gray-100/50 sm:border-2 hover:border-gray-200/80 hover:scale-105 w-full sm:w-auto cursor-pointer relative overflow-hidden"
              >
                {/* Enhanced background glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.hoverColor} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-2xl sm:rounded-3xl`}></div>
                
                {/* Magnetic shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-700 rounded-2xl sm:rounded-3xl"></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className={`absolute top-2 left-4 w-1 h-1 bg-${item.accentColor}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                  <div className={`absolute top-4 right-6 w-1 h-1 bg-${item.accentColor}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.3s' }}></div>
                  <div className={`absolute bottom-3 left-8 w-1 h-1 bg-${item.accentColor}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.5s' }}></div>
                  <div className={`absolute bottom-2 right-4 w-1 h-1 bg-${item.accentColor}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.7s' }}></div>
                </div>
                
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${item.color} group-hover:bg-gradient-to-br group-hover:${item.hoverColor} rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 md:mr-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl relative z-10`}
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-30 group-hover:scale-150 blur-md transition-all duration-500`}></div>
                </div>
                
                <span className="text-gray-800 font-black text-sm sm:text-base md:text-lg tracking-wider group-hover:text-gray-900 group-hover:scale-105 transition-all duration-500 relative z-10">
                  {item.text}
                </span>
                
                {/* Enhanced border accent */}
                <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-${item.accentColor}-400/0 group-hover:border-${item.accentColor}-400/20 transition-all duration-700`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Scroll Indicator */}
      {showScrollIndicator && (
        <div
          ref={scrollIndicatorRef}
          className="fixed bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-[50] pointer-events-none"
        >
          <div className="relative group">
            <div className="flex flex-col items-center bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 shadow-lg sm:shadow-xl md:shadow-2xl border border-gray-100 sm:border-2 animate-bounce">
              <span className="text-gray-800 text-sm sm:text-base md:text-lg font-black tracking-wider mb-2 sm:mb-3 md:mb-4 uppercase">
                Discover Excellence
              </span>
              <ArrowDown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-600 animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-red-400/30 rounded-2xl sm:rounded-3xl blur-xl opacity-70 -z-10 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Mobile-Optimized Decorative Elements */}
      <div className="absolute top-1/2 left-2 sm:left-4 md:left-8 w-1 sm:w-2 h-20 sm:h-30 md:h-40 bg-gradient-to-b from-transparent via-amber-400/30 sm:via-amber-400/50 to-transparent rounded-full"></div>
      <div className="absolute top-1/2 right-2 sm:right-4 md:right-8 w-1 sm:w-2 h-20 sm:h-30 md:h-40 bg-gradient-to-b from-transparent via-green-400/30 sm:via-green-400/50 to-transparent rounded-full"></div>

      {/* Mobile-optimized cricket-themed decorative icons */}
      <div className="absolute bottom-16 sm:bottom-20 md:bottom-32 left-16 sm:left-20 md:left-32 opacity-5 sm:opacity-10">
        <div className="text-4xl sm:text-6xl md:text-9xl filter grayscale">
          🏏
        </div>
      </div>
      <div className="absolute top-16 sm:top-20 md:top-32 right-16 sm:right-20 md:right-32 opacity-5 sm:opacity-10">
        <div className="text-3xl sm:text-5xl md:text-7xl filter grayscale">
          🏆
        </div>
      </div>

      {/* Mobile-optimized corner accent elements */}
      <div className="absolute top-5 sm:top-8 md:top-10 left-5 sm:left-8 md:left-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-l-2 sm:border-l-3 md:border-l-4 border-t-2 sm:border-t-3 md:border-t-4 border-amber-400/30 sm:border-amber-400/40 rounded-tl-2xl sm:rounded-tl-3xl"></div>
      <div className="absolute top-5 sm:top-8 md:top-10 right-5 sm:right-8 md:right-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-r-2 sm:border-r-3 md:border-r-4 border-t-2 sm:border-t-3 md:border-t-4 border-green-400/30 sm:border-green-400/40 rounded-tr-2xl sm:rounded-tr-3xl"></div>
      <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 left-5 sm:left-8 md:left-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-l-2 sm:border-l-3 md:border-l-4 border-b-2 sm:border-b-3 md:border-b-4 border-red-400/30 sm:border-red-400/40 rounded-bl-2xl sm:rounded-bl-3xl"></div>
      <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 right-5 sm:right-8 md:right-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-r-2 sm:border-r-3 md:border-r-4 border-b-2 sm:border-b-3 md:border-b-4 border-gray-400/30 sm:border-gray-400/40 rounded-br-2xl sm:rounded-br-3xl"></div>
    </section>
  );
};

export default Hero;
