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
  });

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
    it(`responds 400 password must be fewer than 50 char when password is too long`, () => {
      const testRegistration = {
        username: 'testUserLevi',
        password: "arf".repeat(90),
      };
      return supertest(app)
        .post(endpointPath)
        .send(testRegistration)
        .expect(400, { error: 'password must be fewer than 50 characters' });
    });
    it(`responds 400 password must not begin or end with whitespace when password begins with whitespace`, () => {
      const testRegistration = {
        username: 'testUserTrouble',
        password: '   Iamafailingpassword2'
      };
      return supertest(app)
        .post(endpointPath)
        .send(testRegistration)
        .expect(400, { error: 'password must not begin or end with whitespace' });
    });
  });
});
