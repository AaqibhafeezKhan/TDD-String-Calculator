/**
 * Escapes special characters in a string for use in creating a Regular Expression.
 * @param {string} str - The input string (delimiter).
 * @returns {string} - The string with special regex characters escaped.
 */
function escapeRegex(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
* String Calculator Add Function - Steps 1-9
*
* Takes a string containing numbers and returns their sum.
* - Supports default delimiters: comma (,) and newline (\n).
* - Supports custom delimiters defined via an optional prefix: "//[delimiter]\n[numbers...]".
* - Delimiters can be of any length with the format: "//[delimiter]\n".
* - Allows multiple delimiters like this: “//[delim1][delim2]\n”.
* - Handles multiple delimiters with length longer than one char.
* - An empty string returns 0.
* - Handles any amount of numbers.
* - Calling Add with a negative number will throw an exception “negatives not allowed”
* - and the negative that was passed.
* - If there are multiple negatives, show all of them in the exception message.
* - Numbers bigger than 1000 should be ignored.
* - Assumes valid input sequences otherwise.
*
* @param {string} numbers - The input string.
* @returns {number} - The calculated sum.
* @throws {Error} - If negative numbers are encountered, with a message "negatives not allowed"
* followed by the list of negative numbers.
*/
function Add(numbers) {
  if (numbers === "") {
      return 0;
  }

  let delimiterRegex = /,|\n/;
  let numbersPart = numbers;

  if (numbers.startsWith("//")) {
      const newlineIndex = numbers.indexOf('\n');
      if (newlineIndex !== -1) {
          const delimiterSection = numbers.substring(2, newlineIndex);
          numbersPart = numbers.substring(newlineIndex + 1);
          const customDelimiters = [];
          const delimiterMatch = delimiterSection.matchAll(/\[([^\]]+)\]/g);
          for (const match of delimiterMatch) {
              customDelimiters.push(escapeRegex(match[1]));
          }

          if (customDelimiters.length > 0) {
              delimiterRegex = new RegExp(customDelimiters.join('|'));
          } else {
              const singleCharDelimiter = delimiterSection;
              if (singleCharDelimiter) {
                  delimiterRegex = new RegExp(escapeRegex(singleCharDelimiter));
              }
          }
      }
  }

  if (numbersPart === "") {
      return 0;
  }

  const numberStrings = numbersPart.split(delimiterRegex);

  let sum = 0;
  const negativeNumbers = [];

  for (const numStr of numberStrings) {
      if (numStr.trim() === "") {
          continue;
      }
      const num = parseInt(numStr, 10);
      if (num < 0) {
          negativeNumbers.push(num);
      } else if (num <= 1000) {
          sum += num;
      }
  }

  if (negativeNumbers.length > 0) {
      throw new Error(`negatives not allowed: ${negativeNumbers.join(',')}`);
  }

  return sum;
}

document.addEventListener('DOMContentLoaded', () => {
  const numberInput = document.getElementById('numberInput');
  const calculateButton = document.getElementById('calculateButton');
  const outputLog = document.getElementById('outputLog');

  calculateButton.addEventListener('click', () => {
      const inputNumbers = numberInput.value;
      outputLog.textContent = ''; 

      try {
          const result = Add(inputNumbers);
          outputLog.textContent = `Result: ${result}`;
      } catch (error) {
          outputLog.textContent = `Error: ${error.message}`;
      }
  });
});
