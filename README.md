Send Mail to @Mentions in a Google Sheet:
=========================================

With this google script you can write in any cell of your spreadsheet a "@Mention" and a message and a mail will be sent to the email assigned to that @Mention with the message in it.

Example:
Write in any sheet cell: Code in Django all day with @Jesus and @Everardo

The message will filter de @Names and send a mail to the specified mail in other shhet.




Here is the google sheet link for testing purposes:

https://docs.google.com/spreadsheets/d/1pThQnyanWD1ADk8OpSVen-_fYQDXqCXhI03YZpuGzEc/edit#gid=634175681




ACTUAL USE IN YOUR GOOGLE SHEET:

1. COPY THE CODE
2. IN YOUR ACTUAL SHEET SELECT TOOLS > SCRIPT EDITOR
3. PASTE THE CODE
7. CREATE A CONTACT SHEET WITH THE FOLLOWING PATTERN:

    1st column      2nd Column
    @Carlos         carlosexample@gmail.com
    @Mario          marioexample@hotmail.com
    and so on...

8. CHECK THE CONTACT SHEET URL: AND COPY THE PART BETWEEN

/spreadsheets/d/      AND        /edit#gid

9. PASTE THIS PART IN THE CODE ON SCRIPT EDITOR IN:

var sheet = SpreadsheetApp.openById("HERE!!!!!!!!!!!!!!");

10. UNCOMMENT THE FIRST SNIPPET OF CODE JUST THE FIRST TIME YOU ARE TRYING THIS CODE

11. PRESS THE PLAY BUTTON (An arror will be thrown (THATS NORMAL), thats because no cell was selected when running the code).

12. Authorize your gmail account... this mail will be used to send all the emails.

13. RE-COMMENT THE FIRST SNIPPED... THIS WILL PREVENT DUPLICATE EMAILS.

14. SAVE

11. MAKE A MENTION IN ANY CELL WITH THE FORMAT @MENTION (THIS CAN BE IN ANY SPREADSHEET YOU CREATE IN THIS DOCUMENT)... AND AN EMAIL WILL BE SENT TO THE EMAIL ASSIGNED TO THAT @MENTION IN THE CONTACT SHEET.
