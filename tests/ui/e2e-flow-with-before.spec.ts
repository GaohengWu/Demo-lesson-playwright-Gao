import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import {
  existingOrderMock,
  nonExistingOrderMock,
  serverErrorOrderMock,
  successfulOrderCreationMock
} from '../mock/order-mocks'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('SignIn button is disabled when incorrect data is inserted', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await expect(loginPage.signInButton).toBeDisabled()
})

test('Error message is displayed when incorrect credentials are used', async ({}) => {
  // implement test
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(8))
  await loginPage.signInButton.click()

  //Verify the error message
  await expect(loginPage.authError).toBeVisible()
})

test('Login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.statusButton).toBeVisible()

  // verify at least few elements on the order creation page
  await expect(orderCreationPage.creatOrderButton).toBeVisible()
  await expect(orderCreationPage.userName).toBeVisible()
  await expect(orderCreationPage.phoneNumber).toBeVisible()
  await expect(orderCreationPage.commentInput).toBeVisible()
  await expect(orderCreationPage.statusButton).toBeVisible()
})

test('Login and create order', async ({}) => {
  // implement test
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.userName.fill('Gao')
  await orderCreationPage.phoneNumber.fill('123456')
  await orderCreationPage.commentInput.fill('More cheese please!')
  await orderCreationPage.commentInput.click()

  // Verify success message
  await expect(orderCreationPage.successMessage).toBeVisible()
})

test('Check error on order creation', async ({}) => {
  // implement test
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userName.fill('a')
  await orderCreationPage.phoneNumber.fill('12345')
  await orderCreationPage.commentInput.fill('nothing')

  await expect(orderCreationPage.customerNameError).toBeVisible()
  await expect(orderCreationPage.phoneError).toBeVisible()
})

test.only('Check that Name and Phone fields are mandatory', async ({}) => {
  // implement test
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userName.fill('Gao')
  await orderCreationPage.userName.clear()

  //Name is mandatory
  await expect(orderCreationPage.usernameInputError).toBeVisible()
  await expect(orderCreationPage.usernameInputError).toHaveText('The field must be filled in.')

  await orderCreationPage.phoneNumber.fill('123456789')
  await orderCreationPage.phoneNumber.clear()

  //Phone is mandatory
  await expect(orderCreationPage.phoneInputError).toBeVisible()
  await expect(orderCreationPage.phoneInputError).toHaveText('The field must be filled in.')
})

test('Check logout function', async ({}) => {
  // Log in
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  //Log out
  await orderCreationPage.logoutButton.click();

  await expect(loginPage.signInButton).toBeVisible()
  await expect(orderCreationPage.logoutButton).not.toBeVisible()
  await expect(loginPage.page.url()).toContain('signin')
})

test('Check order not found', async ({}) => {
  // implement test
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('120034')
  await orderCreationPage.searchOrderButton.click()

  await expect(orderCreationPage.orderNotFoundText).toBeVisible()
  await expect(orderCreationPage.orderNotfoundImage).toBeVisible()
})

test('Check order not found with mock', async ({}) => {
  // implement test
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  await nonExistingOrderMock(orderCreationPage.page)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('001')
  await orderCreationPage.searchOrderButton.click()

  await expect(orderCreationPage.orderNotFoundText).toBeVisible()
  await expect(orderCreationPage.orderNotfoundImage).toBeVisible()
})

test('Check order found', async ({}) => {
  // implement test
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('20992')
  await orderCreationPage.searchOrderButton.click()

  await expect(orderCreationPage.orderStatusOpen).toBeVisible()
  await expect(orderCreationPage.orderNameDetails).toBeVisible()

})

test('Check order found with mock', async ({}) => {
  // implement test
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  //Init mock before flow started
  await existingOrderMock(orderCreationPage.page)

  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('0')
  await orderCreationPage.searchOrderButton.click()

  await expect(orderCreationPage.orderStatusOpen).toBeVisible()
  await expect(orderCreationPage.orderNameDetails).toBeVisible()
})

test('Order Search > error on server side with mock', async ({}) => {
  // implement test
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  //Init mock before flow started
  await serverErrorOrderMock(orderCreationPage.page)

  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('0')
  await orderCreationPage.searchOrderButton.click()

  await expect(orderCreationPage.orderServerError).toBeVisible()
  await expect(orderCreationPage.orderServerError).toHaveText('An unexpected error has occurred')
  await expect(orderCreationPage.orderServerErrorText).toBeVisible()
  await expect(orderCreationPage.orderServerErrorText).toHaveText('Please retry your request later')
})

test('Create an order successfully with mock', async ({}) => {
  // implement test
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  // Mock with successful order creation
  await successfulOrderCreationMock(orderCreationPage.page)

  await orderCreationPage.userName.fill('KK')
  await orderCreationPage.phoneNumber.fill('12345678')
  await orderCreationPage.commentInput.fill('More cheese please!')
  await orderCreationPage.commentInput.click()

  // Verify success message
  await expect(orderCreationPage.successMessage).toBeVisible()
})