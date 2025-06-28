import { BEVERAGE } from "@/features/vending-machine/lib/config/vending-config";
import Image from "next/image";
import React from "react";
import BeverageSelectButton from "../components/beverage-select-button";
import MoneyContainer from "../components/money-container";
import CashPaymentButton from "../components/cash-payment-button";

export default function VendingMachinePage() {
  return (
    <>
      <div className="relative flex flex-col gap-4 rounded-lg shadow-sm h-[800px] w-full max-w-96 mx-auto bg-gradient-to-b from-green-500 to-green-600 p-4">
        {/* 음료 디스플레이 */}
        <div className="h-1/2 rounded-xl flex w-full p-3 bg-green-50 justify-center gap-3 flex-1">
          {BEVERAGE.map((drink) => (
            <figure key={drink.name} className="flex flex-col gap-2">
              <Image
                src={drink.image.src}
                alt={drink.name}
                width={drink.image.width}
                height={drink.image.height}
              />
              <figcaption className="text-xs font-medium bg-white rounded-md p-1 w-2/3 text-center mx-auto">
                {drink.price.toLocaleString()} {drink.symbol}
              </figcaption>
              <BeverageSelectButton beverage={drink} />
            </figure>
          ))}
        </div>

        {/* 결제 패널 */}
        <div className="flex flex-col w-full gap-3 flex-3">
          <Image
            src="/vending-banner.png"
            alt="/vending-banner.png"
            width={400}
            height={200}
          />
          <div className="flex items-start gap-2 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <CashPaymentButton />
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
                disabled
              >
                카드 결제
              </button>
            </div>
            <div className="flex-1">반환구</div>
          </div>
        </div>

        {/* 음료 배출구 + 반환구 */}
        <div className="flex justify-between gap-2 w-full mt-auto">
          <button className="bg-gradient-to-b from-zinc-600 to-zinc-700 w-4/5 h-16 rounded-md font-bold text-xl text-center flex justify-center items-center text-white/20">
            음료 배출구
          </button>
          <button className="bg-gradient-to-b from-zinc-600 to-zinc-700 size-8 rounded-md text-xs text-white/20">
            반환구
          </button>
        </div>
      </div>
      <MoneyContainer />
    </>
  );
}
