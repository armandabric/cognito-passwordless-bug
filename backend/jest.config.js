module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  modulePathIgnorePatterns: ["<rootDir>/build/"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
