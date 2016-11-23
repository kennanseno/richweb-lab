import {Observable} from 'rxjs/Rx';

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

createClock();

function createClock() {
    var segments = 6;
    var thetaInc = Math.PI / segments;
    var theta = 0;
    var radius = 60;
    var centerX = 75;
    var centerY = 75;

    //create outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 65, 0, Math.PI * 2, true);

    //create hour ticks    
    while (theta < Math.PI * 2)
    {
        var x;
        var y;
        x = centerX + Math.sin(theta) * radius;
        y = centerY + Math.cos(theta) * radius;
        var endX = centerX + Math.sin(theta) * (radius - 5);
        var endY = centerY + Math.cos(theta) * (radius - 5);
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        theta += thetaInc;
        ctx.stroke();
    }
}