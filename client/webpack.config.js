module.exports = {
    // ... your config
    resolve: {
      fallback: {
        path: require.resolve("path-browserify")
      }
    }
  }