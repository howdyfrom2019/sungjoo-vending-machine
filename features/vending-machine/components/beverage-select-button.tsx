"use client";

import type { Beverage } from "@/features/vending-machine/types";
import { cn } from "@/lib/utils/tailwind-util";
import useVendingMachineState from "@/features/vending-machine/hooks/use-vending-machine-state";

export default function BeverageSelectButton({
  beverage,
}: {
  beverage: Beverage;
}) {
  const { totalDepositedCash, updateSelectedBeverage, paymentMethod } =
    useVendingMachineState();
  const disabled = beverage.stock === 0;
  const isEnoughCash = totalDepositedCash >= beverage.price;
  const isCardPayment = paymentMethod === "card";

  const handleClick = () => {
    updateSelectedBeverage(beverage);
  };

  return (
    <button
      className={cn([
        "rounded-sm bg-zinc-600 w-4/5 h-5 mx-auto font-mono text-red-400 text-sm font-bold tracking-widest cursor-pointer",
        "disabled:cursor-not-allowed",
      ])}
      disabled={disabled}
      onClick={handleClick}
    >
      {disabled ? (
        "품절"
      ) : (
        <span
          className={cn([
            "flex items-center mx-auto bg-zinc-500 size-3 rounded-full",
            (isCardPayment || isEnoughCash) && "bg-red-400",
          ])}
        />
      )}
    </button>
  );
}
