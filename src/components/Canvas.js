export function canvasDrow() {
    var canvas = document.querySelector("#canvasDrow");
  
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 6;
  
    var c = canvas.getContext("2d");
  
    // Interacting with The Canvas | HTML5 Canvas Tutorial for Beginners - Ep. 4
  
    // // 1. reacangles 2.Lines 3.Arcs/Circles 4.Bezier Curves 5.Images 6.Text
    // // c.fillRect(x,y, width, height);
    // c.fillStyle = "#d4d4d4";
    // c.fillRect(100,100,100,100);
    // c.fillRect(300,100,100,100);
    // c.fillRect(500,100,100,100);
  
    // //Line
    // c.beginPath();
    // c.moveTo(0,500);
    // c.lineTo(300,0);
    // c.lineTo(500,500);
    // c.lineTo(0,500);
    // c.strokeStyle = "#f00";
    // c.stroke();
  
    // //Arcs/Circles
    // for (var i = 0; i < 50; i++){
    //     var x = Math.random() * window.innerWidth;
    //     var y = Math.random() * window.innerHeight;
    //     c.beginPath();
    //     c.arc(x , y ,30,0,Math.PI * 2, false);
    //     c.strokeStyle = "blue";
    //     c.stroke();
    // }
  
    var mouse = {
      x: undefined,
      y: undefined
    };
    var maxRadius = 40;
    // var minRadius = 2;
  
    var colorArray = ["#ffaa33", "#99ffaa", "#00ff00", "#4411aa", "#ff1100"];
  
    window.addEventListener("mousemove", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
    });
  
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth - 2;
      canvas.height = window.innerHeight - 6;
  
      init();
    });
  
    function Circle(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.minRadius = radius;
      this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  
      this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
      };
  
      this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
  
        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
          if (this.radius < maxRadius) {
            this.radius += 1;
          }
        } else if (this.radius > this.minRadius) {
          this.radius -= 1;
        }
  
        this.draw();
      };
    }
  
    var circleArray = [];
  
    function init() {
      circleArray = [];
  
      for (var i = 0; i < 2000; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = Math.random() - 0.5;
        //  * 8
        var dy = Math.random() - 0.5;
        // * 8
        circleArray.push(new Circle(x, y, dx, dy, radius));
      }
    }
  
    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, innerWidth, innerHeight);
  
      // circle.update();
      for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }
    }
    init();
    animate();
  }
  
  export function canvasDrow2(paths) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    for (var i in paths) {
      ctx.arc(paths[i].cx, paths[i].cy, 5, 0, 2 * Math.PI);
    }
    ctx.fillStyle = "#fff";
    ctx.fill();
  }