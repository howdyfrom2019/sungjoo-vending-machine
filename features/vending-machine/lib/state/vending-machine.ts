import { Beverage, PaymentMethod } from "@/features/vending-machine/types";
import { atom } from "jotai";
import { CASH_PAYABLE_UNITS } from "@/features/vending-machine/lib/config/vending-config";

interface VendingMachineState {
  paymentMethod: PaymentMethod;
  selectedBeverage: Beverage | null;
  insertedCash: Record<(typeof CASH_PAYABLE_UNITS)[number], number>;
}

export const vendingMachineState = atom<VendingMachineState>({
  paymentMethod: null,
  selectedBeverage: null,
  insertedCash: CASH_PAYABLE_UNITS.reduce(
    (acc, cash) => ({ ...acc, [cash]: 0 }),
    {} as Record<(typeof CASH_PAYABLE_UNITS)[number], number>
  ),
});
