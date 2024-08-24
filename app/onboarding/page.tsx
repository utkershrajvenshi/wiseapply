import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import en from '@/locales/en.json';
import OnboardingContent from './OnboardingContent';
import UserAvatar from '../components/UserAvatar';

export default async function OnboardingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 bg-white z-10 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">
            <span className="font-bold">{en.projectName}</span>
            <span className="font-light">/{en.onboarding}</span>
          </h1>
          {user ? (
            <UserAvatar user={user} />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          )}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4 scrollbar-hide">
        <OnboardingContent user={user} />
      </div>
    </div>
  );
}