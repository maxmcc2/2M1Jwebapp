var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 500;
myCanvas.height = 500;
var ctx = myCanvas.getContext("2d");
function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(
  ctx,
  upperLeftCornerX,
  upperLeftCornerY,
  width,
  height,
  color
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}






class BarChart {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.titleOptions = options.titleOptions;
    this.maxValue = Math.max(...Object.values(this.options.data));
  }
  drawGridLines() {
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;
    var gridValue = 0;
    while (gridValue <= this.maxValue) {
      var gridY =
        canvasActualHeight * (1 - gridValue / this.maxValue) +
        this.options.padding;
      drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
      );
      drawLine(
        this.ctx,
        15,
        this.options.padding / 2,
        15,
        gridY + this.options.padding / 2,
        this.options.gridColor
      );
      // Writing grid markers 
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 0, gridY - 2);
      this.ctx.restore();
      gridValue += this.options.gridStep;
    }
  }


  drawBars() {
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;
    var barIndex = 0;
    var numberOfBars = Object.keys(this.options.data).length;
    var barSize = canvasActualWidth / numberOfBars;
    var values = Object.values(this.options.data);
    for (let val of values) {
      var barHeight = Math.round((canvasActualHeight * val) / this.maxValue);
      console.log(barHeight);
      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex % this.colors.length]
      );
        // Draw the label underneath the bar
       // this.ctx.save();
        this.ctx.textBaseline = "top";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 12px Arial";
       // this.ctx.fillText(Object.keys(this.options.data)[barIndex], barX + barSize / 2, this.canvas.height - this.options.padding + 5);
       // this.ctx.restore();
      barIndex++;
    }
    /* Draw the label underneath the bar
          this.ctx.save();
          this.ctx.textBaseline = "top";
          this.ctx.textAlign = "center";
          this.ctx.fillStyle = "black";
          this.ctx.font = "bold 12px Arial";
          this.ctx.fillText(Object.keys(this.options.data)[barIndex], barX + barSize / 2, this.canvas.height - this.options.padding + 5);
          this.ctx.restore();
          */
  }



  drawLabel() {
    this.ctx.save();
    this.ctx.textBaseline = "top"; // Change text baseline to top
    this.ctx.textAlign = this.titleOptions.align;
    this.ctx.fillStyle = this.titleOptions.fill;
    this.ctx.font = `${this.titleOptions.font.weight} ${this.titleOptions.font.size} ${this.titleOptions.font.family}`;
    let xPos = this.canvas.width / 2;
    if (this.titleOptions.align == "left") {
      xPos = 10;
    }
    if (this.titleOptions.align == "right") {
      xPos = this.canvas.width - 10;
    }
    this.ctx.fillText(this.options.seriesName, xPos, 0); // Position title at the top
    this.ctx.restore();
}

  drawLegend() {
    let pIndex = 0;
    let legend = document.querySelector("legend[for='myCanvas']");
    let ul = document.createElement("ul");
    legend.append(ul);
    for (let ctg of Object.keys(this.options.data)) {
      let li = document.createElement("li");
      li.style.listStyle = "none";
      li.style.borderLeft =
        "20px solid " + this.colors[pIndex % this.colors.length];
      li.style.padding = "5px";
      li.textContent = ctg;
      ul.append(li);
      pIndex++;
    }
  }
  draw() {
    this.drawGridLines();
    this.drawBars();
    this.drawLabel();
    this.drawLegend();
  }
}
var myBarchart = new BarChart({
  canvas: myCanvas,
  seriesName: "Service/Server",
  padding: 40,
  gridStep: 1,
  gridColor: "black",
  data: {
    "Mike": 8.5,
    "Max": 10,
    "Jackson": 5,
    "Average": 6
  },
  colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],
  titleOptions: {
    align: "center",
    fill: "black",
    font: {
      weight: "bold",
      size: "18px",
      family: "Lato"
    }
  }
});

/*
var myCanvas1 = document.getElementById("myCanvas1");
myCanvas1.width = 500;
myCanvas1.height = 300;

var myCanvas2 = document.getElementById("myCanvas2");
myCanvas2.width = 500;
myCanvas2.height = 300;
*/

myBarchart.draw();