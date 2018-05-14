import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server';

const should = chai.should();
chai.use(chaiHttp);

describe('Given /api/v1/issue', () => {
  describe('When I create an issue', () => {
    it('Then it should return issue created', (done) => {
      chai.request(app)
        .post('/api/v1/issue')
        .send(
          {
            "title": "How to be aw world-class developer in 10 years",
            "description": "A must read story by all",
            "author": "Ogunbo"
          })
        .end((error, response) => {
          response.should.have.status(200);
          response.body.description.should.eql("A must read story by all");
          response.body.author.shoould.eql("Ogunbo");

          done();
        })
    })
  })
})