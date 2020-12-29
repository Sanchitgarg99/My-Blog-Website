const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts=[];
var titletoshow = "";
var paratoshow = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{homeMsg:homeStartingContent,posts:posts,postsLength:posts.length});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactMsg:contactContent});
});
app.get("/about",function(req,res){
  res.render("about",{aboutMsg:aboutContent});
});
app.get("/compose",function(req,res){
  res.render("compose",{aboutMsg:aboutContent});
});
app.get("/post",function(req,res){
  res.render("post",{titleofpost:titletoshow,paraofpost:paratoshow});
  // res.render("post");
});



app.post("/compose",function(req,res){
    const composeObject = {
      Title:req.body.composeTitle,
      Post: req.body.composePost
    }
    posts.push(composeObject);
    // console.log(posts);
    res.redirect("/");
});


app.get("/post/:postName",function(req,res){
  // console.log(req.params.postName);
  var k=0 ;
  for(var i=0;i<posts.length;i++){
    if(_.lowerCase(posts[i].Title)===_.lowerCase(req.params.postName)){
      console.log(" Match Found !!");
        titletoshow = posts[i].Title;
        paratoshow = posts[i].Post;
        console.log(titletoshow +" "+paratoshow);
        k=1;
      break;
    }
  }
  if(k===0){
    titletoshow = "Please Use Valid URL..";
    paratoshow = "";
  }
  res.redirect("/post");
});







app.listen(process.env.PORT || 3006, function() {
  console.log("Yuhu");
});
