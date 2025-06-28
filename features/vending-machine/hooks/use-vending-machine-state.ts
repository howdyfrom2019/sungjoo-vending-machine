import { useAtomValue, useSetAtom } from "jotai";
import { vendingMachineState } from "../lib/state/vending-machine";

export default function useVendingMachineState() {
  const { insertedCash, selectedBeverage } = useAtomValue(vendingMachineState);
  const setVendingMachineState = useSetAtom(vendingMachineState);

  const totalDepositedCash = Object.entries(insertedCash).reduce(
    (acc, [cash, count]) => acc + Number(cash) * count,
    0
  );

  const updateInsertedCash = (cashAmount: number) => {
    setVendingMachineState((prev) => ({
      ...prev,
      insertedCash: {
        ...prev.insertedCash,
        [cashAmount]:
          prev.insertedCash[cashAmount as keyof typeof prev.insertedCash] + 1,
      },
    }));
  };

  return {
    insertedCash,
    selectedBeverage,
    totalDepositedCash,
    updateInsertedCash,
  };
}
