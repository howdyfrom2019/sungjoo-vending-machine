"use client";

import useVendingMachineState from "@/features/vending-machine/hooks/use-vending-machine-state";

export default function ExchangeDispatchButton() {
  const { totalDepositedCash, resetCash } = useVendingMachineState();

  const handleDispatch = () => {
    const exchange = resetCash();
    alert(`거스름돈 ${exchange}원 반환`);
  };

  return (
    <button
      className="size-20 bg-zinc-500 rounded-full font-semibold text-sm text-white cursor-pointer disabled:cursor-not-allowed"
      onClick={handleDispatch}
      disabled={totalDepositedCash === 0}
    >
      거스름돈
      <br />
      레버
    </button>
  );
}
