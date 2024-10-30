import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
test.describe('Countdown Timer', () => {
  test('Countdown should start when date is added', async ({ page }) => {
    const eventTitleInput = page.getByPlaceholder('Event Title')
    const eventDateInput = page.getByTestId('dateControl')

    await eventTitleInput.fill('My Birthday')

    await eventDateInput.evaluate((input: HTMLInputElement) => {
      input.value = '2025-02-18'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })

    const header = page.getByText('Time to My Birthday')
    await expect(header).toBeVisible()

    const countdownTimer = page.getByTestId('countdown')
    await expect(countdownTimer).toBeVisible()
  })

  test('Should show errors if date or title are invalid', async ({ page }) => {
    const eventTitleInput = page.getByPlaceholder('Event Title')
    await eventTitleInput.fill('A sentence that is more than 25 characters, hello')
    await eventTitleInput.blur()

    const tooManyChars = page.getByText(/Title cannot exceed 25 characters/)
    await expect(tooManyChars).toBeVisible()

    await eventTitleInput.clear()

    const titleRequired = page.getByText(/Title is required/)
    await expect(titleRequired).toBeVisible()

    const eventDateInput = page.getByTestId('dateControl')
    await eventDateInput.evaluate((input: HTMLInputElement) => {
      input.value = '2020-02-18'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })
    await eventDateInput.blur()
    const needsFutureDate = page.getByText('Date must be in the future')
    await expect(needsFutureDate).toBeVisible()
    await eventDateInput.clear()
    const dateRequired = page.getByText('Date is required')
    await expect(dateRequired).toBeVisible()
  })

  test('Should keep same data after page reload', async ({ page }) => {
    const eventTitleInput = page.getByPlaceholder('Event Title')
    const eventDateInput = page.getByTestId('dateControl')
    await eventTitleInput.fill('My Birthday')
    await eventDateInput.evaluate((input: HTMLInputElement) => {
      input.value = '2025-02-18'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })

    const header = page.getByText('Time to My Birthday')
    await expect(header).toBeVisible()
    const countdownTimer = page.getByTestId('countdown')
    await expect(countdownTimer).toBeVisible()
    await page.reload()
    await expect(countdownTimer).toBeVisible()
    await expect(header).toHaveText('Time to My Birthday')
  })
})
