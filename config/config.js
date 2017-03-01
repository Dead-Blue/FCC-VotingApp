module.exports = {
  "development": {
      db:'mongodb://localhost:27017/fcc-voting-app-development',
      sessionSecret:'development'
  },
  "production": {
      db:'mongodb://localhost:27017/fcc-voting-app-production',
      sessionSecret:'production'
  }
};