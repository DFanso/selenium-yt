const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function example() {
  // Configure Chrome options
  const options = new chrome.Options();
  options.addArguments("--headless"); // Run in headless mode

  // Set up driver
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to the Gmail login page
    await driver.get("https://accounts.google.com/ServiceLogin");

    // Enter email
    await driver
      .findElement(By.name("identifier"))
      .sendKeys("gabin20030824@gmail.com", Key.RETURN);

    // Wait for password field to become visible
    await driver.wait(
      until.elementIsVisible(driver.findElement(By.name("Passwd"))),
      10000
    );

    // Enter password
    await driver
      .findElement(By.name("password"))
      .sendKeys("gabin2003", Key.RETURN);

    // Wait for the YouTube homepage to load
    await driver.wait(until.titleContains("YouTube"), 10000);

    // Find and click on a YouTube video
    const videoLink = await driver.findElement(
      By.css(".yt-simple-endpoint.style-scope.yt-formatted-string")
    );
    await driver.executeScript("arguments[0].click();", videoLink);

    // Like the video
    const likeButton = await driver.findElement(
      By.xpath('//*[@id="top-level-buttons"]/ytd-toggle-button-renderer[1]/a')
    );
    await driver.executeScript("arguments[0].click();", likeButton);

    // Subscribe to the channel
    const subscribeButton = await driver.findElement(
      By.css(".style-scope.ytd-subscribe-button-renderer")
    );
    await driver.executeScript("arguments[0].click();", subscribeButton);

    console.log("Actions completed successfully!");
  } finally {
    // Quit the driver
    await driver.quit();
  }
})();
