'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import bgSidebarDesktop from '@/public/assets/images/bg-sidebar-desktop.svg';
import bgSidebarMobile from '@/public/assets/images/bg-sidebar-mobile.svg';
import { steps } from '@/constants';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const gotoPrevPage = () => {
    console.log("Prev Page");
    setCurrentStep(prev => prev <= 1 ? prev : --prev);
  }

  const gotoNextPage = () => {
    console.log("Next Page");
    setCurrentStep(prev => prev >= 4 ? prev : ++prev);
  }

  const gotoPage = (index: number) => {
    setCurrentStep(prev => index >= 1 && index <= 4 ? index : prev)
  }

  // Use the matchMedia API to detect screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    // Initial check
    setIsDesktop(mediaQuery.matches);

    // Update state when the window size changes
    const handleResize = () => {
      setIsDesktop(mediaQuery.matches);
    };

    mediaQuery.addListener(handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);
  return (
    <main className="flex h-full relative gap-6">
      <div className='w-72 h-full md:p-11 overflow-hidden rounded-2xl relative'>
        <div className='absolute z-0 top-0 left-0 w-full h-full'>
          <Image
            src={isDesktop ? bgSidebarDesktop : bgSidebarMobile}
            alt="bg-sidebar"
            className='w-full h-full object-cover'
          />
        </div>
        <div className='relative'>
          <ul className='flex flex-col gap-7'>
            {steps.map(({step, title}) => (
              <li key={step} onClick={() => gotoPage(step)} className='flex items-center gap-5 cursor-pointer'>
                <div className={`rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold ${currentStep === step ? 'text-marine_blue bg-light_blue' : 'border-2 border-white text-white' }`}>
                  {step}
                </div>
                <div className='hidden md:block'>
                  <span className='text-light_gray uppercase'>step {step}</span>
                  <p className='uppercase font-medium text-white text'>{title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex-1 h-full w-full p-9 flex items-center justify-center'>
        <div className='max-w-lg'>
          {currentStep === 1 && (
            <div className='w-full'>
              <h1 className='text-marine_blue text-3xl font-medium '>Personal info</h1>
              <p className='text-cool_gray text-sm md:text-md mt-2 mb-6'>Please provide your name, email address, and phone number.</p>
              <form className='w-full '>
                <div className='flex flex-col gap-2 mb-7'>
                  <label htmlFor='' className='text-sm md:text-md text-marine_blue font-medium '>
                    Name
                  </label>
                  <input type='text' placeholder='e.g. Stephen King' className='py-3 px-4 border rounded-md bg-transparent outline-none w-full'/>
                </div>
                <div className='flex flex-col gap-2 mb-7'>
                  <label htmlFor='' className='text-sm md:text-md text-marine_blue font-medium '>
                    Email Address
                  </label>
                  <input type='email' placeholder='e.g. stephenking@lorem.com' className='py-3 px-4 border rounded-md bg-transparent outline-none w-full'/>
                </div>
                <div className='flex flex-col gap-2 mb-7'>
                  <label htmlFor='' className='text-sm md:text-md text-marine_blue font-medium '>
                    Phone Number
                  </label>
                  <input type='number' placeholder='e.g. +1 234 567 890' className='py-3 px-4 border rounded-md appearance-none bg-transparent outline-none w-full'/>
                </div>
              </form>
            </div>
          )}
          <div className='flex items-center justify-between max-w-lg w-full'>
            {currentStep > 1 ? (
              <button className='transition text-cool_gray hover:text-marine_blue px-6 py-2 rounded-md font-medium' onClick={gotoPrevPage}>
                Go Back
              </button>
            ) : (
              <span></span>
            )}

            <button className={`${currentStep >=4 ? 'bg-purplish_blue' : 'bg-marine_blue'} text-white px-6 py-2 rounded-md font-medium`} onClick={gotoNextPage}>
              {currentStep >=4 ? 'Confirm' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
