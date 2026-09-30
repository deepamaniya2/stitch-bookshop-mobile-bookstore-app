import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Onboarding = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-on-surface antialiased bg-white selection:bg-primary-container selection:text-on-primary-container overflow-hidden relative p-4">
      {/* Decorative subtle background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-surface-container-low rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-surface-container-high rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>

      <main className="w-full max-w-[480px] min-h-[780px] md:h-[820px] flex flex-col bg-white relative z-10 shadow-2xl rounded-3xl border border-surface-variant overflow-hidden justify-between">
        {/* Top App Bar - Simplified for Onboarding */}
        <header className="w-full top-0 flex justify-between items-center px-margin-mobile py-md bg-white z-20">
          <div className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tight">
            BookStop
          </div>
          <button
            onClick={handleFinish}
            className="font-label-md text-label-md text-text-secondary hover:text-primary transition-colors duration-200 px-3 py-2 cursor-pointer"
          >
            Skip
          </button>
        </header>

        {/* Illustration Area (Bento Grid inspired asymmetrical top section) */}
        <div className="flex-1 w-full px-margin-mobile pt-2 pb-6 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="w-full h-full max-h-[420px] relative rounded-DEFAULT overflow-hidden shadow-sm bg-surface-container-low group">
            <img
              alt="Girl reading in cozy aesthetic room"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnTNW6kSq2ahFvWmKTXKwsiALU2may7NCwqzlULCmSEbCb4hB-ZBm7uz7wDOAU-WtBiRSmTwVyd_Ipwh-v3_bTVMXcu7qPGKuzjaX6cxS696f78Jtzi1Iv_rM-2HoZ6Ut3k3hWHJ7MMjXXsUf__lWJC4E1iy43jAVKOwQTzNKm9EoggRB1lj21OxlnqPj7vuv5XWVF4LPtlte792YnKWlg7aSYOQj2_6LMa5FeOdfAiFxGeEnHRgSj"
            />
            {/* Floating decorative star element */}
            <div className="absolute -bottom-2 -right-2 bg-white/85 backdrop-blur-md p-3.5 rounded-full shadow-lg border border-surface-variant">
              <span
                className="material-symbols-outlined text-primary-container text-[30px] fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
            </div>
          </div>
        </div>

        {/* Content & Navigation Bottom Area */}
        <div className="w-full px-margin-mobile pb-10 pt-4 bg-white rounded-t-xl z-20 flex flex-col gap-6">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 items-center">
            <div className="h-2 w-8 rounded-full bg-primary-container transition-all duration-300"></div>
            <div className="h-2 w-2 rounded-full bg-secondary-fixed transition-all duration-300"></div>
            <div className="h-2 w-2 rounded-full bg-secondary-fixed transition-all duration-300"></div>
          </div>

          {/* Typography Content */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-text-primary font-bold">
              Discover thousands of books
            </h1>
            <p className="font-body-md text-body-md text-text-secondary max-w-[90%] mx-auto leading-relaxed">
              Explore a vast, aesthetic literary haven tailored to your tastes. Find your next favorite story in our curated collections.
            </p>
          </div>

          {/* Action Area */}
          <div className="w-full flex justify-center mt-2">
            <button
              onClick={handleFinish}
              className="btn-pulse flex items-center justify-center gap-2 w-full max-w-[240px] py-3.5 bg-primary-container text-white font-label-md text-label-md rounded-full shadow-[0_8px_16px_rgba(255,122,0,0.25)] hover:bg-primary transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer font-semibold"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
