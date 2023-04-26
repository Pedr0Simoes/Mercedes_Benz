
const Timer = require('../constants/waitTime.js');

const validatePage = {
  waitPageToBeLoaded() {
    this.waitForElementVisible("@ourRecommendationSection", Timer.maxPageLoadTime);
    return this;
  },
};

const interactWithButtons = {
  clickOnOutModelsBtn() {
    browser.execute(() => {
      document
        .querySelector("owc-header")
        .shadowRoot.querySelector(".owc-header-navigation-topic__label")
        .click();
    }, []);
    return this;
  },

  clickOnHatchbackBtn() {
    browser.execute(() => {
      document
        .querySelector("vmos-flyout")
        .shadowRoot.querySelector("[name='sportstourer']")
        .click();
    }, []);
    return this;
  },

  clickOnAClassHatchbackBtn() {
    browser.execute(() => {
      document
        .querySelector("vmos-flyout")
        .shadowRoot.querySelector("owc-header-flyout")
        .querySelector(
          "[href='https://www.mercedes-benz.co.uk/passengercars/models/hatchback/a-class/overview.html']"
        )
        .click();
    }, []);
    return this;
  },
};

const custom = {
  click() {
    let selector =
      'document.querySelector("owc-header").shadowRoot.querySelector(".owc-header-navigation-topic__label")';
    browser.execute(function testing1() {
      document
        .querySelector("owc-header")
        .shadowRoot.querySelector(".owc-header-navigation-topic__label")
        .click();
    }, []);
  },
};

module.exports = {
  url: "https://www.mercedes-benz.co.uk/",

  commands: [validatePage, interactWithButtons],

  elements: {
    ourRecommendationSection: {
      selector: "[data-aem-modulename='our-recommendations']",
    },
  },
};
