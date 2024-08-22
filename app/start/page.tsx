import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function StartPage() {
  const {getUser, getAccessTokenRaw} = getKindeServerSession();
  const user = await getUser();
  const accessToken = await getAccessTokenRaw();
  console.log({ user, accessToken });
  return (
    <div>
      <h1>StartPage</h1>
    </div>
  );
}