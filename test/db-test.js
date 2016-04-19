import Conn from '../server/db';
import chai, { expect } from 'chai';

describe('Sequelize', function() {
  describe('Connection to SQL', function() {
    let fine = false;

    before(function(done){
      Conn.authenticate()
        .then(function(err) {
          fine = true;
          done();
        }, function (err) {
          done();
        });
    });

    it('should succeed without errors', function() {
      expect(fine).to.be.true;
    });

  });
});
