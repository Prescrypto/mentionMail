function trelloSend(e){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Selected Cell Variable
  var range = e.range;
  var editedText = range.getValue();
  // Get value of the selected cell row
  var mentionRow = range.getRow();
  var mentionCell = range.getA1Notation();
  var contentRange = "D" + mentionRow + ":F" + mentionRow;
  var color = ss.getRange(contentRange).getBackgroundColor();
  var contentList = ss.getRange(contentRange).getValues();
  Logger.log(contentList);
  // Selecting columns content 
  var purposeContent = contentList[0][0];
  var whatContent = contentList[0][1];
  var resultsContent = contentList[0][2];
  Logger.log(whatContent);
  var contentString = contentList.join(' ');
  Logger.log(contentString);
  var uriEncodedString = encodeURIComponent(contentString);
  Logger.log(uriEncodedString);
  Logger.log(editedText);
  // Normalizing cell content, removing unsupported characters and accents
  var normalizedMember = editedText.toLowerCase().replace(/[^\w\s]/gi, '');
  Logger.log('This is normalized member: ' + normalizedMember);
  //  Getting a list of all members from input  
  var memberList = normalizedMember.split(' ');
  Logger.log(memberList);
  Logger.log(memberList[0]);
  
  var memberIdList = [];

  // Mando Members and Trello membesIds content (read README.md for more info)
  for (i=0; i<memberList.length; i++) {
  
  switch (memberList[i]) {
    case 'membername':
      var memberId = 'os.environ.TRELLO_MEMBER_ID';
      Logger.log(memberId);
      break;
  //Add as many cases as necessary
  };
    Logger.log(memberId);
    memberIdList.push(memberId);
  };
  Logger.log(memberIdList);
  
  var joinedMemberIdList = memberIdList.join(',');
  Logger.log('This is a joined member list: ' + joinedMemberIdList);
  
  // Cell background color selector for task category
    Logger.log(color);
  switch (color) {
    case '#color':
      var labelColor = 'os.environ.TRELLO_ID_COLOR';
      Logger.log(labelColor);
      break;
  //Add as many cases as necessary
  };
  
  // Mando KPIs and Trello IdLabels content (read README.md for more info)
  switch (resultsContent) {
    case 'kpi label':
      var kpiLabel = 'os.environ.TRELLO_ID_KPI';
      Logger.log(textLabel);
      break;
  //Add as many cases as necessary
  };
  
  Logger.log('This is kpiLabel: ' + kpiLabel);
// API keys and tokens
 var apiKey = 'os.environ.TRELLO_API';
 var trelloToken = 'os.environ.TRELLO_TOKEN';
  
 var cardName = purposeContent;
 var cardDescription = whatContent;
 var cardLabel = ''; //This value is empty
 var idList = 'os.environ.TRELLO_ID_LIST'; 
 var idMembers = joinedMemberIdList;
 var idLabels = kpiLabel + ',' + apiKey;
 var options = {
   'method' : 'post'
 };  
 // URL Builder
 var postURL = 'https://api.trello.com/1/cards?name=' + cardName + '&desc=' + cardDescription + '&idList=' + idList + '&idMembers=' + idMembers + '&idLabels=' + idLabels + '&keepFromSource=all&key=' + apiKey + '&token=' + trelloToken;
 Logger.log(postURL);
 // POSTing to trello API 
 if (idMembers != null){
   if(idMembers.length == 0){
     Logger.log('idMEmbers has legth zero!!');
   }else{
     UrlFetchApp.fetch(postURL, options);
     Logger.log('Trello card sent!!');
   };
 }else{
   Logger.log('idMEmbers is null!!');
 };
};
