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
  this.type_slider      = 1;
  this.type_panel       = 2;
  this.type_survey      = 3;
  this.allTypes         = ['default','slider','panel','survey'];
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

Scene.prototype.clear=function()
{
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
