import { Beverage } from "@/features/vending-machine/types";

export const BEVERAGE: Beverage[] = [
  {
    name: "콜라",
    price: 1_100,
    stock: 10,
    image: { src: "/beverage/cola.png", width: 100, height: 100 },
    symbol: "원",
  },
  {
    name: "물",
    price: 600,
    stock: 8,
    image: { src: "/beverage/water.png", width: 100, height: 100 },
    symbol: "원",
  },
  {
    name: "커피",
    price: 700,
    stock: 3,
    image: { src: "/beverage/coffee.png", width: 100, height: 100 },
    symbol: "원",
  },
];

export const CASH_PAYABLE_UNITS = [100, 500, 1000, 5000, 10000] as const;
