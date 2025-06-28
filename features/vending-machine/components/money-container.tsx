"use client";

import MoneyItem from "./money-item";

export default function MoneyContainer() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        돈을 드래그해서 카드 결제 버튼에 드롭하세요
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">한국 돈</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <MoneyItem value={100} className="text-center">
              <div className="text-xs text-gray-600">100원</div>
              <div className="text-lg font-bold text-green-600">₩100</div>
            </MoneyItem>
            <MoneyItem value={500} className="text-center">
              <div className="text-xs text-gray-600">500원</div>
              <div className="text-lg font-bold text-green-600">₩500</div>
            </MoneyItem>
            <MoneyItem value={1000} className="text-center">
              <div className="text-xs text-gray-600">1000원</div>
              <div className="text-lg font-bold text-green-600">₩1,000</div>
            </MoneyItem>
            <MoneyItem value={5000} className="text-center">
              <div className="text-xs text-gray-600">5000원</div>
              <div className="text-lg font-bold text-green-600">₩5,000</div>
            </MoneyItem>
            <MoneyItem value={10000} className="text-center">
              <div className="text-xs text-gray-600">10000원</div>
              <div className="text-lg font-bold text-green-600">₩10,000</div>
            </MoneyItem>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            장난감 돈 (사용 불가)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <MoneyItem value={10000} isToy={true} className="text-center">
              <div className="text-xs text-gray-600">장난감 지폐</div>
              <div className="text-lg font-bold text-red-600">₩10,000</div>
            </MoneyItem>
            <MoneyItem value={500} isToy={true} className="text-center">
              <div className="text-xs text-gray-600">장난감 동전</div>
              <div className="text-lg font-bold text-red-600">₩500</div>
            </MoneyItem>
          </div>
        </div>
      </div>
    </div>
  );
}
