import { useAtomValue, useSetAtom } from "jotai";
import {
  dispatchState,
  vendingMachineState,
} from "../lib/state/vending-machine";
import type { Beverage, PaymentMethod } from "@/features/vending-machine/types";
import { calculateChange } from "../lib/utils/vending-util";
import { CASH_PAYABLE_UNITS } from "../lib/config/vending-config";

export default function useVendingMachineState() {
  const { insertedCash, selectedBeverage, paymentMethod } =
    useAtomValue(vendingMachineState);
  const { beverages, exchangeCash } = useAtomValue(dispatchState);
  const setVendingMachineState = useSetAtom(vendingMachineState);
  const setDispatchState = useSetAtom(dispatchState);

  const totalDepositedCash = Object.entries(insertedCash).reduce(
    (acc, [cash, count]) => acc + Number(cash) * count,
    0
  );

  const updateSelectedBeverage = (beverage: Beverage) => {
    setVendingMachineState((prev) => ({
      ...prev,
      selectedBeverage: beverage,
    }));

    setTimeout(() => {
      setVendingMachineState((prev) => ({
        ...prev,
        paymentMethod: null,
        selectedBeverage: null,
      }));
      const exchange = calculateChange({
        totalPaid: totalDepositedCash,
        price: paymentMethod === "card" ? 0 : beverage.price,
      });
      setDispatchState((prev) => ({
        beverages: [...prev.beverages, beverage],
        exchangeCash: exchange.reduce(
          (acc, { value, count }) => ({
            ...acc,
            [value]: count,
          }),
          {} as Record<(typeof CASH_PAYABLE_UNITS)[number], number>
        ),
      }));
    }, 1000);
  };

  const resetDispatchBeverages = () => {
    setDispatchState((prev) => ({
      ...prev,
      beverages: [],
    }));
  };

  const updatePaymentMethod = (method: PaymentMethod) => {
    if (paymentMethod === method) return;

    if (paymentMethod === "cash" && method === "card") {
      setDispatchState((prev) => ({
        ...prev,
        exchangeCash: { ...insertedCash },
      }));

      setVendingMachineState((prev) => ({
        ...prev,
        insertedCash: {
          100: 0,
          500: 0,
          1000: 0,
          5000: 0,
          10000: 0,
        },
        paymentMethod: method,
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
    setDispatchState((prev) => ({
      ...prev,
      exchangeCash: { ...insertedCash },
    }));

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
  };

  const resetAll = () => {
    setVendingMachineState((prev) => ({
      ...prev,
      insertedCash: {
        100: 0,
        500: 0,
        1000: 0,
        5000: 0,
        10000: 0,
      },
      selectedBeverage: null,
      paymentMethod: null,
    }));

    setDispatchState((prev) => ({
      ...prev,
      beverages: [],
      exchangeCash: CASH_PAYABLE_UNITS.reduce(
        (acc, cash) => ({ ...acc, [cash]: 0 }),
        {} as Record<(typeof CASH_PAYABLE_UNITS)[number], number>
      ),
    }));
  };

  return {
    paymentMethod,
    insertedCash,
    selectedBeverage,
    totalDepositedCash,
    dispatchBeverages: beverages,
    dispatchExchangeCash: exchangeCash,
    updateSelectedBeverage,
    updatePaymentMethod,
    updateInsertedCash,
    resetCash,
    resetAll,
    resetDispatchBeverages,
  };
}
