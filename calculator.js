function escapeRegex(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function Add(numbers) {
  if (numbers === "") {
    return 0;
  }

  let delimiterRegex = /,|\n/;
  let numbersPart = numbers;

  if (numbers.startsWith("//")) {
    const newlineIndex = numbers.indexOf("\n");
    if (newlineIndex !== -1) {
      const delimiterSection = numbers.substring(2, newlineIndex);
      numbersPart = numbers.substring(newlineIndex + 1);
      const customDelimiters = [];
      const delimiterMatch = delimiterSection.matchAll(/\[([^\]]+)\]/g);
      for (const match of delimiterMatch) {
        customDelimiters.push(escapeRegex(match[1]));
      }

      if (customDelimiters.length > 0) {
        delimiterRegex = new RegExp(customDelimiters.join("|"));
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
    throw new Error(`negatives not allowed: ${negativeNumbers.join(",")}`);
  }

  return sum;
}
