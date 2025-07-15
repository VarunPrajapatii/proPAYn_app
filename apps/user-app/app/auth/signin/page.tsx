import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BackButton } from "../../../components/auth/BackButton";
import AuthForm from "../../../components/auth/AuthForm";
import { authOptions } from "../../lib/auth";
import { getAuthSession } from "../../lib/getServerSideProps";

export default async function SignInPage() {
  const session = await getAuthSession();
  
  if (session) {
    redirect("/");
  }

  return (
    <div className="">
        <BackButton />
      <div className="min-h-screen flex items-center justify-center relative" style={{
        background: 'radial-gradient(circle at 70% 70%, rgba(82, 39, 105, 0.9) 0%, rgba(0, 0, 0, 1) %)'
      }}>
        <div className="relative backdrop-blur-xl bg-black/10 dark:bg-white/10 border border-gray-500/30 rounded-xl w-[35rem] shadow-xl p-10 max-w-lg text-black dark:text-white">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Continue</h1>
            <p className="text-gray-700 dark:text-gray-400">
              We'll log you in or create an account,<br /> if you don't have one.
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}