import request from 'request';
import chai from 'chai';

const { expect } = chai;
// import { expect } from 'chai';


describe('Main page', () => {
  it('Status', () => {
    request('http://localhost:8080/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
    });
  });
});
