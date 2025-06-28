export interface Beverage {
  name: string;
  price: number;
  symbol: "원";
  stock: number;
  image: {
    src: string;
    width: number;
    height: number;
  };
}

/**
 * @description For remaining exhcange in cash payment
 */
export interface CashBreakdown {
  value: number;
  count: number;
}

export interface Card {
  isNFC: boolean;
  serials: `${number}-${number}-${number}-${number}`;
  cvc: number;
  expirationDate: string; // Date ISO String
}

export type PaymentMethod = "cash" | "card" | null;

export enum VendingStatus {
  IDLE = "IDLE",
  PAYMENT = "PAYMENT",
  SELECTION = "SELECTION",
  PROCESSING = "PROCESSING",
  DISPENSING = "DISPENSING",
  ERROR = "ERROR",
}
