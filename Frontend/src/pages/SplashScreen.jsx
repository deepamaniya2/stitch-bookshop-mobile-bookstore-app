import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      onClick={() => navigate('/onboarding')}
      className="bg-background min-h-screen w-full flex flex-col items-center justify-center overflow-hidden relative cursor-pointer select-none"
    >
      {/* Decorative background elements (subtle warm minimalism) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-surface-container-high rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-tertiary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      </div>

      {/* Main Container */}
      <main className="w-full flex flex-col items-center justify-center px-margin-mobile relative z-10 fade-in-up max-w-md">
        {/* Logo Area */}
        <div className="flex flex-col items-center justify-center mb-8">
          <span
            className="material-symbols-outlined text-primary-container fill mb-2 animate-bounce"
            style={{ fontSize: '80px', fontVariationSettings: "'FILL' 1" }}
          >
            menu_book
          </span>
          <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight text-center font-extrabold">
            BookStop
          </h1>
          <p className="font-body-md text-sm text-text-secondary mt-1">
            Your Aesthetic Literary Haven
          </p>
        </div>

        {/* Illustration Area */}
        <div className="w-64 h-64 md:w-80 md:h-80 relative mb-12">
          <img
            className="w-full h-full object-contain drop-shadow-md transition-transform duration-700 hover:scale-105"
            alt="Stacked books illustration"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAysZLk2f6afREKKRry5_heDSkO9aOvdUMSwxdb6JT-TELVGcvMoj2gagK3FHXuRCa3M6cl2vCAHGMe8hz21Dw9VeSO1D9B4NPwwdpPqxzzDuWhuRr9o_2SIhVRYwBVmp5lWdrxpk0Q6K9tXr9oG7QMjV8KiOw_Rwa5auBLDckuiRivQ4KAVBrVanrGF4npcldgpSLX4afOZlHaICnjL6k5I_SxAlHwhozbTZm40eI6SN8EZjfs078_"
          />
        </div>

        {/* Loading Indicator */}
        <div className="flex space-x-2 items-center justify-center">
          <div className="w-3 h-3 bg-primary-container rounded-full loader-dot"></div>
          <div className="w-3 h-3 bg-primary-container rounded-full loader-dot"></div>
          <div className="w-3 h-3 bg-primary-container rounded-full loader-dot"></div>
        </div>

        <span className="text-xs text-text-secondary/70 mt-6 tracking-wider uppercase">
          Tap anywhere to continue
        </span>
      </main>
    </div>
  );
};
