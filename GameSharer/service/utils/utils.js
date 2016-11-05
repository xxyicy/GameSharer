function fail(message) {
  return {
    succ: false,
    result: message
  }
}

function succ(message) {
  return {
    succ: true,
    result: message
  }
}

module.exports = {
  fail: fail,
  succ: succ
}
