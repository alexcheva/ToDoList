//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();

mongoose.connect("mongodb://localhost:27017/todoDB", {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const ToDo = mongoose.model("ToDo", {name: String});
const Monday = mongoose.model("Monday", {name: String});
const Tuesday = mongoose.model("Tuesday", {name: String});
const Wednesday = mongoose.model("Wednesday", {name: String});
const Thursday = mongoose.model("Thursday", {name: String});
const Friday = mongoose.model("Friday", {name: String});
const Saturday = mongoose.model("Saturday", {name: String});
const Sunday = mongoose.model("Sunday", {name: String});

// const days = ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// days.forEach(function(day){
// 	console.log(day);
// 	var day = mongoose.model(day, {name: String});
// });


 //Create schema for todos:
 const itemsSchema = new mongoose.Schema({
   name: String
 });
 //create schema for days of the week/lists
 const listSchema = {
   name: String,
   items: [itemsSchema]
 };
//Create model for a new todo:
 const Item = mongoose.model("Item", itemsSchema);
 //Create model for a new day/list:
 const List = mongoose.model("List", listSchema);


const item1 = new Item ({name: "Click on task to cross it"});
const item2 = new Item ({name: "Or click on trash icon to delete it"});

const DefaultTasks = [item1, item2];
 ToDo.insertMany(DefaultTasks, function(err){
 	if (!err){
 		console.log("Sucessfully added.")
 	}
 });



app.get("/", function(req, res){
    
	 List.find({}, function(err, results){
	 	if(!err){
            console.log(results)
	 		res.render("week", {listItems: results });
	 	}
	 });
	
});

app.post("/", function(req, res){
    const listName = req.body.listName;
    const itemName = req.body.newItem;
    
    const newItem = new Item({
        name: itemName
    });
    newItem.save()
    List.findOne({name: listName}, function(err, foundList){
        if(!err){
            if(!foundList){
                const list = new List({
                    name: listName,
                    items: [...DefaultTasks, newItem]
                });
                list.save();
                res.redirect("/");
            } else {
                foundList.items.push(newItem)
                newItem.save()
                foundList.save()
                res.redirect("/");
            }
        }
    });
    
//	if (listName === "Monday"){
//        newItem.save();
//        res.redirect("/");
//    } else {
//        List.findOne({name: listName}, function(err, foundList){
//            foundList.items.push(newItem);
//            foundList.save();
//            res.redirect("/");       
//            })
//	};
    
});

app.post("/delete", function(req,res){
    const {listName, item} = req.body
    List.findOne({name: listName}, function(err, foundList){
        if(!err){
            if(!foundList){
                res.redirect("/");
            } else {
                foundList.items.forEach((x, idx) => {
                    console.log(x._id == item)
                    if ( x._id == item ) {
                        foundList.items.remove(x)
                        foundList.save()
                    }
                })
            }
            res.redirect("/");                        
        }
    });

});

app.listen(3000, function(){
	console.log("Server started on port 3000.")
});