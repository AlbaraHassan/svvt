import {WebDriver} from "selenium-webdriver";
import {createDriver, quitDriver} from "../core/config/driverSetup";
import {readFileSync} from "fs";
import * as path from "path";
import {Shop} from "../core/pageObjects/Univerzalno/shop";


const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver
let page: Shop

beforeAll(async () => {
  driver = await createDriver(testData.url.univerzalno)
  page = new Shop(driver)
}, 10000)

afterEach(async () => {
  await driver.navigate().to(testData.url.univerzalno);
  page = new Shop(driver);
  }, 10000);
test('test 1', async () => {
  await page.checkIfHasManyItems(testData.expected.univerzalno.totalItems)
}, 10000)


test('test 2.1', async () => {
  await page.sortItemsByPriceAsc()
  await page.checkFirstItemAsc(testData.expected.univerzalno.asc)
}, 100000)

test('test 2.2', async () => {
  await page.sortItemsByPriceDesc()
  await page.checkFirstItemDesc(testData.expected.univerzalno.desc)

}, 100000)

test('test 3', async () => {
  await page.sortItemsByPriceDesc()
  await page.clickOnFirstItem()
  await page.checkFirstItemTitle(testData.expected.univerzalno.firstItem)
})

test('test 4.1', async () => {
  await page.search(testData.expected.univerzalno.search)
}, 10000)

test('test 4.2', async () => {
  await page.searchByCategory(testData.expected.univerzalno.category)
}, 10000)

test('test 5', async () => {
  await page.searchByCategoryAndInput(testData.expected.univerzalno.search, testData.expected.univerzalno.category)
}, 10000)

test('test 6', async () => {
  await page.addItemToCart()
}, 10000)

test('test 7', async () => {
  await page.addItemToCart(false)
  await page.removeItemFromCart(testData.expected.univerzalno.emptyCart)
}, 10000)

test('test 8 & 9', async () => {
  await page.addItemToCart(false)
  await page.orderItem(testData.expected.univerzalno.successFulPayment, testData.data)
}, 100000)

test('test 10 & 11', async () => {
  await page.login(testData.expected.univerzalno.myAccount, testData.data)
  await page.viewOrders(testData.expected.univerzalno.orders)

}, 10000)

afterAll(async () => {
  await quitDriver(driver);
}, 10000);