import BasePage from "../basePage";
import {By, until, WebDriver} from "selenium-webdriver";

export class Shop extends BasePage {

  protected totalItems = By.xpath('//*[@id="main"]/div[2]/nav')
  protected sortItemsPriceAsc = By.xpath('//*[@id="main"]/div[2]/form[2]/select/option[4]')
  protected sortItemsPriceDesc = By.xpath('//*[@id="main"]/div[2]/form[2]/select/option[3]')
  protected priceOfFirstAsc = By.xpath('//*[@id="grid"]/div/div/div[1]/div/a/span/span/bdi')
  protected priceOfFirstDesc = By.xpath('//*[@id="grid"]/div/div/div[1]/div/a/span[2]/ins/span/bdi')
  protected firstItemPage = By.xpath('//*[@id="grid"]/div/div/div[1]/div/a')
  protected firstItemDiv = By.xpath('//*[@id="grid"]/div/div/div[1]')
  protected firstItemAddToCart = By.xpath('//*[@id="grid"]/div/div/div[1]/div/div/a')
  protected firstItemPageTitle = By.xpath('//*[starts-with(@id, "product-")]/div[1]/div[2]/div[1]/h1')
  protected firstItemTitle = By.xpath('//*[@id="grid"]/div/div/div[1]/div/a/h2')
  protected searchInput = By.xpath('//*[@id="search"]')
  protected searchButton = By.xpath('//*[@id="masthead"]/div[1]/div[1]/form/div/div[2]/button')
  protected searchFirstItem = By.xpath('//*[starts-with(@id, "product-")]/div[1]/div[2]/div[1]/h1')
  protected searchByMobile = By.xpath('//*[@id="product_cat"]/option[3]')
  protected categoryText = By.xpath('//*[starts-with(@id, "product-")]/div[1]/div[2]/div[2]/div[2]/span[1]/a[1]')
  protected sortSearchPriceDesc = By.xpath('//*[@id="main"]/div[2]/form[2]/select/option[5]')
  protected addedCartItem = By.xpath('//*[starts-with(@id, "post-")]/div/section/div/div/div/div/div/div[2]/form/table/tbody/tr[1]/td[3]/div/div/a')
  protected removeItem = By.xpath('//*[starts-with(@id, "post-")]/div/section/div/div/div/div/div/div[2]/form/table/tbody/tr[1]/td[6]/span[2]/a')
  protected emptyCartHeader = By.xpath('//*[@id="post-2771"]/div/section/div/div/div/div/div/div[1]/div[2]')
  protected proceedToPayment = By.xpath('//*[starts-with(@id, "post-")]/div/section/div/div/div/div/div/div[2]/div/div/div/a[1]')
  protected checkBox = By.xpath('//*[@id="ship-to-different-address-checkbox"]')
  protected firstName = By.xpath('//*[@id="billing_first_name"]')
  protected lastName = By.xpath('//*[@id="billing_last_name"]')
  protected street = By.xpath('//*[@id="billing_address_1"]')
  protected postalCode = By.xpath('//*[@id="billing_postcode"]')
  protected city = By.xpath('//*[@id="billing_city"]')
  protected phone = By.xpath('//*[@id="billing_phone"]')
  protected email = By.xpath('//*[@id="billing_email"]')
  protected confirmButton = By.xpath('/html/body/div[2]/div[2]/div/div/div/main/div/div/section/div/div/div/div/div/form[3]/div[2]/div/div/div/button')
  protected acceptButton = By.xpath('//*[@id="terms"]')
  protected successfulPayment = By.xpath('//*[starts-with(@id, "post-")]/div/section/div/div/div/div/div/div/p[1]')
  protected emailInput = By.xpath('//*[@id="username"]')
  protected password = By.xpath('//*[@id="password"]')
  protected loginButton = By.xpath('//*[@id="customer_login"]/div[1]/form/p[4]/button')
  protected myAccountHeader  = By.xpath('//*[@id="post-2773"]/header/div/h1')
  protected myAccountButton  = By.xpath('//*[@id="menu-top-bar-right"]/li[3]/a')
  protected viewOrdersButton  = By.xpath('//*[@id="post-2773"]/div/section/div/div/div/div/div/nav/ul/li[2]/a')
  protected ordersHeader  = By.xpath('//*[@id="post-2773"]/header/div/h1')


