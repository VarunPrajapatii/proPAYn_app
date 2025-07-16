'use client';

import BackgroundBeams from './BackgroundBeams';
import Image from 'next/image';

export default function Title2() {
  const heading = "Guard your finances with military-grade encryption";
  const description = "Because your peace of mind is priceless. Experience the future of digital payments with ProPAYn - where security meets simplicity in perfect harmony.";

  const images = [
    {
      src: `/gallaryImages/gallary0.png`,
      alt: 'Mobile payment security',
    },
    {
      src: `/gallaryImages/gallary1.png`,
      alt: 'Digital banking interface',
    },
    {
      src: `/gallaryImages/gallary2.png`,
      alt: 'Financial data visualization',
    },
    {
      src: `/gallaryImages/gallary3.png`,
      alt: 'Smartphone payment app',
    },
    {
      src: `/gallaryImages/gallary4.png`,
      alt: 'Digital wallet concept',
    },
    {
      src: `/gallaryImages/gallary5.png`,
      alt: 'Online payment security',
    },
    {
      src: `/gallaryImages/gallary6.png`,
      alt: 'Fintech innovation',
    },
    {
      src: `/gallaryImages/gallary7.png`,
      alt: 'Cryptocurrency trading',
    },
    {
      src: `/gallaryImages/gallary8.png`,
      alt: 'Mobile payment solutions',
    },
    {
      src: `/gallaryImages/gallary9.png`,
      alt: 'Digital banking security',
    },
  ];

  const leftColumnImages = images.filter((_, index) => index % 2 === 0);
  const rightColumnImages = images.filter((_, index) => index % 2 === 1);

  return (
    <div className="scroll-smooth h-[120vh] w-full relative flex flex-col items-center justify-center antialiased overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#1a082f] dark:to-black">
      <header className="z-20 grid grid-cols-1 gap-y-16 pt-16 md:grid-flow-row md:pt-24 lg:grid-flow-col lg:grid-cols-2 lg:items-center lg:pt-0 h-full w-full max-w-7xl mx-auto px-6">
        <div className="max-w-[42rem] justify-self-start lg:justify-self-end lg:pr-12">
          <div className="space-y-8">
            <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 leading-tight">
              {heading}
            </h1>
            <p className="font-nunito text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {description}
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                <span className="font-nunito text-sm md:text-base text-slate-600 dark:text-slate-300">UPI & Card Integration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="font-nunito text-sm md:text-base text-slate-600 dark:text-slate-300">Instant P2P Transfers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="font-nunito text-sm md:text-base text-slate-600 dark:text-slate-300">In-house Gateway</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
                <span className="font-nunito text-sm md:text-base text-slate-600 dark:text-slate-300">Bank-grade Security</span>
              </div>
            </div>
            
            <div className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-neutral-100">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
                Spending it?
              </span>
              <br />
              <span className="text-slate-800 dark:text-neutral-100">
                ProPAYn it!
              </span>
            </div>
          </div>
        </div>
        
        <div className="h-[35rem] overflow-hidden lg:h-screen lg:pl-8">
          <div className="grid w-full grid-cols-2 gap-x-6">
            {/* Left Column */}
            <div className="-mt-[120%] grid size-full animate-loop-vertically columns-2 grid-cols-1 gap-6 self-center">
              {leftColumnImages.map((image, index) => (
                <div key={`left-${index}`} className="grid size-full grid-cols-1 gap-6">
                  <div className="relative w-full pt-[120%] rounded-2xl overflow-hidden shadow-xl dark:shadow-purple-500/20 transition-transform duration-300 hover:scale-105">
                    <Image
                      className="absolute inset-0 size-full object-cover"
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading={index < 4 ? "eager" : "lazy"}
                      priority={index < 2}
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:from-black/50" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Column */}
            <div className="grid size-full animate-loop-vertically grid-cols-1 gap-6">
              {rightColumnImages.map((image, index) => (
                <div key={`right-${index}`} className="grid size-full grid-cols-1 gap-6">
                  <div className="relative w-full pt-[120%] rounded-2xl overflow-hidden shadow-xl dark:shadow-blue-500/20 transition-transform duration-300 hover:scale-105">
                    <Image
                      className="absolute inset-0 size-full object-cover"
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading={index < 4 ? "eager" : "lazy"}
                      priority={index < 2}
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:from-black/50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
      <BackgroundBeams />
    </div>
  );
}