const Timer = require('../constants/waitTime.js');
const FileLocation = require('../constants/filesLocations.js');

describe("Mercedes-Benz Challenge", function () {
  before((browser) => browser.navigateTo("https://www.mercedes-benz.co.uk"));

  it("Validate A Class models price are between £15,000 and £60,000", function (browser) {
    const homePage = browser.page.homePageObject();
    const hatchbackPage = browser.page.AClassHatchbackPageObject();
    const carConfigurationPage =
      browser.page.hatchbackCarConfigurationPageObject();

    homePage
      .waitPageToBeLoaded()
      .clickOnOutModelsBtn()
      .clickOnHatchbackBtn()
      .clickOnAClassHatchbackBtn();

    hatchbackPage.waitPageToBeLoaded().clickOnBuildCarBtn();

    carConfigurationPage
      .waitPageToBeLoaded()
      .clickOnAgreeToAllBtn()
      .clickOnFuelTypeBtn()
      .pause(Timer.listAnimationLoadTime)
      .selectDieselOption()
      .pause(Timer.animationLoadTime)
      .clickOnFuelTypeBtn()
      .pause(Timer.animationLoadTime)
      .validateCorrectFuelType()
      .scrollToFilter()
      .pause(Timer.animationLoadTime)
      .saveScreenshot(FileLocation.screenShotNameAndLocation)
      .validateCheapestAndMostExpensiveCar();
  });

  after((browser) => browser.end());
});
