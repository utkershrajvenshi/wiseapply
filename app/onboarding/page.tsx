import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import en from '@/locales/en.json';
import OnboardingContent from './OnboardingContent';
import UserAvatar from '../components/UserAvatar';

export default async function OnboardingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
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
      <OnboardingContent user={user} />
    </div>
  );
}