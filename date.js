// This is a library or module we are making like express or ejs or etc...
console.log(module); // This will print the details of this file
module.exports.getDate = getDate; // Writing module.exports = getDate; will bind only one function for exporting for use in other files. Since module.exports is a javascript object as written in documentation we use this instead so we can export multiple things.
function getDate() {
  const today = new Date(); //As you can see we arent re assigning value to the today variable in its scope which here is the function so we can safely use const. Same logic for other const variables. Only values saved in app.js will be remembered even when page is refreshed and that too doesnt mean reassignment. Remembering values and reassigning the values are different things. So no worries.
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return today.toLocaleDateString("en-US",options);
}
exports.getDay = function() { // Yes we can do it this way too without giving the function a name. Saves us from some typing. We also remobved the module from module.exports and it still means the same thing
  const today = new Date();
  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US",options);
}
console.log(module.exports);
