"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils/tailwind-util";
import Dialog, { DialogRef } from "@/components/dialog";
import useVendingMachineState from "../hooks/use-vending-machine-state";
import { calculateChange } from "../lib/utils/vending-util";
import Image from "next/image";

export default function DrinkExchangeDispatcher() {
  const { selectedBeverage, paymentMethod, totalDepositedCash, resetAll } =
    useVendingMachineState();

  const [showBeverageDialog, setShowBeverageDialog] = useState(false);
  const [showChangeDialog, setShowChangeDialog] = useState(false);

  const beverageDialogRef = useRef<DialogRef>(null);
  const changeDialogRef = useRef<DialogRef>(null);

  const handleBeverageDispense = () => {
    if (selectedBeverage) {
      setShowBeverageDialog(true);
      beverageDialogRef.current?.showModal();
    }
  };

  const handleChangeReturn = () => {
    if (
      selectedBeverage &&
      paymentMethod === "cash" &&
      totalDepositedCash >= selectedBeverage.price
    ) {
      setShowChangeDialog(true);
      changeDialogRef.current?.showModal();
    }
  };

  const changeBreakdown =
    selectedBeverage && paymentMethod === "cash"
      ? calculateChange({
          totalPaid: totalDepositedCash,
          price: selectedBeverage.price,
        })
      : [];

  return (
    <>
      <div className="flex justify-between gap-2 w-full mt-auto">
        <button
          disabled={!selectedBeverage}
          onClick={handleBeverageDispense}
          className={cn([
            "bg-gradient-to-b from-zinc-600 to-zinc-700 w-4/5 h-16 rounded-md font-bold text-xl text-center flex justify-center items-center text-white/20 cursor-pointer disabled:cursor-default",
            selectedBeverage && "animate-pulse",
          ])}
        >
          음료 배출구
        </button>
        <button
          disabled={
            !selectedBeverage ||
            (paymentMethod === "cash" &&
              totalDepositedCash < (selectedBeverage?.price ?? 0))
          }
          onClick={handleChangeReturn}
          className={cn([
            "bg-gradient-to-b from-zinc-600 to-zinc-700 size-8 rounded-md text-xs text-white/20 cursor-pointer disabled:cursor-default",
            selectedBeverage &&
              paymentMethod === "cash" &&
              totalDepositedCash >= selectedBeverage.price &&
              "animate-pulse",
          ])}
        >
          반환구
        </button>
      </div>

      {/* 음료 배출 다이얼로그 */}
      {showBeverageDialog && (
        <Dialog ref={beverageDialogRef} className="max-w-md">
          <div className="p-6 bg-white rounded-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                음료 배출
              </h2>
              {selectedBeverage && (
                <>
                  <div className="flex justify-center mb-4">
                    <Image
                      src={selectedBeverage.image.src}
                      alt={selectedBeverage.name}
                      width={selectedBeverage.image.width}
                      height={selectedBeverage.image.height}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-gray-700">
                      {selectedBeverage.name}
                    </p>
                    <p className="text-lg text-gray-600">
                      {selectedBeverage.price.toLocaleString()}
                      {selectedBeverage.symbol}
                    </p>
                    <p className="text-sm text-gray-500">
                      재고: {selectedBeverage.stock}개
                    </p>
                  </div>
                </>
              )}
              <button
                onClick={() => {
                  setShowBeverageDialog(false);
                  if (paymentMethod === "card") {
                    resetAll();
                  }
                }}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* 잔액 반환 다이얼로그 */}
      {showChangeDialog && (
        <Dialog ref={changeDialogRef} className="max-w-md">
          <div className="p-6 bg-white rounded-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                잔액 반환
              </h2>
              {selectedBeverage && (
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">결제 정보</p>
                    <p className="text-lg font-semibold text-gray-700">
                      {selectedBeverage.name}:{" "}
                      {selectedBeverage.price.toLocaleString()}
                      {selectedBeverage.symbol}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      투입 금액: {totalDepositedCash.toLocaleString()}원
                    </p>
                  </div>

                  {changeBreakdown.length > 0 ? (
                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-3">
                        반환 금액:{" "}
                        {(
                          totalDepositedCash - selectedBeverage.price
                        ).toLocaleString()}
                        원
                      </p>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">반환 내역</p>
                        <div className="space-y-1">
                          {changeBreakdown.map((item, index) => (
                            <p key={index} className="text-sm text-gray-700">
                              {item.value.toLocaleString()}원: {item.count}개
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg text-gray-600">
                      반환할 잔액이 없습니다.
                    </p>
                  )}
                </div>
              )}
              <button
                onClick={() => {
                  setShowChangeDialog(false);
                  resetAll();
                }}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
