import {By, WebDriver, WebElement, until, Locator} from "selenium-webdriver";
export default class BasePage {
  protected driver: WebDriver;


  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async findElementAndClick(selector: By){
    await (await this.driver.findElement(selector)).click()
  }

  async fillInputField(selector: By, message: string){
    await this.driver.wait(
      until.elementLocated(selector)
    ).sendKeys(message)
  }
  async getTitle(){
    return await this.driver.getTitle();
  }
  async findElement(selector: By){
    return this.driver.findElement(selector)
  }
  async checkMatchingElements(selector: By, matchingItem: string){
    const element = await this.findElement(selector);
    const elementText = await element.getText();
    expect(elementText).toContain(matchingItem);
  }
  async checkTitle(page: { getTitle: () => Promise<string>}, page_title: string){
    let title = await page.getTitle();
    expect(title).toMatch(page_title);
  }
  async waitAndClick(elementLocator: Locator , timeout: number) {
    await this.driver.wait(
      until.elementLocated(elementLocator), timeout).click();
    await this.driver.sleep(1000)
  }

  async waitForElement(elementLocator: Locator, timeout: number) {
    return this.driver.wait(until.elementLocated(elementLocator), timeout);
  }
  async hoverElement(locator: By) {
    const actions = this.driver.actions({ bridge: true });
    const element = await this.findElement(locator)
    await actions
      .move({ duration: 2000, origin: element, x: 0, y: 0 })
      .perform();
  }

}
