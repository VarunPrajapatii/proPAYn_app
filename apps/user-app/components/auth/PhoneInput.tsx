"use client";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function PhoneInput({ value, onChange, error, disabled }: PhoneInputProps) {
  const isValidNumber = (number: string) => /^[0-9]{10}$/.test(number);

  return (
    <div>
      <label htmlFor="phone" className="font-nunito block text-base font-medium text-gray-800 dark:text-gray-300 mb-2">
        Phone Number
      </label>
      <input
        id="phone"
        type="tel"
        placeholder="1234567890"
        required
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-jetbrains flex h-10 w-full rounded-md border border-gray-500/30 bg-white/5 px-3 py-2 text-lg text-black dark:text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50"
      />
      {(!isValidNumber(value) && value) ? (
        <p className="font-nunito text-red-500 text-sm mt-1">
          Please enter a valid 10-digit phone number.
        </p>
      ) : (
        <p className="font-nunito text-red-600 text-base mt-1 p-2">
          
        </p>
      )}
    </div>
  );
}
