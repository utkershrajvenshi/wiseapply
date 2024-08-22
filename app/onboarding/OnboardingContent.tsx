'use client';

import { useState, useEffect } from 'react';
import en from '@/locales/en.json';
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

interface OnboardingContentProps {
  user: KindeUser | null;
}

export default function OnboardingContent({ user }: OnboardingContentProps) {
  const [isLoading, setIsLoading] = useState(!user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [otherUrls, setOtherUrls] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (user) {
      console.log(user);
      setName(user.given_name && user.family_name ? `${user.given_name} ${user.family_name}` : '');
      setEmail(user.email || '');
      // setLinkedinUrl(user.linkedin_url || '');
      setLinkedinUrl('');
      setIsLoading(false);
    }
  }, [user]);

  const validateName = (value: string) => {
    const isValid = /^[a-zA-Z\s]+$/.test(value);
    setNameError(isValid ? '' : en.nameError);
    return isValid;
  };

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? '' : en.emailError);
    return isValid;
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex space-x-4">
        <button 
          className="flex-1 py-2 px-4 bg-[#D9D9D9] bg-opacity-25 border-2 border-black rounded-md transition transform hover:scale-95 active:scale-90"
        >
          {en.uploadResume}
        </button>
        <div className="w-px bg-gray-300"></div>
        <button 
          className="flex-1 py-2 px-4 bg-sky-500 text-white font-semibold rounded-lg shadow-[inset_2px_2px_4px_rgba(125,174,246,0.8),inset_-2px_-2px_4px_rgba(53,110,194,0.7)] transition transform hover:scale-95 active:scale-90"
        >
          {en.importData}
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold">{en.name}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            placeholder={en.namePlaceholder}
            className={`w-full p-2 border-2 border-black rounded-lg ${nameError ? 'border-red-500' : ''}`}
          />
          {nameError && <p className="mt-1 text-sm font-bold text-red-500">{nameError}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">{en.emailId}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            placeholder={en.emailPlaceholder}
            className={`w-full p-2 border-2 border-black rounded-lg ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && <p className="mt-1 text-sm font-bold text-red-500">{emailError}</p>}
        </div>

        <div>
          <label htmlFor="linkedin" className="block mb-2 font-semibold">{en.linkedinUrl}</label>
          <input
            type="url"
            id="linkedin"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder={en.linkedinPlaceholder}
            className="w-full p-2 border-2 border-black rounded-lg"
            // disabled={!!user?.linkedin_url}
            disabled={false}
          />
        </div>

        <div>
          <label htmlFor="otherUrls" className="block mb-2 font-semibold">{en.otherUrls}</label>
          <input
            type="text"
            id="otherUrls"
            value={otherUrls}
            onChange={(e) => setOtherUrls(e.target.value)}
            placeholder={en.otherUrlsPlaceholder}
            className="w-full p-2 border-2 border-black rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}