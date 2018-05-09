var Multipart = require('lambda-multipart');

module.exports = (event) => new Promise((resolve, reject) => {
  try {
    const results = { fields: {}, fieldsList: [], files: [] };
    resolve(results);
    // const parser = new Multipart(event);
    //
    // parser.on('field', (key, value) => {
    //   try {
    //     results.fields[key] = value;
    //     results.fieldsList.push({ key, value });
    //   } catch (e) {
    //     reject(e)
    //   }
    // });
    //
    // parser.on('file', (file) => {
    //   try {
    //     results.files.push(file);
    //   } catch (e) {
    //     reject(e)
    //   }
    // });
    //
    // parser.on('finish', () => {
    //   try {
    //     resolve(results);
    //   } catch (e) {
    //     reject(e)
    //   }
    // });
    //
    // parser.on('error', (error) => {
    //   try {
    //     reject(error);
    //   } catch (e) {
    //     reject(e)
    //   }
    // });
  } catch (e) {
    reject(e)
  }
})