  constructor(driver: WebDriver) {
    super(driver);
  }

  async checkIfHasManyItems(expected: string) {
    await this.checkMatchingElements(this.totalItems, expected)
  }

  async sortItemsByPriceDesc(locator: By =  this.sortItemsPriceAsc) {
    await this.findElementAndClick(locator)
  }

  async checkFirstItemAsc(expected: string) {
    await this.checkMatchingElements(this.priceOfFirstAsc, expected)
  }

  async checkFirstItemDesc(expected: string) {
    await this.checkMatchingElements(this.priceOfFirstDesc, expected)
  }

  async sortItemsByPriceAsc() {
    await this.findElementAndClick(this.sortItemsPriceDesc)
  }

  async clickOnFirstItem() {
    await this.findElementAndClick(this.firstItemPage)
  }

  async checkFirstItemTitle(expected: string, locator: By = this.firstItemPageTitle) {
    await this.checkMatchingElements(locator, expected)
  }

  async search(input: string, click: boolean = true) {
    await this.fillInputField(this.searchInput, input)
    click && await this.findElementAndClick(this.searchButton)
    click && await this.clickOnFirstItem()
    click && await this.checkFirstItemTitle(input, this.searchFirstItem)
  }

  async searchByCategory(expected: string, click: boolean = true) {
    await this.findElementAndClick(this.searchByMobile)
    click && await this.findElementAndClick(this.searchButton)
    click && await this.clickOnFirstItem()
    click && await this.checkMatchingElements(this.categoryText, expected)
  }

  async searchByCategoryAndInput(input: string, expectedCategory: string) {
    await this.search(input, false)
    await this.searchByCategory(expectedCategory, false)
    await this.findElementAndClick(this.searchButton)
    await this.sortItemsByPriceDesc(this.sortSearchPriceDesc)
    await this.clickOnFirstItem()
    await this.checkFirstItemTitle(input)
    await this.checkMatchingElements(this.categoryText, expectedCategory)
  }

  async addItemToCart(check: boolean = true){
    await this.sortItemsByPriceDesc()
    const selectedItem = await (await this.findElement(this.firstItemTitle)).getText()
    await this.hoverElement(this.firstItemDiv)
    await this.findElementAndClick(this.firstItemAddToCart)
    const addedItem = await (await this.findElement(this.addedCartItem)).getText()
    check && expect(addedItem).toEqual(selectedItem)
  }

  async removeItemFromCart(expect: string) {
    await this.findElementAndClick(this.removeItem)
    await this.checkMatchingElements(this.emptyCartHeader, expect)
  }

  async orderItem(expect: string, data: {
    email: string,
    firstName: string,
    lastName: string,
    street: string,
    postalCode: string,
    city: string,
    phone: string
  }) {
    await this.findElementAndClick(this.proceedToPayment);
    await this.findElementAndClick(this.checkBox);
    await this.fillInputField(this.firstName, data.firstName);
    await this.fillInputField(this.lastName, data.lastName);
    await this.fillInputField(this.street, data.street);
    await this.fillInputField(this.postalCode, data.postalCode);
    await this.fillInputField(this.city, data.city);
    await this.fillInputField(this.phone, data.phone);
    await this.fillInputField(this.email, data.email);
    const block = await this.findElement(By.css('.blockUI.blockOverlay'));
    if (block) {
      await this.driver.wait(until.stalenessOf(await this.driver.findElement(By.css('.blockUI.blockOverlay'))), 3000);
    }
    await this.findElementAndClick(this.acceptButton)
    await this.findElementAndClick(this.confirmButton)
    await this.checkMatchingElements(this.successfulPayment, expect);
  }

  async login(expected: string, {email, password}: { password: string, email: string }, check: boolean = true) {
    await this.findElementAndClick(this.myAccountButton)
    await this.fillInputField(this.emailInput, email)
    await this.fillInputField(this.password, password)
    await this.findElementAndClick(this.loginButton)
    check && await this.checkMatchingElements(this.myAccountHeader, expected)
  }

  async viewOrders(expected:string){
    await this.findElementAndClick(this.viewOrdersButton)
    await this.driver.sleep(1000)
    await this.checkMatchingElements(this.ordersHeader, expected)
  }
}