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
  var mentions = editedText.match(/@\w*/g);
  var sheet = SpreadsheetApp.openById("1pThQnyanWD1ADk8OpSVen-_fYQDXqCXhI03YZpuGzEc"); //ADD MAIL LIST ID FROM SHEET URL
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < mentions.length; i++) {
    var correctMention = mentions[i].toLowerCase().replace(/[^\w\s]/gi, '');
    Logger.log(correctMention);
    for (var j = 0; j < data.length; j++) {
    var correctName = data[j][0].toLowerCase().replace(/[^\w\s]/gi, '');
    Logger.log(correctName);
      if (correctMention == correctName) {
        Logger.log(editedText);
        Logger.log('HOLA ESTE ES EL MAIL DE ' + data[j][0] + ': ' + data[j][1]);
        var subject = "You have a new mention from Mando de Control";
        MailApp.sendEmail(data[j][1], subject, editedText + "\n" + sheetURL);
      };
    };
  };
  range.setNote('Mail Sent to @Mentions on: ' + new Date());
}
