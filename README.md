Send Mails to @Mentions at "MAndo de Control".
==============================================

Send Mails to @Mentions at "MAndo de Control".

Here is the google sheet link for testing purposes:

https://docs.google.com/spreadsheets/d/1pThQnyanWD1ADk8OpSVen-_fYQDXqCXhI03YZpuGzEc/edit#gid=634175681




DEPLOYING TO GOOGLE SCRIPTS IN DRIVE:

After you have made modifications, you can deploy to google scripts in drive by typing in console:

gapps upload

Then, you can go to:

https://script.google.com/d/1EmximV8XdhTSuZ4l4XeP_772gcWoimqqqgHmUwgK_w0rurzXTNp4LtHf/edit?usp=sharing

and see the changes.




TESTING IN AN ACTUAL GOOGLE SHEET:

Select: PUBLISH > TEST AS ADD-ON > SELECT LATEST CODE VERSION > TEST



ACTUAL USE IN YOUR GOOGLE SHEET:

1. COPY THE CODE
2. IN YOUR ACTUAL SHEET SELECT TOOL > SCRIPT EDITOR
3. PASTE THE CODE
4. UNCOMMENT THE FIRST CODE SNIPPET
5. CLICK THE PLAY BUTTON (EN ERROR WILL BE THROWN, THATS NORMAL)
6. COMMENT THE CODE SNIPPET YOU JUST UNCOMMENTED
7. CREATE A CONTACT SHEET WITH THE FOLLOWING PATTERN:

    1st column      2nd Column
    @Carlos         carlosexample@gmail.com
    @Mario          marioexample@hotmail.com
    and so on...

8. CHECK THE CONTACT SHEET URL: AND COPY THE PART BETWEEN

/spreadsheets/d/      AND        /edit#gid

9. PASTE THIS PART IN THE CODE ON SCRIPT EDITOR IN:

var sheet = SpreadsheetApp.openById("HERE!!!!!!!!!!!!!!");

10. SAVE

11. MAKE A MENTION IN ANY CELL WITH THE FORMAT @MENTION ... AND AN EMAIL WILL BE SEND TO THE EMAIL ASSIGNED TO THAT @MENTION IN THE CONTACT SHEET.
