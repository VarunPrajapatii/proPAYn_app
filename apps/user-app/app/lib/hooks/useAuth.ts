"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth(redirectTo: string) {
    //This line calls the function useSession() and expects it to return an object. It then destructures the returned object, extracting:
        //The data property and assigning it to a new variable called session
        //The status property and assigning it to a variable called status
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(status === 'unauthenticated' && redirectTo) {
            // If the user is not authenticated, redirect them to the specified path
            router.push(redirectTo);
        }
    }, [status, redirectTo, router]);

    return {
        session,
        status,
        isAuthenticated: status === 'authenticated',
        isLoading: status === 'loading',
        user: session?.user,
    }
}


export function useRequireAuth(redirectTo = '/auth/signin') {
  const auth = useAuth(redirectTo)
  
  return auth
}