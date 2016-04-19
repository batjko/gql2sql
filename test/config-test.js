import config from '../server/config';
import { expect } from 'chai';

describe('Configuration', () => {
  describe('Winston Configuration', () => {
    it('exists', () => {
      expect(config).to.have.property('winston');
    });

    it('has all required keys', () => {
      expect(config.winston).to.have.all.keys(['token', 'subdomain', 'tags', 'json', 'handleExceptions']);
    });
  });

  describe('SQLDB Configuration', () => {
    it('exists', () => {
      expect(config).to.have.property('sqldb');
    });

    it('has all required keys', () => {
      expect(config.sqldb).to.have.all.keys(['server', 'port', 'username', 'password', 'database']);
    });
  });
});
