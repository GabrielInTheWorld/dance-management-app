export type Title = 'Dr.' | 'Prof.' | null;

// const <name>: <Typ> = <Inhalt>
const possibleTitles: Title[]=['Dr.', 'Prof.', null];

//An interface for user-data
export interface SimpleUser {
  title: Title;
  firstName: string;
  lastName: string
}

//An interface for user-data that includes an id
export interface IdentifiedUser extends SimpleUser {
  id: number
}

//An interface for user-data that includes a join-date
export interface User extends SimpleUser{
  readonly joinedAt: number //must be Unix Timestamp (generated with Date.now)
}

/**
 * Type guard that tests, whether an object has the required attributes to be a SimpleUser.
 * 
 * @param {any} suspectedUser Whatever is to be tested
 * @param {number} numberOfAdditionalKeys How many additional attributes should be tolerated (defaults at 0, a smaller number is replaced with 0)
 * @returns {boolean} True if the object can be considered a SimpleUser
 */
function _isSimpleUser (suspectedUser: any, numberOfAdditionalKeys: number = 0): suspectedUser is SimpleUser {
  let tolerate = numberOfAdditionalKeys;
  if (tolerate < 0){
    tolerate = 0;
  }

  //Wenn suspectedUser null ist, gibt suspectedUser?.title undefined zurück
  return possibleTitles.includes(suspectedUser?.title) && typeof suspectedUser?.firstName === 'string' && typeof suspectedUser?.lastName === 'string' && Object.keys(suspectedUser).length <= tolerate+3;

  //Alternative:
  //if (!!suspectedUser && typeof suspectedUser === 'object'){
  //  return possibleTitles.includes(suspectedUser.title)  && typeof suspectedUser.firstName === 'string' && typeof suspectedUser.lastName === 'string';
  //}
}

export const isSimpleUser = (suspectedUser: any)=> _isSimpleUser(suspectedUser);

/**
 * Type guard that tests, whether an object has the required attributes to be a User.
 * 
 * @param {any} suspectedUser Whatever is to be tested
 * @returns {boolean} True if the object can be considered a User
 */
export function isUser (suspectedUser: any): suspectedUser is User {

  return _isSimpleUser(suspectedUser, 1) && typeof (<User>suspectedUser)?.joinedAt === 'number';
}

/**
 * Type guard that tests, whether an object has the required attributes to be an IdentifiedUser.
 * 
 * @param {any} suspectedUser Whatever is to be tested
 * @returns {boolean} True if the object can be considered an IdentifiedUser
 */
export function isIdentifiedUser (suspectedUser: any): suspectedUser is IdentifiedUser {

  return typeof suspectedUser?.id === 'number' && _isSimpleUser(suspectedUser, 1);
}

/**
 * Builds a User from a SimpleUser
 * 
 * @param {SimpleUser} info A SimpleUser
 * @returns {User} A User with the same attributes as prototype, with a current timestamp for the additional 'joinedAt'-attribute
 */
export function buildUser(info: SimpleUser): User{
  if(!isSimpleUser(info)){
    throw new Error("buildUser: Expected SimpleUser-object");
  }
  // return {title: info.title, firstName: info.firstName, lastName: info.lastName, joinedAt: Date.now()};
  return Object.assign({title: null as Title, firstName: '', lastName: '', joinedAt: Date.now()}, info);
}

/**
 * Changes the users title, firstname and lastname to the new values
 * 
 * @param {SimpleUser} newData An Object containing the new information
 * @param {User} toBeChanged The original Object, that is to be changed
 * @returns {User} The original Object, after title, firstName and lastName have been changed
 */
export function changeUser(newData: SimpleUser, toBeChanged: User): User{
  if(!isSimpleUser(newData)){
    throw new Error("changeUser: newData: Expected SimpleUser-object (maybe use simplifyUser)");
  }
  if(!isUser(toBeChanged)){
    throw new Error("changeUser: toBeChanged: Expected User-object");
  }

  return Object.assign(toBeChanged, newData);
}

/**
 * Takes a User- or IdentifiedUser-object and cuts off the special attributes (joinedAt or id) to create a SimpleUser-object
 * 
 * @param toBeSimplified The object that is to be simplified
 * @returns The resulting SimpleUser-object
 */
export function simplifyUser(toBeSimplified: User | IdentifiedUser): SimpleUser {
  if(!isUser(toBeSimplified) && !isIdentifiedUser(toBeSimplified)){
    throw new Error("simplifyUser: Expected User- or IdentifiedUser-object")
  }
  let simpleUser = {title: null as Title, firstName: '', lastName: ''}
  if(isUser(toBeSimplified)){
    const {joinedAt, ...destrucUser} = toBeSimplified;
    simpleUser = destrucUser;
  }
  else{
    const {id, ...destrucUser} = toBeSimplified;
    simpleUser = destrucUser;
  }
  return simpleUser;
}