// setup.js makes expect from chai and supertest
// available in all test suites without needing
// to import them in each file they're used in

const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;
