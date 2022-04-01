import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './fluff/user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  public createDb() {
    const users = [
      [1, { title: 'Prof.', firstName: 'Charles X.', lastName: 'Xavier', joinedAt: 1616656053}],
      [2, { title: 'Prof.', firstName: 'Eva', lastName: 'Luierung', joinedAt: 1618985253}],
      [3, { title: 'Dr.', firstName: 'Hartwig', lastName: 'Tigres zu Thun', joinedAt: 1616957394}],
      [4, { title: null, firstName: 'Latten', lastName: 'vom Zaun', joinedAt: 1616692843}],
      [6, { title: null, firstName: 'Max', lastName: 'Mustermann', joinedAt: 1616679345}],
      [7, { title: 'Prof.', firstName: 'Wanda', lastName: 'Artgern', joinedAt: 1618374054}],
      [8, { title: null, firstName: 'Joe', lastName: 'Nathan', joinedAt: 1647593041}],
      [9, { title: 'Dr.', firstName: 'Doctor', lastName: 'Doktor', joinedAt: 1621947204}],
      [10, { title: null, firstName: 'Walther', lastName: 'von der Vogelweide', joinedAt: 1618402348}],
      [11, { title: null, firstName: 'Hein', lastName: 'Blöd', joinedAt: 1648085328}],
    ];
    return {users};
  }

  // Overrides the genId method to ensure that a user always has an id.
  // If the useres array is empty,
  // the method below returns the initial number (0).
  // if the heroes array is not empty, the method below returns the highest
  // user id + 1.
  public genId(users: [number, User][]): number {
    return users.length > 0 ? Math.max(...users.map(user => user[0])) + 1 : 0;
  }

  // post(requestInfo: RequestInfo){
  //   const collectionName = requestInfo.collectionName;
  //   if (collectionName === 'somedatatype') {
  //     // Intercept POST calls to the 'somedatatype' collection:
  //     // E.g. add some fields to our entity that would be set in the backend,
  //     const data = requestInfo.utils.getJsonBody(requestInfo.req);
  //     const collection = requestInfo.collection;
  //     data.extraField = 'hello';

  //     // set id to next highest number
  //     data.id = collection.map(item => item.id).reduce((cur, next) => cur > next ? cur : next) + 1;

  //     // ... add the item to the collection
  //     collection.push(data);

  //     // forge the response
  //     const options: ResponseOptions = {
  //       body: { data  },
  //       status: STATUS.OK,
  //       headers: requestInfo.headers,
  //       url: requestInfo.url
  //     };

  //     // use createResponse$ to return proper response
  //     return requestInfo.utils.createResponse$(() => options);
  //   }

  //   // let the default POST handle all other collections by returning undefined
  //   return undefined;
  // }
}
