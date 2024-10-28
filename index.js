// errorReporter.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Joi = require('joi');
const winston = require('winston');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

let discordWebhookUrl = '';

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
});

// Error payload validation schema
const errorSchema = Joi.object({
  errorMessage: Joi.string().required(),
  url: Joi.string().uri().required(),
  line: Joi.number().integer().required(),
  column: Joi.number().integer().required(),
  errorStack: Joi.string().allow(null),
});

// Function to send error details to Discord
async function sendErrorToDiscord(errorMessage, url, line, column, errorStack) {
  const fetch = (await import('node-fetch')).default;
  const payload = {
    content: `🚨 **Error Alert!** 🚨\n**Message**: ${errorMessage}\n**File**: ${url}\n**Line**: ${line}:${column}\n**Error Stack**: ${errorStack || 'N/A'}`
  };

  try {
    await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    logger.error("Failed to send error to Discord:", err);
  }
}

// Expose an endpoint for the client to report errors
app.post('/report-error', limiter, async (req, res) => {
  const { errorMessage, url, line, column, errorStack } = req.body;

  // Validate incoming request
  const { error } = errorSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  await sendErrorToDiscord(errorMessage, url, line, column, errorStack);
  logger.info("Error reported successfully:", { errorMessage, url, line, column });
  res.status(200).send({ message: 'Error reported successfully' });
});

// Start the SDK server and accept a webhook URL from the user
module.exports = function startErrorReporter(webhookUrl, port = process.env.PORT || 3000) {
  discordWebhookUrl = webhookUrl;
  app.listen(port, () => {
    logger.info(`Error reporter running on port ${port}`);
  });
};
