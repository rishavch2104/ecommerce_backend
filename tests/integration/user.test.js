const request = require("supertest");
const faker = require("faker");
const httpStatus = require("http-status");

const app = require("../../src/app");
const setupTestsDb = require("../setupTestsDB");
const User = require("../../src/database/models/userModel");

const { userOne, insertUser } = require("../fixtures/userFixtures");

setupTestsDb();

describe("Auth routes", () => {
  describe("POST user/register", () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        firstName: faker.name.findName().split(" ")[0],
        lastName: faker.name.findName().split(" ")[1],
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      };
    });
    // eslint-disable-next-line no-console

    test("should return 201 and successfully register user if request data is ok", async () => {
      // eslint-disable-next-line no-console

      const res = await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.data.user).not.toHaveProperty("password");
      expect(res.body.data.user).toEqual({
        isVerified: false,
        role: "User",
        orders: expect.anything(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,

        addresses: [],
        id: expect.anything(),
      });

      const dbUser = await User.findById(res.body.data.user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      });
    });

    // test("should return 400 error if email is invalid", async () => {
    //   //   newUser.email = "invalidemail";
    //   const res = await request(app)
    //     .post("/user/register")
    //     .send(newUser)
    //     .expect(httpStatus.BAD_REQUEST);
    // });

    test("should return 400 error if email is already used", async () => {
      await insertUser([userOne]);
      //   newUser.email = userOne.email;

      await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if password length is less than 8 characters", async () => {
      newUser.password = "passwo1";

      await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if password does not contain both letters and numbers", async () => {
      newUser.password = "password";

      await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      newUser.password = "11111111";

      await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  //   describe("POST /v1/student/login", () => {
  //     test("should return 200 and login user if email and password match", async () => {
  //       await insertStudent([studentOne]);
  //       const loginCredentials = {
  //         email: studentOne.email,
  //         password: studentOne.password,
  //       };

  //       const res = await request(app)
  //         .post("/v1/student/login")
  //         .send(loginCredentials)
  //         .expect(httpStatus.OK);

  //       expect(res.body.data.tokens).toEqual({
  //         access: { token: expect.anything(), expires: expect.anything() },
  //         refresh: { token: expect.anything(), expires: expect.anything() },
  //       });
  //     });

  //     test("should return 401 error if there are no users with that email", async () => {
  //       const loginCredentials = {
  //         email: studentOne.email,
  //         password: studentOne.password,
  //       };

  //       await request(app)
  //         .post("/v1/student/login")
  //         .send(loginCredentials)
  //         .expect(httpStatus.UNAUTHORIZED);

  //       //   expect(res.body.data).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect email' });
  //     });

  //     test("should return 401 error if password is wrong", async () => {
  //       await insertStudent([studentOne]);
  //       const loginCredentials = {
  //         email: studentOne.email,
  //         password: "wrongPassword1",
  //       };

  //       await request(app)
  //         .post("/v1/student/login")
  //         .send(loginCredentials)
  //         .expect(httpStatus.UNAUTHORIZED);

  //       //   expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect email or password' });
  //     });
  //   });
  // eslint-disable-next-line jest/valid-describe
});
