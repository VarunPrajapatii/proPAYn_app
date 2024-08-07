// "use client"
// import { signIn, signOut, useSession } from "next-auth/react";
// import { Appbar } from "@propayn/ui/appbar";

// export default function Page(): JSX.Element {
//   const session = useSession();
//   return (
//    <div>
//       <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
//    </div>
//   );
// }


import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
}