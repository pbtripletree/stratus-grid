"use strict";

const success = (status, message, body) => ({
  status,
  message,
  body,
});

const error = (status, error) => ({
  status,
  error,
});

module.exports = {
  success,
  error,
};
