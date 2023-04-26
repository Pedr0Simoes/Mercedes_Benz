const Timer = require('../constants/waitTime.js');

const validatePage = {
  waitPageToBeLoaded() {
    this.waitForElementVisible("@exteriorSection", Timer.maxPageLoadTime);
    return this;
  },
};

const interactWithButtons = {
  clickOnBuildCarBtn() {
    browser.execute(() => {
      document
        .querySelector("owc-stage")
        .shadowRoot.querySelector(
          '[href^="https://www.mercedes-benz.co.uk/passengercars/mercedes-benz-cars/car-configurator.html"]'
        )
        .click();
    }, []);
    return this;
  },
};

module.exports = {
  commands: [validatePage, interactWithButtons],

  elements: {
    exteriorSection: {
      selector: "[data-aem-modulename='exterior']",
    },
  },
};
