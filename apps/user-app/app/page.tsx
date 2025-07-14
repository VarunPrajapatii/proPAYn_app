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
import Title1 from "../components/Landing/Title1";
import Title2 from "../components/Landing/Title2";
import Title3 from "../components/Landing/Title3";
import Footer from "../components/Footer/Footer";

export default async function LandingPage() {
  return (
    <div className="scrollbar-hide">
        <div className="">
          <Title1 />
        </div>
        <div>
          <Title2 />
        </div>
        <div>
          <Title3 />
        </div>
        <div>
          <Footer/>
        </div>
    </div>
  )
}