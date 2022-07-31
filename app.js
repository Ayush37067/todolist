//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); // Since our module is a local one and not installed using npm so its method of requiring it is a little different. Whenever we say require this module, in our case the date.js, it will go inside date.js and run all the code inside it.
console.log(date); // date is module.exports which is an object

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // Tells express to use the static files in public folder
app.set('view engine','ejs'); // Many other things can be used for templating so we specifically tell that use ejs for this website for templating. So ejs is set as our view engine.

const items=["Buy Food", "Cook Food", "Eat Food"]; // You can push elements in array even if its a const but after this line you cant do something directly like this as items =["yo"] as it will be kind of reassigning. You also cant redeclare like const items =["yo"] after this line
const workItems=[]; // You can also change value of a key in a object that is a const variable but you cant overwrite the object
app.get("/", function(req, res){ // When user tries to access the home route this will send what to send using that function
  const day = date.getDate();
res.render("list", {listTitle: day,newListItems:items}); // res.render uses the view engine we set up to render a particular page. res.render("list") will tell express to go to views folder and look for lists.ejs and render it. The variable we will pass in will be a javascript object. So the page will be rendered and a variable named kindOfDay will be passed to list.ejs whose value will be stored in day variable. Toh iska mtlab hai ye list naam k ejs file me ye variable ka value daal dega
  // We are creating our response by rendering a file called list.ejs in which values would be put on the spot while rendering or creating the page. Notice that we arent sending any file to the user, we are dynamically creating the page in front of him with correct values so thats why we use res.render instead of res.sendFile or res.send
});
app.post("/",function(req,res) { //As we have setup body parse, we can now grab the value of newItem by using req.body.newItem, body parser helps in grabing info from th body of the page user is accessing
  const item = req.body.newItem; // When submit button is pressed our form will make a post request to the home route and its going to post the value of the text input which has a name of new item. When that request is received it gets caught inside this app.post section and we tap into the request looking through the body of the request and we search for the value of something called new item. So in req.body.newItem, req taps into the request, body looks through the body of the request and newItem tells to find its value
  if (req.body.list ==="Work") { // Toh basically hum keh reh ki work page ka submit button daba hai toh work wala page k variables and arrays k saath render krna and agar home route wala submit button daba hai toh home route wala array me sb append kr k home route wala variable se render krna aur ye sb isiliye kr rhe hain kyuki submit button sirf home route me hi post krta hai isiliye sahi array and variables ko render krne k liye hum button ka id type kuch dedete hain which comes with a post request body as a key called button and uska value hum thora dekh daakh k set krdete hain jo humare case me page ka title hai, and button key k value ka shayad koi word limit ya space tk hi value return krna kuch hota hai. Aur haan isme jo req.body.list ka jo list hai ye actually button key ka naam hai and res.render("list"...) me jo list hai wo alag list hai wo humare template file ya ejs file ka naam hai.
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/"); // This will take you to line 11, the app.get("/"....) line
  }
});// Always remember multiple things can be posted to the same route for example in a form submit there can be multiple data like name age etc... so ou have to specify what data you want from the body or what data you want from all the data that was sent like here we specified we want the value of newItem from the post request body.
app.get("/work", function(req,res) { // This will target our work route so we can provide a work todo list also
  res.render("list", {listTitle:"Work List", newListItems:workItems});
});
app.get("/about", function(req,res) {
  res.render("about"); // Passing parameters or variables for rendering is not necessary. It was necessary for list.ejs coz its structure needed the variables for rendering but the same is not true for about.ejs as it doesnt need any variables for rendering
})
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
