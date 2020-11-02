
let user = ''

const logToConsole = (msg) => {
  
  user = msg
  console.log(user)
  return `hello ${user}`
}
  
  module.exports = logToConsole;