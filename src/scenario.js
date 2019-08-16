function Scenario()
{
  this.offset = -1;
  this.scenes = [];
  this.timer=0;
}

Scenario.prototype.seekTo=function(time)
{
  this.scenes.forEach(function(t)
  {
    if(t.visible)
    {
      //t.visible=false;
      if(t.type=="transition" && typeof t.clearData=="function")
      {
        t.clearData();
      }else{
        t.clear();
      }
    }
  });
  forceClearScene(sceneTrans);
  forceClearScene(scene);

  //audio.currentTime=time;
  startTime=time;
  this.check(time);
};

Scenario.prototype.add=function(scene)
{
  //if(scene.constructor.name=='Scene')
  if(Scene.prototype.isPrototypeOf(scene))
  {
    this.scenes.push(scene);
  }else{
    console.log('scenario need sene')
  }
};

Scenario.prototype.check=function(timer)
{
  this.timer = timer;
  this.scenes.forEach(function(t)
  {
    if(timer>= t.start && timer< t.end && !t.visible)
    {
      t.init();
      t.resize();
    }else if(timer>= t.end && t.visible)
    {
      t.clear();
      //delete this.scenes[i];
    }
    if(t.rendering)
    {
      t.render();
    }
  });
};

Scenario.prototype.resize=function()
{
  for(var i=0;i<this.scenes.length;i++)
  {
    var t = this.scenes[i];
    if(t.visible)
    {
      t.resize();
    }
  }
};