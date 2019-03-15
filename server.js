var http = require('http');
var fs = require('fs');
const port = 8081;
var url = "TestFolder/";

var server = http.createServer(function (request, response) {
	var readStream = fs.createReadStream('./index.html');
    readStream.pipe(response);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
  	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  	response.setHeader('Access-Control-Allow-Headers', '*');
  	if ( request.method === 'OPTIONS' ) {
  		response.writeHead(200);
  		response.end();
  		return;
  	}

		console.log("request.url= " + request.url);

		if(request.url === '/show-all'){
			var data = {
				name: FindAllObjects(url)
				};
    }
		else if (request.url === '/show-folders') {
			var data = {
				name: FindAllFolders(url)
				};
    }
    else if (request.url === '/show-files') {
			var data = {
				name: FindAllFiles(url)
				};
    }
		else if (request.url === '/open-folder') {
			console.log(id);
    }
		else if (request.url === '/rename') {
			console.log("rEnAmE - " + request.body);
    }

		else {
    	console.log("bad url");
    }


      data = JSON.stringify(data);
      response.setHeader('Content-Type', 'application/json');
      response.end(data);
      console.log('Was show-all');
			console.log(data);
      return;

});

server.listen(port);
console.log("server started on http://localhost:" + port + "/");


function FindAllObjects(url){
	var str = '';
	var IsFolder = 'Folder';
	var FileSize = 0;
	var FileDate = 0;

	console.log("read directory" + url);

	var files = fs.readdirSync(url);
	for(var i in files) {
		var stats = fs.statSync(url + files[i]);
		if (stats.isDirectory()){
			IsFolder = 'Folder';
			FileSize = stats.size;
			FileDate = stats.mtime;
		}
			else {
				IsFolder = 'File';
				FileSize = stats.size;
				FileDate = stats.mtime;
			}

		console.log('Fined objects: ' + files[i]);
		str += CodeGenerator(files[i], IsFolder, FileDate, FileSize);
	}
	return str;
}

function FindAllFolders(url){
	var str = '';
	var IsFolder = 'Folder';
	var FileSize = 0;
	var FileDate = 0;

	console.log("read directory" + url);

	var files = fs.readdirSync(url);
	for(var i in files) {
		var stats = fs.statSync(url + files[i]);
		if (stats.isDirectory()){
			IsFolder = 'Folder';
			FileSize = stats.size;
			FileDate = stats.mtime;
		}
			else {
				IsFolder = 'File';
				FileSize = stats.size;
				FileDate = stats.mtime;
			}

		if(IsFolder == 'Folder'){
			console.log('Fined objects: ' + files[i]);
			str += CodeGenerator(files[i], IsFolder, FileDate, FileSize);
		}
	}
	return str;
}

function FindAllFiles(url){
	var str = '';
	var IsFolder = 'Folder';
	var FileSize = 0;
	var FileDate = 0;

	console.log("read directory" + url);

	var files = fs.readdirSync(url);
	for(var i in files) {
		var stats = fs.statSync(url + files[i]);
		if (stats.isDirectory()){
			IsFolder = 'Folder';
			FileSize = stats.size;
			FileDate = stats.mtime;
		}
			else {
				IsFolder = 'File';
				FileSize = stats.size;
				FileDate = stats.mtime;
			}

			if(IsFolder == 'File'){
				console.log('Fined objects: ' + files[i]);
				str += CodeGenerator(files[i], IsFolder, FileDate, FileSize);
			}
		}
	return str;
}

function CodeGenerator(name, type, date, size){
	var space = ".............";
	var string = "<div id=" + name + " class=" + type + ">";

	if( type == 'Folder' ){
		string += "<button onclick=OpenFolder('" + name + "')>Open</button>";
	}
	else {
		string += space;
	}

	string += name + space + date + space + size +
					"<button onclick=Rename('" + name + "')>Rename" + type + "</button>" +
					"<button onclick=Delete('" + name + "')>Delete" + type + "</button>" +
					"</div>";

	return string;
}


//---------------------------
/*

var _getAllFilesFromFolder = function(dir) {
    var filesystem = require("fs");
    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {
        file = dir+'/'+file;
        var stat = filesystem.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);
    });

    return results;
    alert(results);

};

*/
// _getAllFilesFromFolder(__dirname + "folder");
