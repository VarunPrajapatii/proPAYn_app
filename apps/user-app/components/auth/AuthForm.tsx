"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { authSchema, validatePasswordConditions, isValidPassword, type AuthFormData } from "../../app/lib/validations/auth";
import { PhoneInput } from "./PhoneInput";
import { PasswordInput } from "./PasswordInput";
import Button from "@propayn/ui/button";

export default function AuthForm() {
  const [formData, setFormData] = useState<AuthFormData>({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordConditions, setPasswordConditions] = useState({
    hasUpperLower: false,
    hasMinLength: false,
    hasNumber: false
  });
  const router = useRouter();

  const validateField = (name: keyof AuthFormData, value: string) => {
    if (name === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (value && !phoneRegex.test(value)) {
        setErrors((prev: Partial<AuthFormData>) => ({ ...prev, phone: "Please enter a valid 10-digit phone number." }));
      } else {
        setErrors((prev: Partial<AuthFormData>) => ({ ...prev, phone: "" }));
      }
    }
    
    if (name === "password") {
      const conditions = validatePasswordConditions(value);
      setPasswordConditions(conditions);
    }
  };

  const handleInputChange = (name: keyof AuthFormData, value: string) => {
    setFormData((prev: AuthFormData) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const isFormValid = () => {
    const phoneRegex = /^[0-9]{10}$/;
    return formData.phone.trim() && 
           phoneRegex.test(formData.phone) && 
           isValidPassword(formData.password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    setMessage("");

    try {
      const validatedData = authSchema.parse(formData);
      
      // using NextAuth
      const result = await signIn("credentials", {
        phone: validatedData.phone,
        password: validatedData.password,
        redirect: false,
      });

      if (result?.error) {
        setMessage("Invalid phone number or password");
      } else if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  const CustomLoader = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
    </div>
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <PhoneInput
          value={formData.phone}
          onChange={(value) => handleInputChange("phone", value)}
          error={errors.phone}
          disabled={loader}
        />
        
        <PasswordInput
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          disabled={loader}
          passwordConditions={passwordConditions}
        />
      </div>

      {message && (
        <div className="font-nunito text-red-600 text-sm" role="alert">
          {message}
        </div>
      )}

      <Button
        disabled={!isFormValid() || loader}
        className="!w-full !py-1.5 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 dark:text-white disabled:text-white hover:from-slate-100 hover:via-blue-100 hover:to-indigo-200 dark:hover:from-purple-800 dark:hover:to-violet-800 hover:scale-105 shadow-lg border border-purple-300 dark:border-purple-600"
      >
        {loader ? <CustomLoader /> : 'Click to Sign In/Sign Up'}
      </Button>
    </form>
  );
}
