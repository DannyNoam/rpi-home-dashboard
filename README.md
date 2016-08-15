# Home Dashboard

### Dev Setup
- Clone the repository `https://github.com/DannyNoam/rpi-home-dashboard.git && cd home-dashboard`
- To install all of the dependencies run `npm install` in the terminal.

### Bundling
To bundle all of the components and scripts into one single file you need to run `gulp` in the terminal. Once you've done this, simply open index.html in your browser of choice.

### What does it look like?
Some images here: http://imgur.com/a/b8y1s

### Prerequisites
- A CORS-enabled browser. For Chrome, I reccommend: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
- npm (Node Package Manager) installed
- gulp

### Weather
Firstly, you'll need to get the longitude and latitude of where your dashboard will be used. Go to http://en.mygeoposition.com/, get your location details and make a note of them. Next, you'll need to edit src/constants/CurrentLocation.js, and replace the placeholder text with your location details.

Next, you'll need to register with forecast.io (https://developer.forecast.io/). Simply sign-up, make a note of your API key, and enter it inside src/constants/ApiKeys.js as the value for WEATHER. That's it!

### News
Register at the excellent https://newsapi.org/ for an API key and enter it inside src/constants/ApiKeys.js. The default news is set to BBC News - if you wish to change it, have a look inside src/constants/NewsConstants.js, pick your favourite, and simply change the line inside componentDidMount in src/components/News.jsx to use your desired news source (e.g. NewsConstants.BBC -> NewsConstants.WIRED).

### Calendar
Sign up for a calendar at https://calendar.google.com/. Once you've got your calendar, you'll want to edit src/constants/Endpoints.js to contain the embeddable link to your calendar. If you're struggling, take a look at this link: https://support.google.com/calendar/answer/41207?hl=en

### GIF Stream
This works straight out of the box by pulling the NEWEST gifs from reddit.com/r/gifs. If you want to change this, change the URL gifs are pulled from inside src/constants/Endpoints.js.

### Shopping & To Do lists
For each of the shopping and todo lists, you'll need to create an empty json at http://myjson.com/ and make a note of the urls returned when you save them. Simply go to the link mentioned, type '{}', and press 'Save'. For each of the links, enter them inside src/constants/Endpoints.js for the lists.

If you wish to change the names of these lists, simply change the 'label' prop that is passed to List.jsx inside MiddleComponents.jsx. The 'type' prop is used for constructing the classname.

### Time
This should work out of the box!

### Train Times
This is the third train board at the top of the screen. You'll need to create an account at http://www.transportapi.com/. Sign up, and you should be provided with both an ID and an API Key. Again, these will need to be entered inside src/constants/ApiKeys.js.

Next, how far away do you live from the station where you want to see trains departing from? Amend this value inside src/constants/TrainConstants.js. It's defaulted to 20, which means you'll see trains departing in 20 minutes time.

You'll also (probably) want to see train departures relevant to you. Edit TRAINS_FROM and TRAINS_TO inside src/config/trainTimesConfig.js appropriately. You'll also need to edit constants/TrainConstants.js (in the same format that is present) with the relevant crs codes. You'll need to research crs codes here: http://www.railwaycodes.org.uk/crs/CRS0.shtm

### Tram Times
It's probably pretty likely you don't have trams where you live - they're really not that common. However, with TFL's new shiny unified API, you **should** be able to change the endpoint to pretty much anything (bus, tube, train etc.) that is an **arrivals** endpoint. The endpoint is located inside src/constants/Endpoints.js - simply change this to any TFL Stoppoint URL, and things should be golden. You'll also need to change the line inside componentDidMount within src/components/TramStopArrivals.jsx that passes your local bus/tram/train station.

### Tube Line Status
This should work out of the box!

### Editing Lists
To edit the shopping list, simply press 's' when focused on the page.
To edit the todo list, simply press 't' when focused on the page.
To exit both, press 'q'.

### Refresh Rates
Every feed is polled (ugh) at a specified interval. These 'refresh rates' - the interval at which a feed will be polled - are stored inside src/config/refreshRates.js.
