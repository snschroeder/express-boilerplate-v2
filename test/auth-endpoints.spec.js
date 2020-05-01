// const knex = require('knex');
// const app = require('../src/app');
// const helpers = require('./test-helpers') --- not created yet
//
// describe('Auth Endpoints', () => {
//   let db;
//   const { testUsers } = helpers.makeFixtures();
//   const testUser = testUser[0];
//
//   before('make knex instance', () => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DATABASE_URL,
//     })
//     app.set('db', db);
//   })
//
//   after('disconnect from db', () => db.destroy());
//
//   before('cleanup', () => helpers.cleanTables(db));
//
//   afterEach('cleanup', () => helpers.cleanTables(db));
//
//   describe(`POST /api/auth/login`, () => {
//     beforeEach('insert users', () =>
//       helpers.seedUsers(
//         db,
//         testUsers,
//       )
//     )
//     const requiredFields = ['user_name', 'password'];
//
//     requiredFields.forEach((field) => {
//       const loginAttemptBody = {
//         user_name: testUser.user_name,
//         password: testUser.password,
//       }
//
//       it(`responds with 400 required error when ${field} is missing`, () =>{
//         delete loginAttemptBody[field]
//
//         return supertest(app)
//           .post(`/api/auth/login`)
//           .send(loginAttemptBody)
//           .expect(400, {
//             error: `missing ${field} in request body`,
//           })
//       })
//     })
//     it(`responds 400 invalid user_name or password when given bad username`, () => {
//       const invalidUser = { user_name: 'bogus-user', password: 'hunter42' };
//       return supertest(app)
//         .post('/api/auth/login')
//         .send(invalidUser)
//         .expect(400, { error: `incorrect user_name or password`})
//     })
//   })
// })
