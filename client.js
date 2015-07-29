// write incoming messages from the server
// send messages from standard input to a server
var net = require('');

var client = net.Socket();

client.connect({ port: 3000, host: 'localhost'}, function(){
  console.log('Connected to server');

  client.on('data', function(data){
    console.log(data.toString().trim());
  });

  process.stdin.on('data', function(data){
    client.write(data.toString().trim());
  });


client.on('end', function(){
  console.log('disconnected from server');
});


});