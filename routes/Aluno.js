var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Aluno = mongoose.model('Aluno');
var flash = require('connect-flash');


Promise = global.Promise;
mongoose.connect('mongodb://localhost/Aluno', { useMongoClient: true });
require('../models/Aluno');

router
  .get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/add', function(req, res){
    res.render('add_Aluno', {
      title: 'Adicione novo aluno'
    });
  });

  router.post('/add', function(req, res){
      let entry = new Aluno(req.body);
      
      entry.save(function(err){
        if(err) {
          console.error(err);
          return;
        } else {
            res.redirect('/');
        }
      });
  });
  
  router.get('/edit/:id', function(req, res){
    Aluno.findOne({ _id : req.params.id}, function(err, it){
      res.render('edit_Aluno', {
        title: 'Edite Aluno',
        item: it
      });
    });
  });
  
  router.post('/edit/:id', function(req, res){
    Aluno.findOne({ _id : req.params.id}, function(err, entry){
      entry._id = new mongoose.Types.ObjectId(req.params.id);
      entry['School'] = req.body.School;
      entry['Sex'] = req.body.Sex;
      entry['Age'] = req.body.Age;
      entry['Traveltime'] = req.body.Traveltime;
      entry['Studytime'] = req.body.Studytime;
      entry['Failures'] =req.body.Failures;
      entry['Famrel'] =req.body.Famrel;
      
      entry.save().then( () => res.redirect('/')).catch();
    });
  });
  
  router.delete('/:id', function(req, res){
    let query = {_id: req.params.id};
  
    Aluno.deleteOne(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
  });

module.exports = router;
