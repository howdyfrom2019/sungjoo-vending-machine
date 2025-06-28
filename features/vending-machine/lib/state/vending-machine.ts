import { Beverage } from "@/features/vending-machine/types";
import { atom } from "jotai";
import { CASH_PAYABLE_UNITS } from "../config/vending-config";

interface VendingMachineState {
  selectedBeverage: Beverage | null;
  insertedCash: Record<(typeof CASH_PAYABLE_UNITS)[number], number>;
}

export const vendingMachineState = atom<VendingMachineState>({
  selectedBeverage: null,
  insertedCash: CASH_PAYABLE_UNITS.reduce(
    (acc, cash) => ({ ...acc, [cash]: 0 }),
    {} as Record<(typeof CASH_PAYABLE_UNITS)[number], number>
  ),
});
