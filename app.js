const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const date = require(__dirname + "/views/date.js");


const items = ["Study","A bit more","Keep Going"];
const workItems = [];
// var allows scope jump outside or var is global for code
app.get("/", function(req,res){
    //let day = date.getDate();
    const day = date.getDay();
    res.render("list",{ListTitle:day,newListItem:items});

})

app.post("/",function(req,res){
    const item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/about",(req,res) => {
    res.render("about");
})

app.get("/work",(req,res)=>{
    res.render("list",{ListTitle:"Work List",newListItem:workItems});
})


app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
