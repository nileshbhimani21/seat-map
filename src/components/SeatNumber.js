import { toLetters } from "./ToLetters";

export function seatNumber(text) {
  let data = text.split("-");
  data[1] = parseInt(data[1], 10);

  return data;
}
export function jsonGenerate(data) {
  let jsonData = [];
  for (let i = 0; i < data?.rows; i++) {
    for (let j = 0; j < data?.columns; j++) {
      // Calculate cx and cy based on row (i) and column (j)
      jsonData.push({
        cx: 20 + j * 20, // Increment cx by 20 for each column
        cy: 20 + i * 20, // Increment cy by 20 for each row
        row: toLetters(i + 1),
        number: j + 1
      });
    }
  }
  return jsonData;
}