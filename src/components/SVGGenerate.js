export function SVGGenerate(paths) {
    var svg = "";
    svg += '<svg width="20000" height="20000" xmlns="http://www.w3.org/2000/svg">\n';
    for (var i in paths) {
      svg +=
        '<g id="' +
        paths[i].row +
        "-" +
        paths[i].number +
        '" class="seat"><circle r="7" cx="' +
        paths[i].cx +
        '" cy="' +
        paths[i].cy +
        '" fill="#a2a2a2" stroke="#444444" strokeWidth="1.6" opacity="1" />\n';
      svg +=
        '<text text-anchor="middle" alignment-baseline="middle" style="fill:black;font-size:7px;" x="' +
        paths[i].cx +
        '" y="' +
        (paths[i].cy + 0.5) +
        '">' +
        paths[i].number +
        "</text></g>\n";
    }
    svg += "</svg>\n";
    return svg;
  }