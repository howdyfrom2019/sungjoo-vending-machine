"use client";

import React from "react";

const DRINKS = [
  { name: "콜라", price: 1100, count: 5 },
  { name: "물", price: 600, count: 8 },
  { name: "커피", price: 700, count: 3 },
];

const CASHES = [100, 500, 1000, 5000, 10000];

export default function Canvas() {
  return (
    <div style={styles.vendingMachine}>
      {/* 음료 디스플레이 */}
      <div style={styles.drinkDisplay}>
        {DRINKS.map((drink, idx) => (
          <div key={drink.name} style={styles.drinkSlot}>
            <div style={styles.drinkText}>{drink.name}</div>
            <div style={styles.drinkPrice}>
              {drink.price.toLocaleString()}원
            </div>
            <div style={styles.drinkCount}>남은 수량: {drink.count}</div>
            <button style={styles.selectBtn} disabled>
              선택
            </button>
          </div>
        ))}
      </div>

      {/* 결제 패널 */}
      <div style={styles.paymentPanel}>
        <div style={styles.cashBtns}>
          {CASHES.map((cash) => (
            <button key={cash} style={styles.cashBtn} disabled>
              {cash.toLocaleString()}원
            </button>
          ))}
        </div>
        <button style={styles.cardBtn} disabled>
          카드 결제
        </button>
      </div>

      {/* 투입 금액/잔액 표시 */}
      <div style={styles.balanceDisplay}>
        <div>투입 금액: 0원</div>
        <div>잔액: 0원</div>
        <button style={styles.returnBtn} disabled>
          반환
        </button>
      </div>

      {/* 음료 배출구 */}
      <div style={styles.outputSlot}>음료 배출구</div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  vendingMachine: {
    width: 340,
    margin: "40px auto",
    background: "#2e7d32",
    borderRadius: 16,
    boxShadow: "0 4px 24px #0003",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  drinkDisplay: {
    display: "flex",
    gap: 16,
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  drinkSlot: {
    background: "#fff",
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
    textAlign: "center",
    boxShadow: "0 2px 8px #0001",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  drinkText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 2,
  },
  drinkPrice: {
    color: "#388e3c",
    fontWeight: 500,
    fontSize: 15,
  },
  drinkCount: {
    fontSize: 13,
    color: "#888",
    marginBottom: 4,
  },
  selectBtn: {
    background: "#388e3c",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "4px 12px",
    cursor: "not-allowed",
    marginTop: 4,
  },
  paymentPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  cashBtns: {
    display: "flex",
    gap: 8,
    marginBottom: 4,
  },
  cashBtn: {
    background: "#fffde7",
    border: "1px solid #bdb76b",
    borderRadius: 4,
    padding: "4px 8px",
    fontWeight: 500,
    cursor: "not-allowed",
  },
  cardBtn: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "6px 18px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "not-allowed",
  },
  balanceDisplay: {
    background: "#222",
    color: "#0f0",
    fontFamily: "monospace",
    fontSize: 18,
    borderRadius: 6,
    padding: "8px 20px",
    margin: "8px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  returnBtn: {
    background: "#fff",
    color: "#222",
    border: "1px solid #888",
    borderRadius: 4,
    padding: "2px 10px",
    marginTop: 4,
    cursor: "not-allowed",
  },
  outputSlot: {
    width: "90%",
    height: 36,
    background: "#444",
    color: "#fff",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: 16,
    marginTop: 12,
    boxShadow: "inset 0 2px 8px #0006",
  },
};
