module.exports = {
  root: true,
  extends: ["expo", "prettier"],
  rules: {
    "id-length": ["warn", { min: 2, exceptions: ["i", "e", "x", "y", "f", "C"] }],
    "no-unused-vars": "warn",
  },
};
