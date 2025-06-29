import { renderHook, act } from "@testing-library/react";
import { Provider } from "jotai";
import useVendingMachineState from "@/features/vending-machine/hooks/use-vending-machine-state";
import { BEVERAGE } from "@/features/vending-machine/lib/config/vending-config";

describe("@/features/vending-machine/hooks/use-vending-machine-state", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider>{children}</Provider>
  );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("기본값 초기화 테스트", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    expect(result.current.paymentMethod).toBe(null);
    expect(result.current.insertedCash).toEqual({
      100: 0,
      500: 0,
      1000: 0,
      5000: 0,
      10000: 0,
    });
    expect(result.current.selectedBeverage).toBe(null);
    expect(result.current.totalDepositedCash).toBe(0);
    expect(result.current.dispatchBeverages).toEqual([]);
    expect(result.current.dispatchExchangeCash).toEqual({
      100: 0,
      500: 0,
      1000: 0,
      5000: 0,
      10000: 0,
    });
  });

  it("음료가 선택된 이후, 타이머가 종료되면 음료가 배출되고 결제 방법과 음료 선택이 초기화되어야 한다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    const testBeverage = BEVERAGE[0];
    act(() => {
      result.current.updateSelectedBeverage(testBeverage);
    });
    expect(result.current.selectedBeverage).toEqual(testBeverage);
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.selectedBeverage).toBe(null);
    expect(result.current.paymentMethod).toBe(null);
    expect(result.current.dispatchBeverages).toEqual([testBeverage]);
  });

  it("[현금 결제] 음료가 선택된 이후, 타이머가 종료되면 거스름돈이 배출되어야 한다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    const testBeverage = BEVERAGE[0]; // 콜라(1100원)
    act(() => {
      result.current.updateInsertedCash(1000);
      result.current.updateInsertedCash(1000);
    });
    expect(result.current.totalDepositedCash).toBe(2000);
    act(() => {
      result.current.updateSelectedBeverage(testBeverage);
    });
    act(() => {
      jest.runAllTimers();
    });
    // 2000 - 1100 = 900원 = 500원 1개 + 100원 4개
    expect(result.current.dispatchExchangeCash).toEqual({
      100: 4,
      500: 1,
    });
  });

  it("[카드 결제] 음료가 선택된 이후, 타이머가 종료되면 거스름돈이 배출되지 않아야 한다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    const testBeverage = BEVERAGE[0]; // 콜라(1100원)
    act(() => {
      result.current.updatePaymentMethod("card");
      result.current.updateSelectedBeverage(testBeverage);
    });
    expect(result.current.paymentMethod).toBe("card");
    expect(result.current.selectedBeverage).toEqual(testBeverage);
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.selectedBeverage).toBe(null);
    expect(result.current.paymentMethod).toBe(null);
    expect(result.current.dispatchBeverages).toEqual([testBeverage]);
    // 카드 결제는 거스름돈이 없어야 함
    expect(result.current.dispatchExchangeCash).toEqual({});
  });

  it("[카드 결제] 카드 결제 시 현금이 투입되어 있다면 투입된 현금은 배출되어야 한다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    const testBeverage = BEVERAGE[0]; // 콜라(1100원)
    act(() => {
      result.current.updateInsertedCash(1000);
      result.current.updateInsertedCash(1000);
      result.current.updatePaymentMethod("card");
    });
    expect(result.current.totalDepositedCash).toBe(2000);
    expect(result.current.paymentMethod).toBe("card");
    act(() => {
      result.current.updateSelectedBeverage(testBeverage);
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.dispatchBeverages).toEqual([testBeverage]);
    expect(result.current.dispatchExchangeCash).toEqual({
      1000: 2,
    });
  });

  it("[현금 > 카드 전환] 카드로 전환시 투입된 현금은 모두 초기화된다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    act(() => {
      result.current.updateInsertedCash(1000);
      result.current.updatePaymentMethod("cash");
    });
    expect(result.current.insertedCash[1000]).toBe(1);
    act(() => {
      result.current.updatePaymentMethod("card");
    });
    expect(result.current.insertedCash[100]).toBe(0);
    expect(result.current.insertedCash[1000]).toBe(0);
  });

  it("[현금 결제] 투입되는 지폐의 갯수를 늘릴 수 있다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    act(() => {
      result.current.updateInsertedCash(1000);
    });
    expect(result.current.insertedCash[1000]).toBe(1);
    expect(result.current.totalDepositedCash).toBe(1000);
    act(() => {
      result.current.updateInsertedCash(1000);
    });
    expect(result.current.insertedCash[1000]).toBe(2);
    expect(result.current.totalDepositedCash).toBe(2000);
  });

  it("[현금 결제] 여러 지폐를 투입할 수 있다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    act(() => {
      result.current.updateInsertedCash(100);
      result.current.updateInsertedCash(500);
      result.current.updateInsertedCash(1000);
    });
    expect(result.current.insertedCash[100]).toBe(1);
    expect(result.current.insertedCash[500]).toBe(1);
    expect(result.current.insertedCash[1000]).toBe(1);
    expect(result.current.totalDepositedCash).toBe(1600);
  });

  it("[현금 결제] 투입된 지폐를 초기화하고 거스름돈을 배출할 수 있어야 한다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    act(() => {
      result.current.updateInsertedCash(1000);
      result.current.updateInsertedCash(500);
    });
    expect(result.current.totalDepositedCash).toBe(1500);
    act(() => {
      result.current.resetCash();
    });
    expect(result.current.insertedCash).toEqual({
      100: 0,
      500: 0,
      1000: 0,
      5000: 0,
      10000: 0,
    });
    expect(result.current.dispatchExchangeCash).toEqual({
      100: 0,
      500: 1,
      1000: 1,
      5000: 0,
      10000: 0,
    });
  });

  it("[현금 결제] 모든 상태를 초기화할 수 있어야 한다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    act(() => {
      result.current.updateInsertedCash(1000);
      result.current.updatePaymentMethod("cash");
      result.current.updateSelectedBeverage(BEVERAGE[0]);
    });
    act(() => {
      result.current.resetAll();
    });
    expect(result.current.paymentMethod).toBe(null);
    expect(result.current.insertedCash).toEqual({
      100: 0,
      500: 0,
      1000: 0,
      5000: 0,
      10000: 0,
    });
    expect(result.current.selectedBeverage).toBe(null);
    expect(result.current.dispatchBeverages).toEqual([]);
    expect(result.current.dispatchExchangeCash).toEqual({
      100: 0,
      500: 0,
      1000: 0,
      5000: 0,
      10000: 0,
    });
  });

  it("[카드 결제] 모든 상태를 초기화할 수 있어야 한다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    act(() => {
      result.current.updatePaymentMethod("card");
      result.current.updateSelectedBeverage(BEVERAGE[0]);
    });
    act(() => {
      result.current.resetAll();
    });
    expect(result.current.paymentMethod).toBe(null);
    expect(result.current.insertedCash).toEqual({
      100: 0,
      500: 0,
      1000: 0,
      5000: 0,
      10000: 0,
    });
    expect(result.current.selectedBeverage).toBe(null);
    expect(result.current.dispatchBeverages).toEqual([]);
    expect(result.current.dispatchExchangeCash).toEqual({
      100: 0,
      500: 0,
      1000: 0,
      5000: 0,
      10000: 0,
    });
  });

  it("[현금 결제] 음료 배출 목록을 초기화할 수 있어야 한다.", () => {
    const { result } = renderHook(() => useVendingMachineState(), { wrapper });
    act(() => {
      result.current.updateSelectedBeverage(BEVERAGE[0]);
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.dispatchBeverages).toHaveLength(1);
    act(() => {
      result.current.resetDispatchBeverages();
    });
    expect(result.current.dispatchBeverages).toEqual([]);
  });
});
