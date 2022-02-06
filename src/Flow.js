import React from "react";
import Complex from "./Complex";

/**
 * 各素子のアドミタンスを記した配列から、アドミタンス行列Yを求める
 * @param {Complex[][]} admitances 
 * @return {Complex[][]} Y行列
 */
export function calcYMatrix (admitances) {
  let Y = [];
  for (let ix = 0; ix < admitances.length; ix++) {
    Y[ix] = [];
    for (let iy = 0; iy < admitances.length; iy++) {
      if (ix === iy) {
        // 全部たす
        Y[ix][iy] = admitances[ix].reduce((sum, element) => Complex.cadd(sum, element), new Complex(0, 0))
      } else {
        Y[ix][iy] = Complex.csub(new Complex(0, 0), admitances[ix][iy]);
      }
    }
  }
  return Y;
}

/**
 * I0, V1, I2 を未知数として、回路計算を行い各点の電圧および電流を求める
 * @param {Complex} V0 発電所出力電圧 [pu]
 * @param {Complex} V2 受電端電圧 [pu]
 * @param {Complex[][]} Y アドミタンス行列 [pu]
 * @return {Complex[]} `[I0, V1, I2]` `I0`:発電所出力電流[pu], `V1`:変電所2次側電圧[pu], `I2`:需要家消費電流[pu]
 */
export function flowDemandUnknown (V0, V2, Y) {
  const I1 = new Complex(0,0);
  const V1 = Complex.cdiv(Complex.csub(I1, Complex.cadd(Complex.cmul(Y[1][0], V0), Complex.cmul(Y[1][2], V2))), Y[1][1]);
  const I0 = Complex.cadd(Complex.cmul(Y[0][0], V0), Complex.cadd(Complex.cmul(Y[0][1], V1), Complex.cmul(Y[0][2], V2)));
  const I2 = Complex.cadd(Complex.cmul(Y[2][0], V0), Complex.cadd(Complex.cmul(Y[2][1], V1), Complex.cmul(Y[2][2], V2)));
  return [I0, V1, I2];
}
