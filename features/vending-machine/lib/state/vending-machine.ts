import { Beverage, PaymentMethod } from "@/features/vending-machine/types";
import { atom } from "jotai";
import {
  BEVERAGE,
  CASH_PAYABLE_UNITS,
} from "@/features/vending-machine/lib/config/vending-config";

interface VendingMachineState {
  paymentMethod: PaymentMethod;
  beverages: Beverage[];
  selectedBeverage: Beverage | null;
  insertedCash: Record<(typeof CASH_PAYABLE_UNITS)[number], number>;
}

interface DispatchState {
  beverages: Beverage[];
  exchangeCash: Record<(typeof CASH_PAYABLE_UNITS)[number], number>;
}

export const vendingMachineState = atom<VendingMachineState>({
  paymentMethod: null,
  beverages: BEVERAGE,
  selectedBeverage: null,
  insertedCash: CASH_PAYABLE_UNITS.reduce(
    (acc, cash) => ({ ...acc, [cash]: 0 }),
    {} as Record<(typeof CASH_PAYABLE_UNITS)[number], number>
  ),
});

export const dispatchState = atom<DispatchState>({
  beverages: [],
  exchangeCash: CASH_PAYABLE_UNITS.reduce(
    (acc, cash) => ({ ...acc, [cash]: 0 }),
    {} as Record<(typeof CASH_PAYABLE_UNITS)[number], number>
  ),
});
