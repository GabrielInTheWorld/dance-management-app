import { User, Title } from './user';

export const MOCKUSERSmap: Map<number, User> = new Map<number, User>([
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
])

export const MOCKUSERS: User[] = [
  { title: 'Prof.', firstName: 'Charles X.', lastName: 'Xavier', joinedAt: 1616656053},
  { title: 'Prof.', firstName: 'Eva', lastName: 'Luierung', joinedAt: 1618985253},
  { title: 'Dr.', firstName: 'Hartwig', lastName: 'Tigres zu Thun', joinedAt: 1616957394},
  { title: null, firstName: 'Latten', lastName: 'vom Zaun', joinedAt: 1616692843},
  { title: null, firstName: 'Max', lastName: 'Mustermann', joinedAt: 1616679345},
  { title: 'Prof.', firstName: 'Wanda', lastName: 'Artgern', joinedAt: 1618374054},
  { title: null, firstName: 'Joe', lastName: 'Nathan', joinedAt: 1647593041},
  { title: 'Dr.', firstName: 'Doctor', lastName: 'Doktor', joinedAt: 1621947204},
  { title: null, firstName: 'Walther', lastName: 'von der Vogelweide', joinedAt: 1618402348},
  { title: null, firstName: 'Hein', lastName: 'Blöd', joinedAt: 1648085328},
];