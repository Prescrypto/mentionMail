/*
// Trigger Builder. Run only once.
 ScriptApp.newTrigger('mentionMail')
   .forSpreadsheet(SpreadsheetApp.getActive())
   .onEdit()
   .create();
*/

function mentionMail(e){
  // Set a comment on the edited cell to indicate when it was changed.
  var range = e.range;
  var editedText = range.getValue();
  var mentions = editedText.match(/@\w*/g);
  range.setNote('Last modified: ' + new Date() + mentions);
  var sheet = SpreadsheetApp.openById("1pThQnyanWD1ADk8OpSVen-_fYQDXqCXhI03YZpuGzEc");
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < mentions.length; i++) {
    var correctMention = mentions[i].toLowerCase().replace(/[^\w\s]/gi, '');
    Logger.log(correctMention);
    for (var j = 0; j < data.length; j++) {
    var correctName = data[j][0].toLowerCase().replace(/[^\w\s]/gi, '');
    Logger.log(correctName);
      if (mentions[i] == data[j][0]) {
        Logger.log(editedText);
        Logger.log('HOLA ESTE ES EL MAIL DE ' + data[j][0] + ': ' + data[j][1]);
        var subject = "You have a new mention from Mando de Control";
        MailApp.sendEmail(data[j][1], subject, editedText);
      };
    };
  };
}
