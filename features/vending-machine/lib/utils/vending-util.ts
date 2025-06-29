import type { CashBreakdown } from "@/features/vending-machine/types";
import { CASH_PAYABLE_UNITS } from "@/features/vending-machine/lib/config/vending-config";

export function calculateChange({
  totalPaid,
  price,
}: {
  totalPaid: number;
  price: number;
}) {
  let change = totalPaid - price;
  const changeBreakdown: CashBreakdown[] = [];

  // If no change is needed or paid amount is less than price
  if (change <= 0) {
    return changeBreakdown;
  }

  // Sort cash units in descending order
  const sortedUnits = [...CASH_PAYABLE_UNITS].sort((a, b) => b - a);

  sortedUnits.forEach((unit) => {
    const count = Math.floor(change / unit);
    if (count > 0) {
      changeBreakdown.push({ value: unit, count });
      change -= count * unit;
    }
  });

  return changeBreakdown;
}
