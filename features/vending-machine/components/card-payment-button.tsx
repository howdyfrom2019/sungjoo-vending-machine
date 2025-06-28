"use client";

import useVendingMachineState from "@/features/vending-machine/hooks/use-vending-machine-state";

export default function CardPaymentButton() {
  const { updatePaymentMethod } = useVendingMachineState();

  const handleClick = () => {
    updatePaymentMethod("card");
  };

  return (
    <button
      className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer disabled:cursor-not-allowed"
      onClick={handleClick}
    >
      카드 결제
    </button>
  );
}
