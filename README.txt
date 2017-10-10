
Leams Report Writer

About:
This is a sanitized public version of an app created to assist other Investigators.  Certain pieces of information in the source code have been changed, such as names, office phone numbers, office addresses, etc.  These items will eventually be replaced with local variables or some sort of database system.  This has been, and still is, a work in progress, but it is useable in its current state.  

The 'Print Formal Leams Investigative Report Activity' currently outputs a minimally formatted and parsed summary of the entire LEAMS file.  While the information contained is accurate, even irrelevant information is printed in the report, which may be of no use to an outside party reading it. 

This app reads the 'Formal LIRA', lets the user decide what information is relevant and should go into the report, and then prints a formal report to include cover letter, cover page, and table of contents.


Security:
As this app will be parsing actual criminal reports, security in its use and development is of the utmost concern.

This app is a locally run Single Page Application that uses no HTTP calls or third party libraries.  It is run entirely offline by the user who is submitting a report that the user already had access to before using this app.  

The app is written entirely in HTML, Javascript, and CSS.  General debugging and testing is done using a modified Formal LIRA that does not have any actual information on it from any case.  This app has been also tested with real LEAMS reports.  When done using real reports, it is done on a department owned computer with no development tools installed or running.  


Use:
* Ensure everything you want in your formal report is in your LEAMS investigation file.
  * Make sure you have included the testimony of any witnesses on their 'PPT' entry.
* Write the narrative of the report that you wish to have printed into the generated formal report.
* Create a new `Leams Investigative Report Activity` and with the narrative that you wish to have printed into the generated formal report.
* Save it.
* Click `Generate report`
* Submit your report
* After approval, return to that report activity
* Click `Print Formal Leams Investigative Report Activity`
* Make sure you select `Print with **Activity Synospis** `
* LEAMS will save the file as a `.RTF`
* Open that file, click anywhere in the text of the file, and press `CTRL+A` on your keyboard to highlight all of the text.
  * The headers and footers may not highlight, this is okay.
* While it is highlighted, press `CTRL+C` to copy the text.
* Open the Report Writer Program, click on the large text box, and paste your report with `CTRL+V` or by right-clicking in the box and clicking `Paste`
* Fill out other fields as instructed to confirm what will go into the report.
* After the report is genereated, your can print it with `CTRL + P`.
* On the print-settings screen, you can also save the report as a PDF.


Limitations:
This project is being completed almost entirely in my spare time.  The hope is that the hours I have spent on this project will save other investigators many more hours in the future.  Without integration into LEAMS, any minor change created by LEAMS could break this program.  If this happens let me know, and I will fix it ASAP.  There are a few other limitations at this time

At this moment only the major local jurisdictions are supported.  If you have another jurisdiction you would like for me to add, simply contact me and I can fix it quickly.

By default only my office is supported as users.  You will eventually be able to add custom users.


Future plans:

* Add support for multiple case numbers
* Create option to add custom agent/user
* Create a card-based UI for user input
* Implement WYSIWIG type editing options for the final report
* Add ability to save reports mid-editing

