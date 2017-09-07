/*
// Trigger Builder. RUN ONLY ONCE... Press Play and authorize Gmail ... then comment.
// Already run in Mando de Control... no need for more... This will avoid duplicate Emails.
 ScriptApp.newTrigger('mentionMail')
   .forSpreadsheet(SpreadsheetApp.getActive())
   .onEdit()
   .create();
*/

// Creates an array from G3:I17.
var columnList = ['G', 'H', 'I'];
var rangeList = [];

for (var num = 3; num < 18; num++) {
    columnList.forEach(function(letter) {
        rangeList.push(letter + num);
    })
};

function mentionMail(e){
  // Parses @Mentions from a google sheet cell, sends an email and comments cell
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetURL = ss.getUrl();
  var range = e.range;
  var editedText = range.getValue();
  var mentionRow = range.getRow();
  var mentionCell = range.getA1Notation();
  var contentRange = "D" + mentionRow + ":F" + mentionRow;
  var contentList = ss.getRange(contentRange).getValues();
  // Gives a list of @Mentions in current cell
  var mentions = editedText.match(/@\w*/g);
  // Gets Sheet with a list of @Mentions and mails. MUST DO:MANUALLY SET MAIL LIST ID FROM SHEET URL
  var sheet = SpreadsheetApp.openById("1ZEDgDhKPtVU2SR0RlDCjNjkXkoqdo3faUnM7s9Y5lF8");
  var data = sheet.getDataRange().getValues();
  // Set Note Flag
  var setNote = false;
  // Iterates over @Mentions found and sets them in a temporal variable in lowerCase and removes extra characters
  for (var i = 0; i < mentions.length; i++) {
    var correctMention = mentions[i].toLowerCase().replace(/[^\w\s]/gi, '');
    // Iterates over list of mails and sets them in a temporal variable in lowerCase and removes extra characters
    for (var j = 0; j < data.length; j++) {
      var correctName = data[j][0].toLowerCase().replace(/[^\w\s]/gi, '');
        // Sends a mail if there is a match between @Mentions and Mail List.
      if (correctMention == correctName) {
        setNote = true;
        var subject = "👻 New Mention from Mando de Control 🖖 💉 🤑";
        // If mention is made inside G3:I17, it sends an email that includes cells from the same row from D, E, and F columns.
        if (rangeList.indexOf(mentionCell) != -1) {
          MailApp.sendEmail(data[j][1], subject, editedText + "\n" + "Purpose (Customer): " + contentList[0][0] + "\n" + "What? (Process): " + contentList[0][1] + "\n" + "Results (KPIs): " + contentList[0][2] + "\n" + sheetURL);
        } else {
        MailApp.sendEmail(data[j][1], subject, editedText + "\n" + sheetURL);
        };
      };
    };
  };
  // Set a note to current cell
  if (setNote) {
    range.setNote('Mail Sent to @Mentions on: ' + new Date());
  }
}
