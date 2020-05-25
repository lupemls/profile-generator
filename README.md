# profile-generator
This program will run through a command line using node, and will prompt the user for a color, becoming the background color for the cards. A PDF file will then be generated which will contain info about a github profile, including name, location, company they work for, their avatar, and data about their repos.

Installation:
Clone the repo and run "npm i" to download all node dependencies. 

Usage:
Run "node index" to run the app and enter your github username and select a color. Once answered, the app will access github data from their api through axios and the pdf will begin generating. Open up the pdf once created and you have your generated portfolio!
