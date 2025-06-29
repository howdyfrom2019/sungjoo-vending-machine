import { calculateChange } from "@/features/vending-machine/lib/utils/vending-util";

describe("@/features/vending-machine/lib/utils/vending-util", () => {
  it("거스름돈이 없는 경우 빈 배열을 return 해야 한다.", () => {
    const result = calculateChange({
      totalPaid: 1000,
      price: 1000,
    });
    expect(result).toEqual([]);
  });

  it("100원만 거스름돈으로 남는 케이스에 대한 테스트", () => {
    const result = calculateChange({
      totalPaid: 1000,
      price: 600,
    });
    expect(result).toEqual([{ value: 100, count: 4 }]);
  });

  it("모든 단위의 돈이 거스름돈으로 남는 케이스에 대한 테스트", () => {
    const result = calculateChange({
      totalPaid: 10000,
      price: 1100,
    });
    expect(result).toEqual([
      { value: 5000, count: 1 },
      { value: 1000, count: 3 },
      { value: 500, count: 1 },
      { value: 100, count: 4 },
    ]);
  });

  it("투입 금액이 음료 가격보다 적은 경우 빈 배열을 return 해야 한다.", () => {
    const result = calculateChange({
      totalPaid: 500,
      price: 1000,
    });
    expect(result).toEqual([]);
  });

  it("음료 가격이 0인 경우 빈 배열을 return 해야 한다.", () => {
    const result = calculateChange({
      totalPaid: 1000,
      price: 0,
    });
    expect(result).toEqual([{ value: 1000, count: 1 }]);
  });
});
