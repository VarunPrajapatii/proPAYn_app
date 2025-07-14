'use client';
import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { useMode } from "@propayn/store/useMode";

interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const BackgroundGradientAnimation: React.FC<BackgroundGradientAnimationProps> = ({
  gradientBackgroundStart,
  gradientBackgroundEnd,
  firstColor,
  secondColor,
  thirdColor,
  pointerColor,
  size = '80%',
  blendingValue = 'soft-light',
  children,
  className = '',
  interactive = true,
  containerClassName = '',
}) => {
  const { isDarkMode } = useMode();
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  // Define color schemes based on dark mode from Jotai store
  const colorSchemes = {
    light: {
      gradientBackgroundStart: gradientBackgroundStart || 'rgb(248, 250, 252)', // slate-50
      gradientBackgroundEnd: gradientBackgroundEnd || 'rgb(241, 245, 249)',   // slate-100
      firstColor: firstColor || '148, 163, 184',                   // slate-400
      secondColor: secondColor || '100, 116, 139',                  // slate-500
      thirdColor: thirdColor || '71, 85, 105',                     // slate-600
      pointerColor: pointerColor || '100, 116, 139',               // slate-500
    },
    dark: {
      gradientBackgroundStart: gradientBackgroundStart || 'rgb(33, 6, 46)', // purple-800
      gradientBackgroundEnd: gradientBackgroundEnd || 'rgb(6, 15, 51)',     // blue-900
      firstColor: firstColor || '18, 113, 255',                  // blue-600
      secondColor: secondColor || '221, 74, 255',                 // purple-500
      thirdColor: thirdColor || '100, 220, 255',                 // sky-400
      pointerColor: pointerColor || '140, 100, 255',               // violet/purple
    }
  };

  const currentScheme = isDarkMode ? colorSchemes.dark : colorSchemes.light;

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }

    move();
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  const styleVars = {
    '--gradient-background-start': currentScheme.gradientBackgroundStart,
    '--gradient-background-end': currentScheme.gradientBackgroundEnd,
    '--first-color': currentScheme.firstColor,
    '--second-color': currentScheme.secondColor,
    '--third-color': currentScheme.thirdColor,
    '--pointer-color': currentScheme.pointerColor,
    '--size': size,
    '--blending-value': blendingValue,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        'h-screen w-[99vw] z-0 relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        containerClassName
      )}
      style={styleVars}
      onMouseMove={handleMouseMove}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn('', className)}>{children}</div>
      <div
        className={cn(
          'gradients-container h-full w-full blur-lg',
          isSafari ? 'blur-2xl' : '[filter:url(#blurMe)_blur(40px)]'
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(40%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center]`,
            `animate-first`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(40%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(40%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-100`
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.7)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -left-1/2 -top-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>
  );
}

export default BackgroundGradientAnimation