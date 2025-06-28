"use client";

import type { Beverage } from "@/features/vending-machine/types";
import { cn } from "@/lib/utils/tailwind-util";
import { vendingMachineState } from "@/features/vending-machine/lib/state/vending-machine";
import useVendingMachineState from "../hooks/use-vending-machine-state";

export default function BeverageSelectButton({
  beverage,
}: {
  beverage: Beverage;
}) {
  const { totalDepositedCash } = useVendingMachineState();
  const disabled = beverage.stock === 0;
  const isEnoughCash = totalDepositedCash >= beverage.price;
  return (
    <button
      className={cn([
        "rounded-sm bg-zinc-600 w-4/5 h-5 mx-auto font-mono text-red-400 text-sm font-bold tracking-widest cursor-pointer",
        "disabled:cursor-not-allowed",
      ])}
      disabled={disabled}
    >
      {disabled ? (
        "품절"
      ) : (
        <span
          className={cn([
            "flex items-center mx-auto bg-zinc-500 size-3 rounded-full",
            isEnoughCash && "bg-red-400",
          ])}
        />
      )}
    </button>
  );
}
