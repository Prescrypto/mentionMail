/*
// Trigger Builder. Run only once, then comment.
 ScriptApp.newTrigger('mentionMail')
   .forSpreadsheet(SpreadsheetApp.getActive())
   .onEdit()
   .create();
*/

function mentionMail(e){
  // Parses @Mentions from a google sheet cell, sends an email and comments cell
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetURL = ss.getUrl();
  var range = e.range;
  var editedText = range.getValue();
  // Gives a list of @Mentions in current cell
  var mentions = editedText.match(/@\w*/g);
  // Gets Sheet with a list of @Mentions and mails. MUST DO:MANUALLY SET MAIL LIST ID FROM SHEET URL
  var sheet = SpreadsheetApp.openById("1IDcv9Qz-FZjhxP3jpmvdo0fTsVJMKRXOVGY8bu2DOk0");
  var data = sheet.getDataRange().getValues();
  // Set Note Flag
  var setNote = false;
  // Iterates over @Mentions found and sets them in a temporal variable in lowerCase and removes extra characters
  for (var i = 0; i < mentions.length; i++) {
    var correctMention = mentions[i].toLowerCase().replace(/[^\w\s]/gi, '');
     Logger.log(correctMention);
    // Iterates over list of mails and sets them in a temporal variable in lowerCase and removes extra characters
    for (var j = 0; j < data.length; j++) {
      var correctName = data[j][0].toLowerCase().replace(/[^\w\s]/gi, '');
      Logger.log(correctMention);
        // Sends a mail if there is a match between @Mentions and Mail List.
      if (correctMention == correctName) {
        Logger.log("True");
        setNote = true;
        var subject = "You have a new mention from Mando de Control";
        MailApp.sendEmail(data[j][1], subject, editedText + "\n" + sheetURL);
      };
    };
  };
  // Set a note to current cell
  if (setNote) {
    range.setNote('Mail Sent to @Mentions on: ' + new Date());
  }
}

//TEST NOTE FOR GAPPS AND GITHUB
