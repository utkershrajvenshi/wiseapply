'use client';

import { useState } from 'react';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

interface UserAvatarProps {
  user: KindeUser;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        {user.picture ? (
          <img src={user.picture} alt={user.given_name || 'User'} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xl">{user.given_name?.[0] || 'U'}</span>
        )}
      </div>
      {showTooltip && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.1)] z-20">
          <LogoutLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Logout
          </LogoutLink>
        </div>
      )}
    </div>
  );
}