
# Error Reporter

A simple Node.js service to report client-side errors to a Discord channel. This package provides an easy way to log and monitor errors that occur in your application, making it easier to debug and resolve issues in real-time.

## Features

- **Real-time Error Reporting:** Automatically sends error messages to a specified Discord channel via webhook.
- **Simple Integration:** Easy to set up and integrate into any Node.js application.
- **Customizable Logging:** Tailor error messages to include relevant details, such as stack traces and timestamps.
- **Supports Multiple Environments:** Use it in development, testing, and production environments.

## Installation

To install the `error-reporter` package, run the following command in your project directory:

```bash
npm install error-reporter
```

## Usage

To start using the error reporter in your application, follow these steps:

1. **Import the Package:**

   Import the `error-reporter` module in your application code:

   ```javascript
   const startErrorReporter = require('error-reporter');
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
// Import necessary modules
const express = require('express');
const startErrorReporter = require('error-reporter');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the error reporter
startErrorReporter('YOUR_DISCORD_WEBHOOK_URL');

// Sample route that throws an error
app.get('/error', (req, res) => {
    throw new Error('This is a test error!');
});

// Global error handling middleware
app.use((err, req, res, next) => {
    // Report the error to Discord
    startErrorReporter.reportError(err);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Example: Custom Error Handling

You can customize how errors are reported by adding additional information such as user data or context. Here’s an example:

```javascript
app.use((err, req, res, next) => {
    const errorDetails = {
        message: err.message,
        stack: err.stack,
        path: req.path,
        user: req.user ? req.user.id : 'guest', // Example user data
    };

    // Report the error with additional context
    startErrorReporter.reportError(errorDetails);
    res.status(500).send('An error occurred. Please try again later.');
});
```

## Configuration Options

The `error-reporter` package provides several configuration options to customize its behavior:

- **Custom Message Format:** Modify the format of error messages sent to Discord. For example, you can include user details, timestamps, and more.
  
- **Error Filters:** Set up filters to exclude certain types of errors from being reported. This can help reduce noise from known issues.

- **Rate Limiting:** Implement rate limiting to prevent your Discord channel from being spammed with error reports.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request. Make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Discord Webhooks Documentation](https://discord.com/developers/docs/resources/webhook)
- [Node.js Documentation](https://nodejs.org/en/docs/)



Feel free to modify any sections or add any additional features that your `error-reporter` service may include!