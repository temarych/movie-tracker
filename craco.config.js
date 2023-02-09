const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@theme": path.resolve(__dirname, "src/theme"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@saga": path.resolve(__dirname, "src/saga")
    }
  }
};