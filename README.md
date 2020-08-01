# box-lunch

Tech Stack
- HapiJs
- Slack API


Vagrant
Our vagrant file will build an Ubuntu box running node js.  
It will install the Hapijs framework, so you can get up and running.


APP
This app hooks into the Delivery.com API and connects it to Slack for easy ordering.

- When some uses the words ["hungry", "food", "lunch", "eat"]
	-> trigger a prompt "Would you like delivery? simply use your /boxlunch command"


/invite @boxlunch
"Hello will you tell me your name!"

/boxlunch start
"Hello.  I'd love to know who I'm speaking with.  Can you tell me your First and Last name"
Charleston Malkemus
"Hi, Charleston Malkemus!"
"Can you give me your "

- /boxlunch commands							lists a series of commands
- /boxlunch set name:Charleston Malkemus, phone:2679746029, email:cgmalkemus@gmail.com
- /boxlunch search								list of restaurants
- /boxlunch search "chinese"					list of chinese restaurants
- /boxlunch search:33444 "chinese"				list of chinese restaurants near 33444
- /boxlunch deliver "name of restaurant"
- /boxlunch order "moo shu pork with brown rice" qty:2
- /boxlunch order "coke 20oz"
- /boxlunch pay cash	 						respond with order confirmation
- /boxlunch pay credit
	- BoxLunch
		House of Noodle
		2x Moo Shu Pork
		- with brown rice
		1x 20oz Coke

		Total: 20.99
		Pay: Cash

