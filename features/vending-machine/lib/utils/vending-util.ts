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

  CASH_PAYABLE_UNITS.forEach((unit) => {
    const count = Math.floor(change / unit);
    if (count > 0) {
      changeBreakdown.push({ value: unit, count });
      change -= count * unit;
    }
  });

  return changeBreakdown;
}
