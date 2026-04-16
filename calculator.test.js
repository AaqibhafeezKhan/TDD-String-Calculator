import { describe, it, expect } from "vitest";
import { Add } from "./calculator";

describe("String Calculator", () => {
  it("should return 0 for an empty string", () => {
    expect(Add("")).toBe(0);
  });

  it("should return the number itself for a single number", () => {
    expect(Add("1")).toBe(1);
    expect(Add("5")).toBe(5);
  });

  it("should return the sum of two numbers", () => {
    expect(Add("1,5")).toBe(6);
  });

  it("should handle any amount of numbers", () => {
    expect(Add("1,2,3,4,5")).toBe(15);
  });

  it("should handle new lines between numbers", () => {
    expect(Add("1\n2,3")).toBe(6);
  });

  it("should support different delimiters", () => {
    expect(Add("//;\n1;2")).toBe(3);
  });

  it("should throw an exception for negative numbers", () => {
    expect(() => Add("1,-2,3")).toThrow("negatives not allowed: -2");
  });

  it("should show all negative numbers in the exception message", () => {
    expect(() => Add("1,-2,-3,4")).toThrow("negatives not allowed: -2,-3");
  });

  it("should ignore numbers bigger than 1000", () => {
    expect(Add("2,1001")).toBe(2);
    expect(Add("1000,2")).toBe(1002);
  });

  it("should handle delimiters of any length", () => {
    expect(Add("//[***]\n1***2***3")).toBe(6);
  });

  it("should handle multiple delimiters", () => {
    expect(Add("//[*][%]\n1*2%3")).toBe(6);
  });

  it("should handle multiple delimiters with length longer than one char", () => {
    expect(Add("//[***][%%]\n1***2%%3")).toBe(6);
  });

  it("should handle an empty string after custom delimiter declaration", () => {
    expect(Add("//;\n")).toBe(0);
  });
});
