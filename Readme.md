
# Error Reporter

A simple Node.js service to report client-side errors to a Discord channel. This package provides an easy way to log and monitor errors that occur in your application, making it easier to debug and resolve issues in real-time.

## Features

- **Real-time Error Reporting:** Automatically sends error messages to a specified Discord channel via webhook.
- **Simple Integration:** Easy to set up and integrate into any Node.js application.
- **Customizable Logging:** Tailor error messages to include relevant details, such as stack traces and timestamps.
- **Supports Multiple Environments:** Use it in development, testing, and production environments.

## Installation

To install the `error-reporter-to-discord` package, run the following command in your project directory:

```bash
npm install error-reporter-to-discord
```

## Usage

To start using the error reporter in your application, follow these steps:

1. **Import the Package:**

   Import the `error-reporter-to-discord` module in your application code:

   ```javascript
   const startErrorReporter = require('error-reporter-to-discord');
   ```

2. **Initialize the Reporter:**

   Start the error reporter by providing your Discord webhook URL. Replace `YOUR_DISCORD_WEBHOOK_URL` with the actual URL you get from your Discord server settings:

   ```javascript
   startErrorReporter('YOUR_DISCORD_WEBHOOK_URL');
   ```

3. **Error Reporting:**

   You can log errors using the `reportError` method. Below are examples of how to handle errors in different scenarios:

### Example: Basic Error Reporting

```javascript

const startErrorReporter = require('error-reporter-to-discord');
startErrorReporter('YOUR_DISCORD_WEBHOOK_URL');

```

You will get endpoint /report-error use that in your code

### Example: Custom Error Handling

You can customize how errors are reported by adding additional information such as user data or context. Here’s an example:

```javascript
<script>
 window.onerror = function (errorMessage, url, line, column, errorObj) {
            fetch('http://localhost:3000/report-error', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    errorMessage,
                    url,
                    line,
                    column,
                    errorStack: errorObj ? errorObj.stack : null
                })
            }).catch((err) => console.error("Failed to report error:", err));
        };
</script>
```

## Configuration Options

The `error-reporter-to-discord` package provides several configuration options to customize its behavior:

- **Custom Message Format:** Modify the format of error messages sent to Discord. For example, you can include user details, timestamps, and more.
  
- **Error Filters:** Set up filters to exclude certain types of errors from being reported. This can help reduce noise from known issues.

- **Rate Limiting:** Implement rate limiting to prevent your Discord channel from being spammed with error reports.


//TODO 
//Integration with jira,github etc or custom assigment tool