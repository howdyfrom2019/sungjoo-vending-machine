"use client";

import useVendingMachineState from "@/features/vending-machine/hooks/use-vending-machine-state";

export default function ExchangeDispatchButton() {
  const { totalDepositedCash, resetCash } = useVendingMachineState();

  const handleDispatch = () => {
    resetCash();
    alert(`거스름돈이 반환되었습니다. 반환구를 눌러 확인해주세요.`);
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
