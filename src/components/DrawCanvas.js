export function drawCanvas(ctx) {
    if (jsonData?.length > 0) {
    jsonData?.forEach((ele) => {
      ele?.rowData?.forEach((ele2) => {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(ele2?.cx, ele2?.cy, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "9px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(ele2?.number, ele2?.cx, ele2?.cy + 3, 20);
      });
    });
  }
}