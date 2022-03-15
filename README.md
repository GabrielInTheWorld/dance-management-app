# dance-management-app

## Exercise

By using a user management app, users in the dance club "broken leg" will be stored. New users will sometimes join, existing users are updated or left the club and will be deleted.

## Exercise 1

Create a server by using TypeScript, which communicates with clients by using the websocket-protocol.
  
1. There have to be a route, a client can connect to the server by using the websocket-protocol.
2. There have to be a route, a client can send data to the server (using "POST", "PUT" as well as "DELETE").
3. The server has to be able to send data to clients by using the websocket-protocol.
4. Data sent from a client have to be persisted.

## Exercise 2

Create a client, which will communicate with the server, by using the Angular CLI.

1. Create a view used as entrypoint for the app.
2. Create a view, which will be used to create, update or delete a user. These actions have to be recorded and sent to the server by the client.
3. Create a view, which shows information about a user (detailview).
4. Create a view, which shows every user in a list. Clicking on one row should navigate to the detailview of the clicked user.
5. Furthermore, the list of users has to be reachable from the entrypoint and the client has to get updates from the server by using the websocket-protocol and shows them in realtime.

## Hints

To fulfill the exercise only the use of TypeScript and Angular are requirements. Every other technology, library or tool can be chosen freely.
Code has to be written following the principles of "Clean Code" and SOLID (for further information see [Coding Guidelines](https://github.com/OpenSlides/OpenSlides/wiki/Coding-Guidelines)). For the server is any kind of data management required. If this is a real database or just an object stored in-memory can be chosen freely.
