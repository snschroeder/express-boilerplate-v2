const app = require('../src/app');
const helpers = require('./test-helpers');
const bcrypt = require('bcryptjs');

//===================//
// Initial setup     //
//===================//

describe('Users endpoints', () => {
  const db = helpers.setupTestDB(app);
  const testUsersArray = helpers.makeTestUsersArray();
  const testUser = testUsersArray[0];
  const endpointPath = '/api/users/';


//===================//
// Cleanup protocol  //
//===================//

  after('disconnect from db', () => db.destroy());
  before('cleanup', () => helpers.truncateTables(db));
  afterEach('cleanup', () => helpers.truncateTables(db));

//===================//
// POST tests        //
//===================//

  describe(`POST ${endpointPath}`, () => {
    beforeEach('insert users', () => helpers.seedUsers(db, testUsersArray));

    const requiredFields = ['username', 'password'];

    requiredFields.forEach((field) => {
      const regAttemptBody = {
        username: 'testUser',
        password: 'password',
      };

      it(`responds 400 username and password are required when ${field} is missing`, () => {
        delete regAttemptBody[field];

        return supertest(app)
          .post(endpointPath)
          .send(regAttemptBody)
          .expect(400, { error: "username and password are required" });
      });
    });
  })

  context('Password validation', () => {
    it(`responds 400 password must be longer than 8 char when password is too short`, () => {
      const testRegistration = {
        username: 'testUserBob',
        password: '123abc',
      };
      return supertest(app)
        .post(endpointPath)
        .send(testRegistration)
        .expect(400, { error: "password must be longer than 8 characters" });
    });
  });
});
