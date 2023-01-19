function doGet(request) {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}

function execute(docName) {
// Create a document with the name provided in form
var doc = DocumentApp.create(docName);
 // Get the root folder of your Google Drive.
var rootFolder = DriveApp.getRootFolder();

// Create a folder called 'projects' in the root folder.
var projectsFolder = rootFolder.createFolder('Projects');
 
// Create a folder with the doc name inside the 'projects' folder.
var buyHouseFolder = projectsFolder.createFolder(docName);

//add doc to the root of file
var dir = DriveApp.getFolderById(buyHouseFolder.getId());
var file = DriveApp.getFileById(doc.getId()); // Added
dir.addFile(file); // Modified
var fileUrl = file.getUrl(); // will be returned to redirect user to the url of doc


//this fills up the body of the template
var body = doc.getBody();  //initiates a body object
var element = body.appendParagraph("Plan - " + doc.getName()); // add text to doc
element.setHeading(DocumentApp.ParagraphHeading.HEADING2); // set it as heading 2

var headings = [ 'Todo', 'In Progress','Dependencies', 'Done', 'Artifacts', 'Meetings/Comms']; // add headers to array
  
for ( header in headings) {
    
    var element = body.appendParagraph(headings[header]);
    element.setHeading(DocumentApp.ParagraphHeading.HEADING2); 
    doc.appendListItem("").setGlyphType(DocumentApp.GlyphType.BULLET);  //add bullet point
  
  }
return fileUrl;
}

