import { User, SimpleUser, IdentifiedUser, buildUser, changeUser, simplifyUser, isSimpleUser, isIdentifiedUser, isUser } from './user';
import { MapPersistor } from './mappersistor';
import { Persistor } from './persistor';

/**
 * Manages a map that holds Users
*/
export class UserRepository {

  private persist: Persistor<User>;
  private users = new Map<number, User>();
  private idCounter = 0;

  /** 
   * Creates an instance of UserRepository
   */
  public constructor() {
    //create a new persistor object
    this.persist = new MapPersistor<User>('./userdata.txt');

    //have it load the user-map or create a new one, if it doesn't exist
    this.persist.loadData().then(loadedData => {
      this.users = loadedData.theMap;
      this.idCounter = loadedData.idCounter;

      console.log('Data: Initialized data storage');
      console.log('Data: Currently holding %s user(s)', this.users.size);

      //Print data for debug purposes
      this.logAllData();
    });

  };

  /** 
   * Creates a new user and adds him to the map
   * 
   * @param {SimpleUser} info An object holding the relevant information for the creation of the User-object
   */
  public addUser(info: SimpleUser): void {
    //throw an Error for incorrect input
    if (!isSimpleUser(info)) {
      throw new Error("Data: addUser: Expected SimpleUser-object")
    }

    //create a user with these exact specifications and a current timestamp, also add him to our map
    this.users.set(this.idCounter, buildUser(info));

    //log
    console.log('Data: Added user nr. %s', this.idCounter);
    console.log('Data: Now holding %s user(s)', this.users.size);

    //prepare for next added user
    this.idCounter++;

    //persist the map
    this.persist.persistData(this.users);
  }

  /** 
   * Changes the data of a chosen user within the map
   * 
   * @param {IdentifiedUser} info An object holding the new information as well as the id of the User-object that is to be changed
   */
  public changeUser(info: IdentifiedUser): void {
    //throw an Error for incorrect input
    if (!isIdentifiedUser(info)) {
      throw new Error("Data: addUser: Expected IdentifiedUser-object")
    }

    //try to find the User with key=id
    if (!this.users.has(info.id)) {
      //else throw an error
      throw new Error("Data: addUser: Can't change nonexistent user");
    }
    //if he exists change the users title, firstname and lastname to the new values
    this.users.set(info.id, changeUser(simplifyUser(info), this.users.get(info.id)!));

    //log
    console.log('Data: Changed data for user nr. %s', info.id);
    console.log('Data: Currently holding %s user(s)', this.users.size);

    //persist the map
    this.persist.persistData(this.users);

  }

  /** 
   * Deletes the chosen user within the map
   * 
   * @param {number} id The id-key of the object that is to be deleted
   */
  public deleteUser(info: {id: number}): void {
    //Try to delete the user with key=id, if he does not exist throw an error
    if (!this.users.delete(info.id)) {
      throw new Error("Data: deleteUser: Can't delete nonexistent user");
    }

    console.log('Data: Deleting user nr. %s', info.id);
    console.log('Data: Currently holding %s user(s)', this.users.size);

    //persist the map
    this.persist.persistData(this.users);
  }

  /** 
   * Returns the entire map
   * 
   * @return {Map<number, User>} The map of users that is managed by this class
   */
  public getAllData(): Map<number, User> {
    console.log('Data: Returning all user data');
    console.log('Data: Currently holding %s user(s)', this.users.size);
    return this.users;
  }

  /** 
   * Prints the entirety of maps content in the log
   */
  public logAllData(): void {
    console.log('---------------------------------------------');
    console.log('DATA: CURRENT USERS:');
    console.log('---------------------------------------------');
    this.users.forEach((value, key, map) => {
      console.log('user no. %s:', key);
      console.log('title: %s', this.users.get(key)!.title);
      console.log('firstName: %s', this.users.get(key)!.firstName);
      console.log('lastName: %s', this.users.get(key)!.lastName);
      console.log('joinedAt: %s', this.users.get(key)!.joinedAt);
      console.log('---------------------------------------------');
    });
  }
}