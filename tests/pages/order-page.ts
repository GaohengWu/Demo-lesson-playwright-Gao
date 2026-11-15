import { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly userName: Locator
  readonly phoneNumber: Locator
  readonly commentInput: Locator
  readonly creatOrderButton: Locator
  readonly statusButton: Locator
  readonly successMessage: Locator

  readonly customerNameError: Locator
  readonly phoneError: Locator

  readonly logoutButton: Locator
  readonly searchOrderButton: Locator
  readonly searchOrderInput: Locator
  readonly orderNotFoundText: Locator
  readonly orderNotfoundImage: Locator

  readonly orderNameDetails: Locator
  readonly orderStatusOpen: Locator

  readonly orderServerError: Locator
  readonly orderServerErrorText: Locator

  readonly usernameInputError: Locator
  readonly phoneInputError: Locator

  // add more locators here

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.userName = page.getByTestId('username-input')
    this.phoneNumber = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.creatOrderButton = page.getByTestId('createOrder-button')
    this.successMessage = page.getByTestId('orderSuccessfullyCreated-popup')
    this.customerNameError = page.getByTestId('username-input-error')
    this.phoneError = page.getByTestId('phone-input-error')
    this.logoutButton = page.getByTestId('logout-button')
    this.searchOrderButton = page.getByTestId('searchOrder-submitButton')
    this.searchOrderInput = page.getByTestId('searchOrder-input')
    this.orderNotFoundText = page.getByTestId('orderNotFound-title')
    this.orderNotfoundImage = page.getByTestId('orderNotFound-image')
    this.orderNameDetails = page.getByTestId('order-item-0')
    this.orderStatusOpen = page.getByTestId('status-item-0')
    this.orderServerError = page.getByTestId('serverError-title')
    this.orderServerErrorText = page.getByTestId('serverError-description')
    this.usernameInputError = page.getByTestId('username-input-error')
    this.phoneInputError = page.getByTestId('phone-input-error')
  }
}
