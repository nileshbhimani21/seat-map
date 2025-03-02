
export function seatNumber(text) {
  let data = text.split("-");
  data[1] = parseInt(data[1], 10);

  return data;
}
export function jsonGenerate(data) {
  const result = [];
// Loop to create rows
for (let r = 0; r < data?.rows; r++) {
    let rowData = [];
    
    // Loop to create each element in a row
    for (let c = 1; c <= data?.columns; c++) {
        rowData.push({
            cx: c * 20, // Calculate the x-coordinate
            cy: (r + 1) * 20, // Calculate the y-coordinate based on row
            number: c // The number of the element
        });
    }

    // Add the row to the result array
    result.push({
        row: String.fromCharCode(65 + r), // Convert row number to letter (A, B, ...)
        rowData: rowData
    });
}
return result
}