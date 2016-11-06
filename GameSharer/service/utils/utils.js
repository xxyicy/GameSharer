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

function respond(res, obj) {
  res.format({
    json: function () {
      res.json(obj);
    }
  });
}

module.exports = {
  fail: fail,
  succ: succ,
  respond: respond
}
