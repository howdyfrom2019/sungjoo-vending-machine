"use client";

import { cn } from "@/lib/utils/tailwind-util";
import useVendingMachineState from "../hooks/use-vending-machine-state";
import { CASH_PAYABLE_UNITS } from "../lib/config/vending-config";

interface CardPaymentButtonProps {
  className?: string;
}

export default function CashPaymentButton({
  className = "",
}: CardPaymentButtonProps) {
  const { insertedCash, totalDepositedCash, updateInsertedCash } =
    useVendingMachineState();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-zinc-500", "bg-zinc-500");
    e.currentTarget.classList.add("bg-blue-100", "border-blue-300");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-100", "border-blue-300");
    e.currentTarget.classList.add("border-zinc-500", "bg-zinc-500");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-100", "border-blue-300");
    e.currentTarget.classList.add("border-zinc-500", "bg-zinc-500");

    const dragDataString = e.dataTransfer.getData("text/plain");
    const dragData = JSON.parse(dragDataString);

    const { value: cashAmount, isToy } = dragData;

    // 장난감 돈인지 확인
    if (isToy) {
      alert("올바르지 않은 화폐입니다.");
      return;
    }

    // 유효한 화폐 단위인지 확인
    if (CASH_PAYABLE_UNITS.includes(cashAmount as any)) {
      updateInsertedCash(cashAmount);
    }
  };

  return (
    <div
      className={cn([
        "flex flex-col items-start gap-2",
        "border-2 border-zinc-500 bg-zinc-500 px-3 py-1 transition-colors duration-200",
        className,
      ])}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="text-red-400 font-mono font-bold text-sm tracking-tight">
        {totalDepositedCash === 0
          ? "현금투입구"
          : totalDepositedCash.toLocaleString("en-US") + "원"}
      </p>
      <div className="w-full h-3 border-x-2  border-zinc-400 flex flex-col justify-center">
        <div className="w-full h-0.5 bg-zinc-400" />
      </div>
    </div>
  );
}
