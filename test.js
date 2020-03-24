const { expect } = require('chai');
const sinon = require('sinon');
const { action } = require('./utils');

const stub = sinon.stub(Math, 'random');

describe('!action', () => {
  const subject = () => action('!action');

  context("on a normal roll", () => {
    before(() => {
      stub.reset();
      [0.55].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => { stub.reset() });

    it("is correct result", () =>{
      expect(subject()).to.equal("**0** (rolled 12)");
    });
  });

  context("when the first roll is ten ", () => {
    before(() => {
      stub.reset();
      [0.45, 0.5].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => { stub.reset() });

    it("is correct result", () =>{
      expect(subject()).to.equal("**8** (rolled 21 [10 + 11])");
    });
  });

  context("when the first roll is twenty ", () => {
    before(() => {
      stub.reset();
      [0.95, 0.45, 0.2].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => stub.reset());

    it("is correct result", () =>{
      expect(subject()).to.equal("**10** (rolled 35 [20 + 10 + 5])");
    });
  });

  context("when there is a roll of 60+", () => {
    before(() => {
      stub.reset();
      [0.95, 0.95, 0.95, 0.2].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => stub.reset());

    it("is correct result", () =>{
      expect(subject()).to.equal("**GLORY:** **16** (rolled 65 [20 + 20 + 20 + 5])");
    });
  });

  context("when there is a roll of 1", () => {
    before(() => {
      stub.reset();
      [0.0].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => stub.reset());

    it("is correct result", () =>{
      expect(subject()).to.equal("**Fail!** (rolled 1)");
    });
  });
});

describe('!action 12', () => {
  const subject = () => action('!action 12');

  context("when the 2nd roll is less than 10 ", () => {
    before(() => {
      stub.reset();
      [0.3].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => stub.reset());

    it("is correct result", () =>{
      expect(subject()).to.equal("**8** (rolled 22 [12 + 10 (up from 7)])");
    });
  });

  context("when the 2nd roll is greater than 10 ", () => {
    before(() => {
      stub.reset();
      [0.6].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => stub.reset());

    it("is correct result", () =>{
      expect(subject()).to.equal("**8** (rolled 25 [12 + 13])");
    });
  });

  context("when the 2nd roll is 10 ", () => {
    before(() => {
      stub.reset();
      [0.45, 0.2].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => stub.reset());

    it("is correct result", () =>{
      expect(subject()).to.equal("**9** (rolled 27 [12 + 10 + 5])");
    });
  });
});

describe('!action 12 up', () => {
  const subject = () => action('!action 12 up');

  context("when the 2nd roll is less than 10 ", () => {
    before(() => {
      stub.reset();
      [0.3].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => stub.reset());

    it("is correct result", () =>{
      expect(subject()).to.equal("**6** (rolled 19 [12 + 7])");
    });
  });

  context("when the 2nd roll is greater than 10 ", () => {
    before(() => {
      stub.reset();
      [0.6].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => stub.reset());

    it("is correct result", () =>{
      expect(subject()).to.equal("**8** (rolled 25 [12 + 13])");
    });
  });

  context("when the 2nd roll is 10 ", () => {
    before(() => {
      stub.reset();
      [0.45, 0.2].forEach((v,i) => stub.onCall(i).returns(v));
    });

    after(() => stub.reset());

    it("is correct result", () =>{
      expect(subject()).to.equal("**9** (rolled 27 [12 + 10 + 5])");
    });
  });
});

