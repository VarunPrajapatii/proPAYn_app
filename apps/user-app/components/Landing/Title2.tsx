'use client';

import BackgroundBeams from './BackgroundBeams';
import Image from 'next/image';

export default function Title2() {
  const heading = "Guard your finances with military-grade encryption";
  const description = "Because your peace of mind is priceless. Experience the future of digital payments with ProPAYn - where security meets simplicity in perfect harmony.";

  // Payment and finance related images with different aspect ratios to avoid duplication
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
      alt: 'Mobile payment security',
    },
    {
      src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
      alt: 'Digital banking interface',
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
      alt: 'Financial data visualization',
    },
    {
      src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
      alt: 'Smartphone payment app',
    },
    {
      src: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
      alt: 'Digital wallet concept',
    },
    {
      src: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
      alt: 'Online payment security',
    },
    {
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
      alt: 'Fintech innovation',
    },
    {
      src: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
      alt: 'Cryptocurrency trading',
    },
  ];

  // Split images into two different arrays to avoid duplication
  const leftColumnImages = images.filter((_, index) => index % 2 === 0);
  const rightColumnImages = images.filter((_, index) => index % 2 === 1);

  return (
    <div className="h-[110vh] w-full relative flex flex-col items-center justify-center antialiased overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black">
      <header className="z-20 grid grid-cols-1 gap-y-16 pt-16 md:grid-flow-row md:pt-24 lg:grid-flow-col lg:grid-cols-2 lg:items-center lg:pt-0 h-full w-full">
        <div className="mx-[5%] max-w-[40rem] justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
          <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 leading-tight">
            {heading}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {description}
          </p>
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-neutral-100">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
              Spending it?
            </span>
            <br />
            <span className="text-slate-800 dark:text-neutral-100">
              ProPAYn it!
            </span>
          </div>
        </div>
        
        <div className="h-[30rem] overflow-hidden pl-[5vw] pr-[5vw] md:h-[40rem] lg:h-screen lg:pl-0">
          <div className="grid w-full grid-cols-2 gap-x-4">
            {/* Left Column */}
            <div className="-mt-[120%] grid size-full animate-loop-vertically columns-2 grid-cols-1 gap-4 self-center">
              {leftColumnImages.map((image, index) => (
                <div key={`left-${index}`} className="grid size-full grid-cols-1 gap-4">
                  <div className="relative w-full pt-[120%] rounded-xl overflow-hidden shadow-lg dark:shadow-purple-500/10">
                    <Image
                      className="absolute inset-0 size-full object-cover transition-transform duration-300 hover:scale-105"
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Column */}
            <div className="grid size-full animate-loop-vertically grid-cols-1 gap-4">
              {rightColumnImages.map((image, index) => (
                <div key={`right-${index}`} className="grid size-full grid-cols-1 gap-4">
                  <div className="relative w-full pt-[120%] rounded-xl overflow-hidden shadow-lg dark:shadow-blue-500/10">
                    <Image
                      className="absolute inset-0 size-full object-cover transition-transform duration-300 hover:scale-105"
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40" />
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