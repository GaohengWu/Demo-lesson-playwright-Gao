import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'

test.skip('signIn button disabled when password is less than 8 characters', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await expect(loginPage.signInButton).toBeDisabled()
})

test.skip('signIn with invalid credentials should lead to an error', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(9))

  await loginPage.signInButton.click()
  await expect(loginPage.authError).toBeVisible()
})

test.skip('login with correct credentials and verify order creation page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click({ force: true })
  // verify at least few elements on the order creation page
})

test.skip('Check error on order creation', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click({ force: true })
  // verify at least few elements on the order creation page

  await orderCreationPage.userName.fill('a')
  await orderCreationPage.phoneNumber.fill('12345')
  await orderCreationPage.commentInput.fill('nothing')


  await expect(orderCreationPage.customerNameError).toBeVisible()
  await expect(orderCreationPage.phoneError).toBeVisible()

})


















