//backend application framework for nodejs
import { Express, Request, Response, NextFunction } from 'express';
import { UserRepository } from './data';

/**
 * Broadcast-function 
 * 
 * @callback callbackBroadcast
 * @param {string} tobeBroadcast The string, that is to be broadcast
 */

export class UserController {
    //create a UserData-Object
    private userRepo = new UserRepository();

    /** 
     * Creates an instance of UserController
     * 
     * @param {express.Express} app The express-app whose requests should be handled
     * @param {callbackBroadcast} broadcast A function by which the controller can initiate a server broadcast
     */
    public constructor(private readonly app: Express, private broadcast: { (dataToBroadcast: string): void }) {
        //default get-route
        this.app.get('/', (request, response, next) => {
            console.log('Server: Received empty-path get-request!');
            response.send("Hello World!");
        })

        //actual get-route
        this.app.get('/getAllData', (request, response, body) => this.handleGetAll(request, response, body));

        //post request handler
        this.app.post('/addUser', (request, response, next) => this.handleAddUser(request, response, next));

        //put request handler
        this.app.put('/changeUser', (request, response, next) => this.handleChangeUser(request, response, next));

        // delete request handler
        this.app.delete('/deleteUser', (request, response, next) => this.handleDeleteUser(request, response, next));

        console.log('Controller: In working order');
    }

    /**
     * GET request handler.
     * 
     * Provides the servers data.
     */
    private handleGetAll(request: Request, response: Response, next: NextFunction): void {
        console.log('Server: Received proper get-request!');
        response.send(JSON.stringify([...this.userRepo.getAllData()]));
    }

    /**
     * POST request handler.
     * 
     * Broadcasts automatically.
     */
    private handleAddUser(request: Request, response: Response, next: NextFunction): void {
        console.log('Server: Received post-request: %s', request.body);

        try {
            //add the user
            this.userRepo.addUser(request.body);

            //Broadcast the changed Data to all clients
            this.broadcastData();

            //send a response
            response.send('this was a post');
        }
        catch (err) {
            //if the data does not have the correct form
            console.log('Server: Wrong input: ERROR msg: %s', err);
            response.send('Warning: This was a wrong input for adding a user');
        }
    }

    /**
     * PUT request handler.
     * 
     * Broadcasts automatically.
     */
    private handleChangeUser(request: Request, response: Response, next: NextFunction): void {
        console.log('Server: Received put-request: %s', request.body);

        try {
            this.userRepo.changeUser(request.body);

            //Broadcast the changed Data to all clients
            this.broadcastData();

            //send a response
            response.send('this was a put');
        }
        catch (err) {
            //if the data does not have the correct form
            console.log('Server: Wrong input: ERROR msg: %s', err);
            response.send('Warning: This was a wrong input for changing user data');
        }
    }

    /**
     * DELETE request handler.
     * 
     * Broadcasts automatically.
     */
    private handleDeleteUser(request: Request, response: Response, next: NextFunction): void {
        console.log('Server: Received delete-request: %s', request.body);

        try {
            //try deletion
            this.userRepo.deleteUser(request.body);

            //Broadcast the changed Data to all clients
            this.broadcastData();

            //send a response
            response.send('this was a delete');
        }
        catch (err) {
            //if the data does not have the correct form
            console.log('Server: Wrong input: ERROR msg: %s', err);
            response.send('Warning: This was a wrong input for deleting a user');
        }
    }

    /**
     * Broadcasts the entire repository as a JSON-String. 
     * 
     * This is done in accordance with the broadcast-function that is passed in the classes constructor.
    */
    private broadcastData(): void {
        //Print data for debug purposes
        this.userRepo.logAllData();

        //Broadcast the changed Data to all clients
        console.log('Server: Broadcasting new data to all clients...');
        let dataToBroadcast = JSON.stringify([...this.userRepo.getAllData()]);
        this.broadcast(dataToBroadcast);
        console.log('Server: Data sent.')
    }

}