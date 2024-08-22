import Image from 'next/image';
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import en from '@/locales/en.json';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <Image
        src="/gradient-bg.png"
        alt="Background"
        fill
        className="object-cover z-0"
      />
      <Image
        src="/person.png"
        alt="Person at desk"
        width={500}
        height={500}
        className="absolute bottom-0 right-0 z-10"
      />
      <div className="z-20 text-center -mt-28 mx-8">
        <h2 className="font-lato font-bold text-2xl fixed top-8 left-1/2 transform -translate-x-1/2">
          {en.projectName}
        </h2>
        <h4 className="font-lato font-bold text-xl mt-6 mb-4">
          {en.mainHeading}
        </h4>
        <p className="font-lato text-lg mb-8">
          {en.subHeading}
        </p>
        <LoginLink>
          <button className="bg-sky-500 text-white font-lato font-semibold py-2 px-5 rounded-lg shadow-[inset_2px_2px_4px_rgba(125,174,246,0.8),inset_-2px_-2px_4px_rgba(53,110,194,0.7)]">
            {en.continueWithLinkedIn}
          </button>
        </LoginLink>
      </div>
    </div>
  );
}