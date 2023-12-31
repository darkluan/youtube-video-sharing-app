const formidable = require("formidable");
const { PassThrough } = require("stream");
const config = require("app/config");

module.exports = function(req, res, next) {
  const form = new formidable.IncomingForm();
  form.maxFileSize = config.maxFileSize;
  const fields = {};
  form.onPart = (part) => {
    const pass = new PassThrough();
    if (!part.filename) {
      form.handlePart(part);
      return;
    }
    let file = part.name;
    let data = { file: {} };

    data.file.name = part.filename;
    data.file.type = part.mime;
    part.on("data", function(buffer) {
      pass.write(buffer);
    });
    part.on("end", function() {
      pass.end();
      data.data = pass;
      fields[file] = data;
    });
  };
  form.parse(req, function(err, body) {
    if (err) {
      throw err;
    }
    req.body = { ...body, ...fields };
    next();
  });
};
