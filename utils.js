// utils.js

const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };
  
  const lcmTwo = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
  };
  
  const generateFibonacci = (n) => {
    if (!Number.isInteger(n) || n < 0)
      throw new Error("Fibonacci input must be a non-negative integer");
  
    if (n === 0) return [0];
  
    const result = [0, 1];
  
    for (let i = 2; i <= n; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
  
    return result.slice(0, n + 1);
  };
  
  const isPrime = (num) => {
    if (!Number.isInteger(num) || num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  
  const filterPrimes = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0)
      throw new Error("Prime input must be a non-empty array");
  
    if (!arr.every(Number.isInteger))
      throw new Error("Prime array must contain integers only");
  
    return arr.filter(isPrime);
  };
  
  const calculateLCM = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0)
      throw new Error("LCM input must be a non-empty array");
  
    if (!arr.every(Number.isInteger))
      throw new Error("LCM array must contain integers only");
  
    return arr.reduce((acc, val) => lcmTwo(acc, val));
  };
  
  const calculateHCF = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0)
      throw new Error("HCF input must be a non-empty array");
  
    if (!arr.every(Number.isInteger))
      throw new Error("HCF array must contain integers only");
  
    return arr.reduce((acc, val) => gcd(acc, val));
  };
  
  module.exports = {
    generateFibonacci,
    filterPrimes,
    calculateLCM,
    calculateHCF
  };
  