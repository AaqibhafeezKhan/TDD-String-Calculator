import { Add } from "./calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  const numberInput = document.getElementById("numberInput");
  const calculateButton = document.getElementById("calculateButton");
  const outputLog = document.getElementById("outputLog");

  calculateButton.addEventListener("click", () => {
    const inputNumbers = numberInput.value;
    outputLog.textContent = "";

    try {
      const result = Add(inputNumbers);
      outputLog.classList.remove("error");
      outputLog.classList.add("success");
      outputLog.textContent = `Result: ${result}`;
    } catch (error) {
      outputLog.classList.remove("success");
      outputLog.classList.add("error");
      outputLog.textContent = `Error: ${error.message}`;
    }
  });
});
