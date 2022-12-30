const {
  mclTheme,
  mclHeading,
} = require("@bobbykim/manguito-theme/themeVariables.cjs");

module.exports = {
  content: [
    "./pages/**/*.{vue,ts,tsx,js,cjs}",
    "./components/**/*.{vue,ts,tsx,js,cjs}",
    "./layouts/**/*.{vue,ts,tsx,js,cjs}",
    "./node_modules/@bobbykim/**/*.{vue,ts,js,cjs}",
  ],
  theme: mclTheme,
  plugins: [mclHeading],
};
