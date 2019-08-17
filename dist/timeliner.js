"use strict";

var debugTimeline = false;
var timelineItems = {};
var cursorTimeline = null;
var _sequence = [
  //scene2(0,1000)
];

var sequence = [

//Screenshots
sceneCapture(2.35), // Intro
sceneCapture(7.141), // Scene1
sceneCapture(22.895), // Scene2
sceneCapture(33.649), // Scene3
sceneCapture(57.486), // Scene4
sceneCapture(70.123), // Scene5

//Intro
sceneText(2, 1000, "mandarine"), sceneText(4, 1000, "presents"), effectBloomTo(0, .3, 100), setSpeed(0, .015), sceneSparks("sparks", 6, 13.5), setBgColor(0, C.Power, 1),

//Scene1 Cube and Sparks
scene1("scene1", 0, 13.5), effectFlash(3, 3), setSpeed(6, .05), sceneCameraJump(5.3, 6), effectGlitch(5.8, 6.5), setBgColor(6, C.Background, 1), displayImage(6, 13.5), effectFlash(10, 5), effectUnPixalate(12, 13, 1), transition1("transition1", 13, 13.75, C.Power),

//Scene2 WireOscilloscope
setSpeed(13.5, .020), effectBloomTo(13.5, 5, 500), setBgColor(13.5, "#000", 1), scene2("scene2", 13.5, 29), effectFlash(15, 5, 2000), effectFlash(20, 5, 2000), effectFlash(25, 5, 2000), transition2("transition2", 26.5, 29, C.Power),

//Scene3 Cube and scrollText 3D
scene3("scene3", 29, 52), sceneScrollText(30, 52), setBgColor(29, "#000", 1), effectBloomTo(29, 4, 1000), effectFlash(32, 20), effectFlash(38, 20), effectFlash(43, 20), effectFlash(49, 20), effectPixalate(51, 1), effectGlitch(51.5, 52.5),

//Scene4 Spaceship
scene4("scene4", 52, 68), effectBloomTo(52, .3, 1000), sceneSparks("sparks", 52, 68, C.Power), effectUnPixalate(55, 56, 1), effectGlitch(54, 55.5), effectGlitch(52, 2), effectGlitch(56, 2), effectGlitch(59, 10, 2000), sceneText(55, 2000, "code by med"), sceneText(60, 2000, "gfx by fra", "black"), sceneText(65, 2000, "music by med"), effectGlitch(67.1, 68.1), transition3("transition3", 67, 68.5, C.Power),

//Scene5 Greets
setBgColor(68, "#000", 1), effectBloomTo(68.112, 3, 50), scene5("scene5", 68.112, 90), transition4("transition4", 88, 91, C.Power),

//Scene6 Credits scroll screenshots and texts
effectBloomTo(90.371, 2, 50), sceneSparks("sparks", 90.371, 155, "#101010"), scene6("scene6", 90.371, 155), setBgColor(90.371, "#101010", 1)];

