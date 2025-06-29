"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils/tailwind-util";
import Dialog, { DialogRef } from "@/components/dialog";
import useVendingMachineState from "../hooks/use-vending-machine-state";

export default function DrinkExchangeDispatcher() {
  const {
    paymentMethod,
    dispatchBeverages,
    dispatchExchangeCash,
    resetAll,
    resetDispatchBeverages,
  } = useVendingMachineState();

  const [showBeverageDialog, setShowBeverageDialog] = useState(false);
  const [showChangeDialog, setShowChangeDialog] = useState(false);

  const beverageDialogRef = useRef<DialogRef>(null);
  const changeDialogRef = useRef<DialogRef>(null);

  const handleBeverageDispense = () => {
    if (dispatchBeverages.length > 0) {
      setShowBeverageDialog(true);
      beverageDialogRef.current?.showModal();
    }
  };

  const handleChangeReturn = () => {
    const hasExchangeCash = Object.values(dispatchExchangeCash).some(
      (count) => count > 0
    );
    if (hasExchangeCash) {
      setShowChangeDialog(true);
      changeDialogRef.current?.showModal();
    }
  };

  // 음료별 개수 계산
  const beverageCounts = dispatchBeverages.reduce((acc, beverage) => {
    acc[beverage.name] = (acc[beverage.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 반환할 현금 총액 계산
  const totalExchangeCash = Object.entries(dispatchExchangeCash).reduce(
    (acc, [cash, count]) => acc + Number(cash) * count,
    0
  );

  return (
    <>
      <div className="flex justify-between gap-2 w-full mt-auto">
        <button
          disabled={dispatchBeverages.length === 0}
          onClick={handleBeverageDispense}
          className={cn([
            "bg-gradient-to-b from-zinc-600 to-zinc-700 w-4/5 h-16 rounded-md font-bold text-xl text-center flex justify-center items-center text-white/20 cursor-pointer disabled:cursor-default",
            dispatchBeverages.length > 0 && "animate-pulse",
          ])}
        >
          음료 배출구
        </button>
        <button
          disabled={
            !Object.values(dispatchExchangeCash).some((count) => count > 0)
          }
          onClick={handleChangeReturn}
          className={cn([
            "bg-gradient-to-b from-zinc-600 to-zinc-700 size-8 rounded-md text-xs text-white/20 cursor-pointer disabled:cursor-default",
            Object.values(dispatchExchangeCash).some((count) => count > 0) &&
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
              {dispatchBeverages.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-lg text-gray-600">
                    총 {dispatchBeverages.length}개의 음료가 배출되었습니다.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">배출 내역</p>
                    <div className="space-y-2">
                      {Object.entries(beverageCounts).map(([name, count]) => (
                        <div
                          key={name}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {name}
                          </span>
                          <span className="text-sm text-gray-600">
                            {count}개
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-lg text-gray-600">배출할 음료가 없습니다.</p>
              )}
              <button
                onClick={() => {
                  setShowBeverageDialog(false);
                  resetDispatchBeverages();
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
              {totalExchangeCash > 0 ? (
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg font-semibold text-gray-700">
                      반환 금액: {totalExchangeCash.toLocaleString()}원
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">반환 내역</p>
                    <div className="space-y-1">
                      {Object.entries(dispatchExchangeCash)
                        .filter(([_, count]) => count > 0)
                        .map(([value, count]) => (
                          <p key={value} className="text-sm text-gray-700">
                            {Number(value).toLocaleString()}원: {count}개
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-lg text-gray-600">반환할 잔액이 없습니다.</p>
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
