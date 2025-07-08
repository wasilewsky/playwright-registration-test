# 🧪 Playwright Registration Test – Veeam R&D Forums

This project contains an end-to-end automated test using [Playwright](https://playwright.dev/) to verify the registration behavior on the Veeam R&D Forums site.  
The test simulates a user trying to register with a **public email address**, which should fail and trigger a validation error.

---

## 📌 Test Scenario

The test performs the following steps:

1. Visit the homepage: [https://www.veeam.com/](https://www.veeam.com/)
2. Hover over the **Support** menu and click **R&D Forums**
3. Confirm redirection to: `https://forums.veeam.com/?ad=menu-support`
4. Click the **Register** button
5. Accept the **terms and conditions**
6. Fill in the registration form with:
   - Username
   - Password and confirmation
   - Public email address
7. Submit the form
8. (If prompted again) Accept terms once more and re-submit
9. Assert that an error message appears with **"Public email are not allowed"**

The test handles both desktop and headless edge cases where the terms prompt might appear twice.

---

## 🚀 Getting Started

### ✅ Requirements

- [Node.js](https://nodejs.org/) (v18+ recommended)
- Git (if you clone this repo)
- Internet connection (this test hits a live website)

### 📦 Installation

```bash
npm install
```

Playwright will install the testing library and necessary browsers.

### ▶️ Run the test

Run all tests:

```bash
npx playwright test
```

Run in a visible browser window (Chromium):

```bash
npx playwright test --headed --project=chromium
```

View the HTML report:

```bash
npx playwright show-report
```

---

## 📱 Responsive Testing (optional)

This test is compatible with desktop and mobile resolutions. You can configure projects in `playwright.config.ts` to run tests across devices like:

```ts
projects: [
  { name: 'chromium-desktop', use: { viewport: { width: 1280, height: 720 } } },
  { name: 'chromium-mobile', use: devices['Pixel 5'] }
]
```
