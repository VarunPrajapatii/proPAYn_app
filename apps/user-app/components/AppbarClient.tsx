"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "./Header/Header";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();



  return (
   <div>
      <Header onSignin={signIn} onSignout={async () => {
        await signOut()
        router.push("/api/auth/signin")
      }} user={session.data?.user} />
   </div>
  );
}


export const Button = ({ onClick, children }: any) => {
  return (
    <button 
      onClick={onClick} 
      type="button" 
      className="px-6 py-2.5 rounded-xl font-semibold text-sm
               bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white 
               hover:from-blue-700 hover:via-blue-800 hover:to-emerald-700
               shadow-lg shadow-blue-500/25 dark:shadow-blue-800/25 
               border border-blue-500/20 backdrop-blur-sm
               transition-all duration-200 hover:scale-105 hover:shadow-xl 
               focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 
               focus:ring-offset-transparent active:scale-95"
    >
      {children}
    </button>
  );
};
