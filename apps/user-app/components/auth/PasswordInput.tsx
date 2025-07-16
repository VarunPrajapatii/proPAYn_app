"use client";

import { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  passwordConditions: {
    hasUpperLower: boolean;
    hasMinLength: boolean;
    hasNumber: boolean;
  };
}

export function PasswordInput({ value, onChange, disabled, passwordConditions }: PasswordInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Custom SVG Icons
  const EyeIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  );

  const CircleIcon = () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  );

  return (
    <div>
      <label htmlFor="password" className="font-nunito block text-sm font-medium text-gray-800 dark:text-gray-300  mb-2">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={passwordVisible ? 'text' : 'password'}
          required
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-jetbrains flex h-10 w-full rounded-md border border-gray-500/30 bg-white/5 px-3 py-2 text-sm text-black dark:text-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 tracking-wider"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-2 text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
        >
          {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      <div className="font-nunito text-gray-800 dark:text-gray-400  text-sm mt-2">
        <ul className="pl-2 space-y-1">
          <li className="flex items-center gap-x-2">
            <span className={passwordConditions.hasUpperLower ? "text-green-600" : "text-gray-800 dark:text-gray-400"}>
              {passwordConditions.hasUpperLower ? <CheckIcon /> : <CircleIcon />}
            </span>
            <span>Mix of uppercase & lowercase letters</span>
          </li>
          <li className="flex items-center gap-x-2">
            <span className={passwordConditions.hasMinLength ? "text-green-600" : "text-gray-800 dark:text-gray-400"}>
              {passwordConditions.hasMinLength ? <CheckIcon /> : <CircleIcon />}
            </span>
            <span>Minimum 8 characters long</span>
          </li>
          <li className="flex items-center gap-x-2">
            <span className={passwordConditions.hasNumber ? "text-green-600" : "text-gray-800 dark:text-gray-400"}>
              {passwordConditions.hasNumber ? <CheckIcon /> : <CircleIcon />}
            </span>
            <span>Contain at least 1 number</span>
          </li>
        </ul>
      </div>
    </div>
  );
}