'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import bgSidebarDesktop from '@/public/assets/images/bg-sidebar-desktop.svg';
import bgSidebarMobile from '@/public/assets/images/bg-sidebar-mobile.svg';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

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
      <div className='w-72 h-full p-4 overflow-hidden rounded-2xl relative'>
        <div className='absolute z-0 top-0 left-0 w-full h-full'>
          <Image
            src={isDesktop ? bgSidebarDesktop : bgSidebarMobile}
            alt="bg-sidebar"
            className='w-full h-full object-cover'
          />
        </div>
        <div className='relative'>
          <p className='text-2xl text-white'>Hello World</p>

        </div>
      </div>
      <div className='flex-1 bg-red-50 h-full w-full p-9 flex items-center justify-center'>
        <div className='max-w-lg'>
          
        </div>
      </div>
    </main>
  )
}
