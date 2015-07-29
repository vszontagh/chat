## TCP Chat App

Your task is to build a chat app using TCP!
You **must**:
- Implement a server which will:
    - Broadcast incoming messages to each connected client
    - support multiple clients
    - handles client disconnect (i.e. does not send messages to disconnected clients)
    - keep a history of chat messages and broadcast the history to new clients when they connect
- Implement a client which will:
    - Send messages from standard input to the server
    - Print all incoming messages from the server
- Write a user spec for how users will interact with your app.  Try to do this **BEFORE** you start coding, and update it as necessary.
- Create a repo on Github for your chat app.

In addition, you may want to try some of the following things:
  - allow the client to have special commands, possibly including:
      - `/yell i am so cool` produces `I AM SO COOL`
      - `/yell` (with no proceeding message) turns into `AHHHHH!!!!`
      - `/tableflip` could turn into `(╯°□°）╯︵ ┻━┻`
      - `/cowsay` could turn into a cowsay version of the text
  - colorize messages like `User connected` or `User disconnected` with chalk (https://www.npmjs.com/package/chalk)
      - also allow the client to specify a color for their message  
        i.e. `/color green It ain't easy being green.`
  - Use notifier (https://www.npmjs.com/package/node-notifier) to notify the user when an incoming message comes in.


**Harder Challenges:**
- allow clients to have usernames
- allow users to boot each other off the server (for example, `/kick jack` would tell the server to boot jack from the server.
- Allow clients to send private messages to each other
- Allow chat rooms for certain sets of users
- Show all logged in users (if you added usernames).

We would like you to try hosting your app on Digital Ocean.  When you have something working, you can have other classmates connect to your server, which is usually fun :-). 

For reference:

Here are the Node docs for the `net` module: https://nodejs.org/api/net.html
