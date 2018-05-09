var Multipart = require('lambda-multipart');

module.exports = (event) => new Promise((resolve, reject) => {
  const results = { fields: {}, fieldsList: [], files: [] };
  var parser = new Multipart(event);

  parser.on('field',function(key, value){
    results.field[key] = value;
    results.fieldsList.push({ key, value });
  });

  parser.on('file',function(file){
    results.files.push(file);
  });

  parser.on('finish',function(){
    resolve(results);
  });

  parser.on('error',function(error){
    reject(error);
  });
})
