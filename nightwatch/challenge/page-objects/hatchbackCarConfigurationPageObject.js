const Timer = require("../constants/waitTime.js");
const FileLocation = require("../constants/filesLocations.js");
const PossiblePrices = require("../constants/possiblePrices.js");
const chai = require("chai");
const assert = chai.assert;

const validatePage = {
  waitPageToBeLoaded() {
    this.waitForElementVisible(
      "@carConfiguratorSection",
      Timer.maxPageLoadTime
    );
    return this;
  },
};

const interactWithButtons = {
  clickOnAgreeToAllBtn() {
    this.pause(Timer.cookieBannerLoadTime); //wait for the cookie banner so we can accept the cookies
    browser.execute(() => {
      document
        .querySelector("cmm-cookie-banner")
        .shadowRoot.querySelector('[data-test="handle-accept-all-button"]')
        .click();
    }, []);
    return this;
  },

  clickOnFuelTypeBtn() {
    browser.execute(() => {
      document
        .querySelector("owcc-car-configurator")
        .shadowRoot.querySelector("ccwb-multi-select")
        .shadowRoot.querySelector(".button")
        .click();
    }, []);
    return this;
  },

  selectDieselOption() {
    browser.execute(() => {
      document
        .querySelector("owcc-car-configurator")
        .shadowRoot.querySelector("ccwb-checkbox")
        .shadowRoot.querySelector("[name='Diesel']")
        .click();
    }, []);
    return this;
  },

  scrollToFilter() {
    browser.execute(() => {
      document
        .querySelector("owcc-car-configurator")
        .shadowRoot.querySelector("ccwb-heading")
        .scrollIntoView();
    }, []);
    return this;
  },

  validateCorrectFuelType() {
    browser.execute(
      () => {
        const numberElements = document
          .querySelector("owcc-car-configurator")
          .shadowRoot.querySelector("cc-motorization-comparison")
          .querySelectorAll("ccwb-card").length;
        return numberElements;
      },
      [],
      function (numberElements) {
        var fuelInfoPos = 2;
        for (let index = 0; index < numberElements.value; index++) {
          browser.execute(
            (index, fuelInfoPos) => {
              let fuelType = document
                .querySelector("owcc-car-configurator")
                .shadowRoot.querySelector("cc-motorization-comparison")
                .querySelectorAll("ccwb-card")
                [index].querySelectorAll("ccwb-tag")[fuelInfoPos].innerText;
              return fuelType;
            },
            [index, fuelInfoPos],
            function (fuelType) {
              assert.equal(fuelType.value.trim(), "Diesel");
            }
          );
          fuelInfoPos = 1;
        }
      }
    );
    return this;
  },

  validateCheapestAndMostExpensiveCar() {
    browser.execute(
      () => {
        const numberElements = document
          .querySelector("owcc-car-configurator")
          .shadowRoot.querySelector("cc-motorization-comparison")
          .querySelectorAll("ccwb-card").length;
        return numberElements;
      },
      [],
      function (numberElements) {
        browser.execute(
          (numberElements) => {
            var lowestCarPrice;
            var highestCarPrice;
            for (let index = 0; index < numberElements.value; index++) {
              let carPrice = document
                .querySelector("owcc-car-configurator")
                .shadowRoot.querySelector("cc-motorization-comparison")
                .querySelectorAll("ccwb-card")
                [index].querySelector("ccwb-text")
                .querySelector("span").innerText;
              if (index == 0) {
                lowestCarPrice = carPrice.substring(1);
                highestCarPrice = carPrice.substring(1);
              } else {
                if (carPrice < lowestCarPrice) {
                  lowestCarPrice = carPrice.substring(1);
                }
                if (carPrice > highestCarPrice) {
                  highestCarPrice = carPrice.substring(1);
                }
              }
            }
            return [lowestCarPrice, highestCarPrice];
          },
          [numberElements],
          function (lowestAndHighestCarPrices) {
            const lowestCarPrice = lowestAndHighestCarPrices.value[0];
            const highestCarPrice = lowestAndHighestCarPrices.value[1];
            assert.isTrue(
              PossiblePrices.lowestPossiblePrice <=
                lowestCarPrice.replace(",", "")
            );
            assert.isTrue(
              PossiblePrices.highestPossiblePrice >=
                highestCarPrice.replace(",", "")
            );

            const fs = require("fs");

            const content =
              "Lowest price: £" +
              lowestCarPrice +
              "\n" +
              "Highest price: £" +
              highestCarPrice;

            fs.writeFile(
              FileLocation.priceFilesNameAndLocation,
              content,
              (err) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          }
        );
      }
    );
    return this;
  },
};

module.exports = {
  commands: [validatePage, interactWithButtons],

  elements: {
    carConfiguratorSection: {
      selector: "[data-component-name='owcc-car-configurator']",
    },
  },
};
