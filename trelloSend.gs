/*
// Trigger Builder. RUN ONLY ONCE... Press Play and authorize Gmail ... then comment.
// Already run in Mando de Control... no need for more... This will avoid duplicate Emails.
 ScriptApp.newTrigger('trelloSend')
  .forSpreadsheet(SpreadsheetApp.getActive())
  .onEdit()
  .create();
*/
//Variables
var trelloID = {"name_in_spreadsheet": "trello_id"};
var trelloMembers = ["name_in_spreadsheet"];
var colorsID = {"#color_in_spreadsheet": "color_trello_id"};
var colorList = ["#color_in_spreadsheet"];
var resultsContentID = {"resultsContent_in_spreadsheet":"resultsContent_trello_id"};
var resultsContentList = ["resultsContent_in_spreadsheet"];
// API Trello keys and tokens
var apiKey = 'trello_api_key';
var trelloToken = 'trello_api_token';
var idList = 'trello_id_list';
  
//Functions
/*
  This method verifies if an element in a list, the element must also be a key for a
  dictionary, then returns the value of dictionary with key the element if exists in
  other case returns "".
  Parameters: element is a type string, elementList is a list of strings and
              elementDictionary is a type dictoionary with keys type strings
*/
function IsInTheList(element,elementList,elementDictionary){
  for (var i=0; i<elementList.length; i++) {
    if (elementList[i]===element) {
      return elementDictionary[element];
    }
  }
  return "";
};
/*
  This method verifies all information of a row for make a trello card through
  trello API, when a user finish of edit the column G,H and I.
*/
function trelloSend(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Selected Cell Variable
  var range = e.range;
  var editedText = range.getValue();
  // Get value of the selected cell row
  var mentionRow = range.getRow();
  var contentRange = "D" + mentionRow + ":F" + mentionRow;
  var color = ss.getRange(contentRange).getBackgroundColor();
  var contentList = ss.getRange(contentRange).getValues();
  // Selecting columns content
  var purposeContent = contentList[0][0];
  var whatContent = contentList[0][1];
  var resultsContent = contentList[0][2];
  // Select task due date
  var dateEndContent = ss.getRange("J".concat(mentionRow)).getValues()[0][0];
  // Normalizing cell content, removing unsupported characters and accents
  var normalizedMember = editedText.toLowerCase().replace(/[^\w\s]/gi, '');
  // Getting a list of all members from input
  var memberList = normalizedMember.split(' ');
  // Mando Members and Trello membesIds content
  var memberIdList = [];
  for (i=0; i<memberList.length; i++) {
    var memberId = IsInTheList(memberList[i],trelloMembers, trelloID);
    if(memberId !=""){
      memberIdList.push(memberId);
    }
  }
  var joinedMemberIdList = memberIdList.join(',');
  // Cell background color selector for task category
  var labelColor = IsInTheList(color,colorList,colorsID);
  // Mando KPIs and Trello IdLabels content (read README.md for more info)
  var kpiLabel = IsInTheList(resultsContent,resultsContentList,resultsContentID);
  //Variables for make a POST to Trello
  var cardName = purposeContent;
  var cardDescription = whatContent;
  var idMembers = joinedMemberIdList;
  var idLabels = labelColor+','+kpiLabel;
  var postURL = 'https://api.trello.com/1/cards?name=' + cardName + '&desc=' + cardDescription + '&idList=' + idList + '&idMembers=' + idMembers + '&idLabels=' + idLabels + "&due="+ dateEndContent + '&keepFromSource=all&key=' + apiKey + '&token=' + trelloToken;
  var options = {
   'method' : 'post'
  };
  //Logic for make POST to Trello
  if (idMembers != null){
    if(idMembers.length == 0){
      Logger.log('idMEmbers has legth zero!!');
    }else{
      // POSTing to trello API 
      UrlFetchApp.fetch(postURL, options);
      Logger.log('Trello card sent!!');
  }
  }else{
    Logger.log('Trello Card do not have a responsable!!');
  }
};
