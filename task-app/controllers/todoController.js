var bodyParser = require('body-parser');
var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://user:user@cluster0.pwavs.mongodb.net/testone?retryWrites=true&w=majority')

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

var todoSchema = new mongoose.Schema({
    name: String,
    description: String,
    creator: String,
    duration: Number
})

var Todo = mongoose.model('Todo', todoSchema)


module.exports = function(app) {

    app.get('/todo', function(req, res){
        Todo.find({}, function(err, data) {
            if(err) throw err
            res.render('todo', {todos: data});
        })
        
    })

    app.post('/todo', urlencodedParser, function(req, res){
        var newTodo = Todo(req.body).save(function(err, data) {
            if(err) throw err
            res.json(data);
        })
    })

    app.delete('/todo/:item', function(req, res){

        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data) {
            if(err) throw err
            res.json(data)
        })
    })
}