function timeliner(t) {
  var end = 0;
  t.forEach(function (b) {
    s.add(b);

    if (!timelineItems[b.getTypeName()]) timelineItems[b.getTypeName()] = [];

    timelineItems[b.getTypeName()].push({
      name: b.name,
      type: b.getTypeName(),
      start: b.start,
      end: b.end
    });

    if (b.end > end) end = b.end;
  });
  MNDRN.timer.endTime = endTimeline = end;
  MNDRN.timeline = timelineItems;
  if (MNDRN.debug.enabled) {

    var containerTimeline = d.createElement('div');
    containerTimeline.style.width = "100%";
    containerTimeline.style.position = "absolute";
    containerTimeline.style.bottom = "0";
    containerTimeline.style.height = "auto";
    containerTimeline.style.fontFamily = "Helvetica";
    containerTimeline.style.fontSize = ".65em";

    var blockH = 20;
    var blockLeft = 10;
    var blockRight = 100 - blockLeft;
    var blockName = d.createElement('div');
    blockName.style.background = "gray";
    blockName.style.width = blockLeft + "%";
    blockName.style.float = "left";
    containerTimeline.appendChild(blockName);

    var blockDuration = d.createElement('div');

    blockDuration.style.background = "gray";
    blockDuration.style.width = blockRight + "%";
    blockDuration.style.float = "left";
    containerTimeline.appendChild(blockDuration);

    var itemName = d.createElement('div');
    itemName.appendChild(document.createTextNode("time"));
    itemName.style.height = blockH - 4 + "px";
    itemName.style.paddingTop = "4px";
    itemName.style.paddingLeft = "4px";
    itemName.style.background = "#333";
    itemName.style.color = "white";
    blockName.appendChild(itemName);

    var itemDuration = d.createElement('div');
    itemDuration.style.height = blockH + "px";
    itemDuration.style.background = "#555";
    itemDuration.style.color = "white";
    blockDuration.appendChild(itemDuration);
    /*
        itemDuration.addEventListener('click', function(e) {
          var scrW = w.innerWidth || e.clientWidth || g.clientWidth;
          var seekTime = e.offsetX/(scrW*blockRight/100)*end;
          s.seekTo(seekTime);
        });
    */
    for (var tt = 0; tt <= end; tt += 5) {
      var item = d.createElement('div');
      item.appendChild(document.createTextNode("| " + tt));
      item.style.paddingTop = "4px";
      item.style.paddingLeft = "4px";
      item.style.display = "inline-block";
      item.style.position = "absolute";
      item.style.height = blockH - 4 + "px";
      item.style.left = tt / end * blockRight + blockLeft + "%";
      item.style.top = l * blockH - 2 + "px";
      item.style.textAlign = "let";
      itemDuration.appendChild(item);
    }
    var l = 1;
    for (var c in timelineItems) {
      var itemName = d.createElement('div');
      itemName.style.paddingTop = "4px";
      itemName.style.paddingLeft = "4px";
      itemName.appendChild(document.createTextNode(c));
      itemName.style.height = blockH - 4 + "px";
      itemName.style.background = l % 2 == 0 ? "#efefef" : "#cdcdcd";
      blockName.appendChild(itemName);

      var itemDuration = d.createElement('div');
      itemDuration.style.background = l % 2 == 0 ? "#cdcdcd" : "#efefef";
      itemDuration.style.height = blockH + "px";

      blockDuration.appendChild(itemDuration);
      var cc = 0;
      timelineItems[c].forEach(function (i) {
        var item = d.createElement('div');
        item.appendChild(document.createTextNode(i.name));
        if (c == "scene") {
          var color = cc % 2 == 0 ? "#ffbb00" : "#eeaa00";
        } else if (c == "transition") {
          var color = cc % 2 == 0 ? "#ff5555" : "#ffaaaa";
        } else if (c == "scene secondary") {
          var color = cc % 2 == 0 ? "#eeaaee" : "#ffbbff";
        } else if (c == "effect") {
          var color = cc % 2 == 0 ? "#ff5555" : "#ffaaaa";
        } else if (c == "title") {
          var color = cc % 2 == 0 ? "#00BBFF" : "#55CCFF";
        } else if (c == "default") {
          var color = cc % 2 == 0 ? "#55FF55" : "#AAFFAA";
        }
        item.style.background = color;
        item.style.display = "inline-block";
        item.style.position = "absolute";
        item.style.height = blockH + "px";
        item.style.paddingTop = "4px";
        item.style.paddingLeft = "4px";
        item.style.height = blockH - 4 + "px";
        item.style.overflow = "hidden";
        item.style.left = i.start / end * blockRight + blockLeft + "%";
        item.style.top = l * blockH + "px";
        item.style.width = (i.end - i.start) / end * blockRight + "%";
        item.style.textAlign = "left";
        itemDuration.appendChild(item);
        cc++;
      });
      l++;
    }

    cursorTimeline = d.createElement('div');
    cursorTimeline.style.zIndex = 100;
    cursorTimeline.style.height = blockH * l + "px";
    cursorTimeline.style.background = "red";
    cursorTimeline.style.width = "2px";
    cursorTimeline.style.position = "absolute";
    cursorTimeline.style.bottom = 0;
    containerTimeline.appendChild(cursorTimeline);
    blockDuration.style.height = blockH * l + "px";
    g.appendChild(containerTimeline);
    /*
        gui.add(_debugger, "play");
        gui.add(_debugger, "pause");
        gui.add(_debugger, "reset");
    */
  }
}