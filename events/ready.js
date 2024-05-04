const p = require("primebit.js")

module.exports = {
  run: (client) => {
    p.log(`✅ ${client.user.name} is Connected to Guilded!`)
  }
}
