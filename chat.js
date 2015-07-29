// - Implement a server which will:
// - Broadcast incoming messages to each connected client
// - support multiple clients
// - handles client disconnect (i.e. does not send messages to disconnected clients)
// - keep a history of chat messages and broadcast the history to new clients when they connect


var net = require('net');
var fs = require('fs');
var notification = require('node-notifier');

var password = 'secret';

var clients =[];
notification.notify({
  name: '',
  connect: ''
})

var server = net.createServer(function(c){
  c.on('connect', function(arg) {
    console.log(arg);

    c.write(notification);
  });

console.log(clients);


  c.on('data', function(data) {

    var input = data.toString().trim();
    var inputArray = input.split(" "); // splits the data on spaces
    var command = inputArray.splice(0,1)[0]; // grabs the first word/element the user entered, removes it and saves it to the "command" variable

    switch (command) {
      // user wants to add a new message
      case 'add':
        var newMessage = inputArray.join(" "); // joins all the words in inputArray

        // read in and parse our data
        var data = fs.readFileSync('./data.json', 'utf8');
        arrayOfMessages = JSON.parse(data);

        //setting our new ID up to be unique
        var lastIndex = arrayOfMessages.length - 1;
        var newId = parseInt(arrayOfMessages[lastIndex].id) + 1; 
        // sets the new ID to one greater than the last element's ID - prevents duplication of IDs
      

        // Add user's NEW message to the array of objects we read in & parsed
        var userMessage = { message: newMessage, id: newId };
        arrayOfMessages.push(userMessage);

        // Stringify ('deflate') the arrayOfMessages object and save it back to the same file!
        var stringifiedMessages = JSON.stringify(arrayOfMessages);
        fs.writeFileSync('./data.json', stringifiedMessages);

        // send a confirmation to the client
        c.write('Message added! Thanks\n');
        break;

        // user want to see all messages
        case "list":
          // read in and parse our data
          var data = fs.readFileSync('./data.json', 'utf8');
          arrayOfMessages = JSON.parse(data);

          // send over dem messages
          c.write('     All messages\n¸.·´¯`·.´¯`·.¸¸.·´¯`·.¸><(((º>\n\n');
          arrayOfMessages.forEach(function(el){
            c.write(' ' + el.id + '. ' + el.message + '\n');
          });
          break;

          // User wants to delete a specific message
          case 'delete':
          // grab the ID of message to delete
          var idToDelete = parseInt(inputArray[0]);

          // read in and parse our data
          var data = fs.readFileSync('./data.json', 'utf8');
          arrayOfMessages = JSON.parse(data);

          // Iterate through our data, find the record with the id entered by the user, and remove it
          arrayOfMessages.forEach(function(el, index){
            if (el.id === idToDelete) {
              console.log('Deleting message ' + el.id + '!\n');
            }
          });

          // Stringify and save
          var stringifiedMessages = JSON.stringify(arrayOfMessages);
          fs.writeFileSync('./data.json', stringifiedMessages);

          break;

          // in case the user wants to get rid of all their files

          case 'clear':
            // check and see if password is correct
            if (inputArray[0] === password) {
              // Overwrie the json file with an empty array - clears out all messages
              fs.writeFileSync('./data.json','[]');
              c.write('All messages cleared!\n');
            }  else {
              // Deny access if password is incorrect.
              c.write('Access Denied. Wrong password.\n');
            }
            break;

            default:
            c.write("\n*-------------------------*\n            wat            \n*-------------------------*\n I didn't understand that. Please enter one of the following commands:\n add YOUR MESSAGE HERE\n list\n delete ID_NUMBER_HERE\n clear PASSWORD\n*-------------------------*\n\n");
    }

  });

});
var port = 3000;

server.listen(3000, function(){
  console.log('Listenin in port ' + port);
});
