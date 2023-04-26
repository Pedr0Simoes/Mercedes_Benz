module.exports = {
  src_folders: ["nightwatch/challenge/test"],
  page_objects_path: ["nightwatch/challenge/page-objects"],

  test_settings: {
    default: {
      launch_url:
        "https://www.mercedes-benz.co.uk/homepage-videostage-short.html?group=all&subgroup=all.saloon&view=BODYTYPE",
      webdriver: {
        start_process: true,
        server_path: "",
      },
    },

    test_workers: {
      enabled: true,
      workers: "auto",
    },

    firefox: {
      desiredCapabilities: {
        browserName: "firefox",
      },
      webdriver: {
        start_process: true,
        port: 4446,
        server_path: require("geckodriver").path,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["start-maximized"],
        },
      },
      webdriver: {
        start_process: true,
        port: 4445,
        server_path: require("chromedriver").path,
      },
    },
  },

  test_runner: {
    type: "mocha",
    options: {
      ui: "bdd",
      reporter: "list",
    },
  },
};
