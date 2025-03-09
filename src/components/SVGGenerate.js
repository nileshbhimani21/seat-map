export function SVGGenerate(paths, stage) {
  var svg = "";
  svg += '<svg width="20000" height="20000" xmlns="http://www.w3.org/2000/svg">\n';
  for (var i in paths) {   
    for (var j in paths[i].rowData) {     
      if(paths[i].rowData.filter(b => b?.cx === paths[i].rowData[j]?.cx  - 20)?.length === 0){
        svg +=
          '<text text-anchor="middle" alignment-baseline="middle" style="fill:black;font-size:8px;" x="' +
          (paths[i].rowData[j].cx - 15) +
          '" y="' +
          (paths[i].rowData[j].cy + 0.5) +
          '">' +
          paths[i].row +
          "</text>\n";
      }
      if(paths[i].rowData.filter(b => b?.cx === paths[i].rowData[j]?.cx  + 20)?.length === 0){
        svg +=
          '<text text-anchor="middle" alignment-baseline="middle" style="fill:black;font-size:8px;" x="' +
          (paths[i].rowData[j].cx + 15) +
          '" y="' +
          (paths[i].rowData[j].cy + 0.5) +
          '">' +
          paths[i].row +
          "</text>\n";
      }
      svg +=
        '<g id="' +
        paths[i].row +
        "-" +
        paths[i].rowData[j].number +
        '" class="seat"><circle r="7" cx="' +
        paths[i].rowData[j].cx +
        '" cy="' +
        paths[i].rowData[j].cy +
        '" fill="#a2a2a2" stroke="#444444" strokeWidth="1.6" opacity="1" />\n';
      svg +=
        '<text text-anchor="middle" alignment-baseline="middle" style="fill:black;font-size:7px;" x="' +
        paths[i].rowData[j].cx +
        '" y="' +
        (paths[i].rowData[j].cy + 0.5) +
        '">' +
        paths[i].rowData[j].number +
        "</text></g>\n";
    }
  }
  if(stage){
    svg+= '<g class="stage"><rect width="200" height="70" x="'+ stage.cx +'" y="'+ stage.cy +'" rx="5" ry="5" stroke="#444444" fill="#f4f4f4" /><text font-size="20" x="'+ (stage.cx + 60) +'" y="'+( stage.cy + 40) +'">STAGE</text></g>\n';
  }
  svg += "</svg>\n";
  return svg;
}