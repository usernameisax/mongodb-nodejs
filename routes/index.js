var express = require('express');
var csv = require("fast-csv");
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var Aluno = mongoose.model('Aluno');
var csvfile = __dirname + "/../public/files/Alunos.csv";
var stream = fs.createReadStream(csvfile);

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Importando arquivo CSV usando NodeJS.' });
}).get('/import', function (req, res, next) {
  var csvStream = csv()
    .on("data", function (data) {
      var item = new Aluno({
        'School': data[0],
        'Sex': data[1],
        'Age': data[2],
        'Traveltime': data[3],
        'Studytime': data[4],
        'Failures': data[5],
        'Famrel': data[5]
      });
      item.save(function (error) {
        console.log(item);
        if (error) {
          throw error;
        }
      });
    }).on("end", function () {
      console.log(" Fim do arquivo de importação.");
    });
  stream.pipe(csvStream);
  res.json({ success: "Os dados foram importados com sucessos.", status: 200 });
})

  .get('/fetchdata', function (req, res, next) {

    Aluno.find({}, function (err, docs) {

      if (!err) {

        res.json({ success: "Atualização finalizada.", status: 200, data: docs });

      } else {

        throw err;

      }

    });

  });

module.exports = router;