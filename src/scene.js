var Scene = function (name,start,end) {
  var generateUid = function (separator) {
    var delim = separator || "-";
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
  };
  this.id               = generateUid();
  this.name             = name ? name : this.id;
  this.type_default     = 0;
  this.type_transition  = 1;
  this.type_scene       = 2;
  this.type_effect      = 3;
  this.type_title       = 4;
  this.type_secondary   = 5;
  this.allTypes         = ['default','transition','scene','effect','title','scene secondary'];
  this.type             = this.type_default;
  this.obj              = [];
  this.assets           = {};
  this.params           = {};
  this.start            = start;
  this.end              = end;
  this.rendering        = false;
  this.visible          = false;
};
Scene.prototype.getTypeName = function()
{
  return this.allTypes[this.type] ? this.allTypes[this.type] : "default";
};
Scene.prototype.resize  = function () {};
Scene.prototype.render  = function () {};
Scene.prototype.init    = function () {
  this.visible = true;
  this.rendering=true;
};
Scene.prototype.addObj  = function(obj)
{
  this.obj.push(obj);
  if(typeof scene!="undefined")
    scene.add(obj);
  else
    console.log('warning threejs scene not found');
};
Scene.prototype.GUI=function(params)
{
  if(params)
    this.params = params;

  if(gui)
  {
    var options = gui.addFolder(this.name);
    for(var a in this.params)
    {
      if(a!='options')
      {
        if(this.params.options)
        {
          if (this.params.options[a].min && this.params.options[a].max)
          {
            options.add(this.params, a, this.params.options[a].min, this.params.options[a].max);
          }else{
            options.add(this.params, a);
          }
        }else{
          options.add(this.params, a);
        }
      }
    }
  }else{
    console.log('no gui');
  }
};
Scene.prototype.removeFolder= function(name) {
  if(gui.__folders[name])
  {
    gui.__folders[name].close();
    gui.__folders[name].domElement.parentNode.parentNode.removeChild(gui.__folders[name].domElement.parentNode);
    gui.__folders[name] = undefined;
    gui.__folders[name] = null;
  }
  delete  gui.__folders[name];
  gui.onResize();
};
Scene.prototype.clear=function()
{
  if(gui)
    this.removeFolder(this.name);

  this.obj.forEach(function(b)
  {
    scene.remove(b);
  });
  for(var b in this.obj)
  {
    delete this.obj[b];
  }
  for(var c in this.assets)
  {
    delete this.assets[c];
  }
  this.visible    = false;
  this.rendering  = false;
};