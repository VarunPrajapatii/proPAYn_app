"use client";

import { useBalance } from "@propayn/store/balance";

export default function() {
  const balance = useBalance();
  return <div>
    hi there {balance}
  </div>
}