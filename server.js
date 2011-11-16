var file = require('fs').readFileSync('index.html');

var server = require('http').createServer(function(req, res){
    res.end(file);
});

var nowjs = require('now');

var everyone = nowjs.initialize(server);

var pos = {left: 0, top: 0};
var scores = {};
var id = 0;

nowjs.on('connect', function(){
  scores[this.now.name] = 0;
  this.now.updateBlock(pos, id, scores);
});


everyone.now.clickedTarget = function(targetId) {
  if(targetId !== id) {
    return;
  }
  
  scores[this.now.name] += 50;
  id++;
  
  pos.left = Math.random() * 450;
  pos.top = Math.random() * 450;
  
  everyone.now.updateBlock(pos, id, scores);

}


server.listen(8000);
