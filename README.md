# ClimateCloset

## Quick summary

This app better equips users with the knowledge for what to wear given the weather, decreasing concern and overthinking, better health and happiness.

## Inspiration

A combination of my love for fashion and moving to an entirely new environment (college) led me to this app idea. Over the course of my first few weeks at UC Riverside, the weather was (to me) abnormally hot compared to what I'm used to up north in the Bay Area. This meant my long baggy pants and layered top outfits couldn't be worn (unless I start a rainstorm). I wanted an app that could keep track of my new outfits as I experiment with less clothing while keeping track of the weather. My target audience for this app is people moving to new locations and are seeking out a method of journaling their outfits while keeping track of the weather in a simple manner.

## What it does

My app allows the user to import pictures from their photos library into the app and add a few details to it (outfit name, personal thoughts on the outfit itself, temperature range worn at, thoughts on how hot/cold/just right they felt when wearing it, a rating out of 5 stars). This goes into "their closet" where they can browse all of their outfits and ratings.

Another feature is the search feature where the user can input today's low and high temperature and do a search for outfits that are in that range. I calculated this by finding the average of temperatures that are in the user's closet and if that average is within the range of the input, then they are filtered and shown to the user. This acts as a outfit suggester in the morning when the user is getting ready for the day.

## How I built it

I built this using react-native, js, and vscode.

## Challenges I ran into

My goal was to integrate a camera system into this, so the user can open the app and take a picture of their outfit. This can be compared to Snapchat where the user can take a "snap" and do something with it. I unfortunately wasted about 5 hours attempting to do this and was unsuccessful. I ran into a constant issue of camera permission access. At about the 5 hour mark I decided to see if importing a picture from the photos library would be easier which ended up working. This was a feature the app revolved around, so I was worried that if I didn't get a similar feature to a camera working I would be completely stuck.

Another issue I ran into was working with async storage. This was the storage system that stores data locally on the user's device. This allows the user to exit out of the app or turn their phone off and still have access to their data within the app (their outfits in their closet).

My laptop's SSD crashed the day before the Hackathon started, so I had to use a friend's laptop for this. It ended up being a stroke of luck because I designed the app for iOS and my friend's laptop was a Mac and that let me run Xcode to create an iOS simulator to test my app.

## Accomplishments that I'm proud of

I'm really proud of the UI I created. It looks really simple, but this was the first time I ever worked with react-native and created a mobile app. I'm also really proud of completing the data storage system so the outfit additions aren't temporary.

## What I learned

I learned a lot how to use react-native, data storage, what dependencies are, and how to make a mobile iOS app!

## What's next for ClimateCloset

I have a TON of ideas for this and hope to implement it in the future.

I want to add a "streak" system similar to a Snap streak or BeReal streak where the user can see a number go up everyday when they "click" a new outfit into their closet. I also hope to add features where their outfit picture can include their location, date, and a variable temperature range throughout the day (since the temperature isn't constantly the average low and high the whole day).

I also want to somehow grab the user's location and the weather for their respective location from online (somehow) and display that on the app. This will also remove the requirement of the user manually inputting two things: 1. Searching for an outfit based on temperature range, they can be instantly greeted when they open the app with suggested outfits for the day and 2. manually inputting the temperature range for each outfit.

Another feature I'd want to add is a social media aspect where the user can view a sort of Pinterest Board of other users who decide to make their outfits/closet public. I would personally really enjoy this feature because I can see what my friends are wearing and find outfit inspiration from other people online. With this, I'd also want to add a tag feature where users can "tag" their outfits with fashion styles (streetwear, business, etc.)

I definitely want to work more on this app and I hope to polish it enough to publish in the future.