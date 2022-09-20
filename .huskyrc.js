const tasks = (arr) => arr.join(" && ");

module.exports = {
  hooks: {
    "pre-commit": tasks([
      "cd react-app && lint-staged",
      "CI=true npm test",
      "npm audit --production --audit-level=critical",
      "cd ../adonis-app && lint-staged",
      "adonis test",
      "npm audit --production --audit-level=critical",
    ]),
  },
};
