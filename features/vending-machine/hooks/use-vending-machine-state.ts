import { useAtomValue, useSetAtom } from "jotai";
import { vendingMachineState } from "../lib/state/vending-machine";
import type { Beverage, PaymentMethod } from "@/features/vending-machine/types";

export default function useVendingMachineState() {
  const { insertedCash, selectedBeverage, paymentMethod } =
    useAtomValue(vendingMachineState);
  const setVendingMachineState = useSetAtom(vendingMachineState);

  const totalDepositedCash = Object.entries(insertedCash).reduce(
    (acc, [cash, count]) => acc + Number(cash) * count,
    0
  );

  const updateSelectedBeverage = (beverage: Beverage) => {
    setVendingMachineState((prev) => ({
      ...prev,
      selectedBeverage: beverage,
    }));
  };

  const updatePaymentMethod = (method: PaymentMethod) => {
    if (paymentMethod === method) return;

    if (paymentMethod === "cash" && method === "card") {
      setVendingMachineState((prev) => ({
        ...prev,
        insertedCash: {
          ...prev.insertedCash,
          100: 0,
        },
      }));
      return;
    }

    if (paymentMethod === "cash" && method === "cash") return;

    setVendingMachineState((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

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

  const resetCash = () => {
    const deposited = totalDepositedCash;
    setVendingMachineState((prev) => ({
      ...prev,
      insertedCash: {
        100: 0,
        500: 0,
        1000: 0,
        5000: 0,
        10000: 0,
      },
    }));
    return deposited;
  };

  return {
    paymentMethod,
    insertedCash,
    selectedBeverage,
    totalDepositedCash,
    updateSelectedBeverage,
    updatePaymentMethod,
    updateInsertedCash,
    resetCash,
  };
}
