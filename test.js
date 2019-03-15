var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
var curentFolder = "TestFolder/";

function OpenFolder(id) {

}

function ShowAllContent(){
  takeFromServer("/show-all");
}

function ShowAllFolders(){
  takeFromServer("/show-folders");
}

function ShowAllFiles(){
  takeFromServer("/show-files");
}

function AddNewFolder(){
  var newName = prompt("Enter name of new folder", "new_folder");
  if (newName != null) {
      alert('newName');
  }
}

function AddNewFile(){
  var newName = prompt("Enter name of new file", "new_file");
  if (newName != null) {
      alert('newName');
  }
}

function add(id, data){
  content = JSON.parse(data);
  document.getElementById(id).innerHTML  = content.name;
}

function Delete(id){
  document.getElementById(id).remove();
}

function Rename(id) {
  var newName = prompt("Enter new name of " + id, id);

  if (newName != null) {
    var data = {
      task: "rename",
      element: id,
      reName: newName
    };

console.log(JSON.stringify(data));

    fetch("http://localhost:8081/rename",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
  }
}

function SortByDate() {

}

function SortByName() {

}

function ShowFilesCreatedAfter() {
  var today = new Date();
   var date = prompt("Please enter date.", today.getDate()+"-"+monthNames[today.getMonth()]+"-"+today.getFullYear());

   if (date != null) {
       x = "Hello! You have entered date as: " + date;
       alert(x);
   }
}

function takeFromServer(url){
  fetch('http://localhost:8081' + url)
    .then(function(response) {return response.json()})
    .then(function(data){
      console.log('data', data)
      document.getElementById("MainFild").innerHTML  = data.name
    });
}



//----------------------------------------------

function ChangeOnServer(url){
  fetch('http://localhost:8081' + url)
    .then(function(response) {return response.json()})
    .then(function(data){
      console.log('data', data)
      document.getElementById("MainFild").innerHTML  = data.name + '  |  ' + data.type + '  |  ' + data.date
    });
}
