// https://stackoverflow.com/a/49169607
const Busboy = require('busboy');
const YError = require('yerror');
const getRawBody = require('raw-body');
const noop = () => null;

module.exports = (content, headers, opts) => new Promise((resolve, reject) => {
  let log = () => null;
  if (opts.verbose) { log = console.log; } else { log = noop; }
  if (!headers['content-type'] && !!headers['Content-Type']) { headers['content-type'] = headers['Content-Type']; }
  log('Initializing Parse', content, headers);
  const filePromises = [];
  const data = {};
  const parser = new Busboy({ headers });

  parser.on('field', (name, value) => {
    log('parsed field', name, value)
    data[name] = value;
  });
  parser.on('file', (name, file, filename, encoding, mimetype) => {
    log('parsed file', name, filename, encoding, mimetype)
    data[name] = {
      filename,
      encoding,
      mimetype,
      stream: file,
    };
    filePromises.push(
      getRawBody(file).then(rawFile => (data[name].content = rawFile))
    );
  });
  parser.on('error', err => {
    log('error during parse')
    reject(YError.wrap(err))
  });
  parser.on('finish', () => {
    log('finished parse')
    return resolve(Promise.all(filePromises).then(() => data))
  });
  parser.write(content);
  parser.end();
});
