# docker
To start:

`docker build -t a1-301 .`

`docker run -d --name a1-301-container -p 80:80 a1-301:latest`

`docker start a1-301-container`

To stop/remove container:

`docker stop a1-301-container`

`docker rm a1-301-container`

# heroku
`heroku login`

`heroku create --app <app-server-name>`

`heroku container:login`

`heroku container:push web --app <app-server-name>`

`heroku container:release web --app <app-server-name>`

`heroku open --app <app-server-name>`

URL: https://csc301-a1.herokuapp.com/

# Objective Statement
To make the process of production easier and more flexible by avoiding confusion of placements during any blocking changes in the script, which will be seamlessly delivered to the production team, and ultimately saving production time.

# Personas 
- Persona 1: Christopher Nolan is a creative mind who get ideas on a whim and often likes to make frequent changes to scripts, and wants the changes to be easily accessed by his actors
- Persona 2: Julie Andrews is new to the world of theatre and often forgets where she’s supposed to be on stage when she is practicing her lines by herself
- Persona 3: Judd Apatow is an extremely type A director (i.e., rigidly organized, impatient, and concerned with time management) who is strict on productivity and efficiency

# User Stories
- User Story 1: As a creative-minded director, I want to be able to edit scripts and blocking arrangements whenever I get a new idea so that I can see what ideas work best for my production
- User Story 2: As a newcomer to acting and theatre, I always have trouble remembering where I’m supposed to be on stage and I want to be better organized to impress my director so that I’m able to get potential future gigs
- User Story 3: As a high-achieving director, I want any changes to a script to be delivered immediately to my actors so that they can adequately prepare for the next rehearsal

# Acceptance Criteria
1. Easy to navigate platform so that changes can be made quickly
2. Being able to search up scripts and get the up-to-date version of the blocking (and possible other) arrangements in the script
3. Changes are made instantaneously to the script and delivered immediately to actors

# JSON files
GET JSON DATA:
For the actor and director view, we are fetching information for a given script.
Therefore, we chose to store the information such that each json represents data of one script.
Naturally, this means the json should have a script id and we know that for a given script, there is:
- the script text 
- a start and end index of the script string denoting each part of the script
- the blocking for each character in each part

To store the script text, we simply made a "script" key that maps to the script text as an integer value.

Since we have a start and end index of the script string for each part, we have decided to make the "parts" attribute store
the two indices for each part, which gives us a 2D array in the form of [[start1, end1], [start2, end2]].
Each element representing each part, and each element storing the starting and ending index.
We could have included the blocking inside the "parts" attribute too, since there is a blocking for each part, but we want
to keep each attribute clean and easy to understand by making "blocking" a separate attribute.

The "blocking" attribute therefore holds an array, just like the "parts" attribute, where each element refers to the blocking in each part.
We have noted that the actor's view requires the actor id and not the character name when fetching the blocking information and so, we have decided then to make the blocking in the form of a hashmap of actor id: stage position. The final data structure for the "blocking" attribute is therefore essentially a list of hashmaps.

Finally, in order to be able to map the actor id to the character names that is required in the director's view, we need a map of actor ids to actor names. This map is stored in the "actors" attribute. For our enhancement purposes, we have made it store the castings for each actor id too.

Extra Serialization for Enhancement Purposes
- Names of actors (i.e., castings) stored in the "actors" attribute
- Names of background sound effect/music stored in the "sound" attribute, each element representing the sound played for a part in the script

POST JSON DATA:
For the director, we are requesting to modify scripts. Since the server is a database for scripts, we needed to make sure that only essential information was being passed through with the JSON to avoid redundancy.
Therefore, we decided to only store the script number that we are modifying and the blocking information that we are modifying keeping only the actor names and their new blocking positions in the JSON file

We only need these 2 things because all of the scripts are stored on the server can be identified through the script number. On the server, the script text, parts, and actor id information is already stored so we don't need to include that in our JSON file when we send the POST request. 

For a blocking change to a single script we are storing the following in the JSON:
- the script number 
- the blocking for each character in each part

We've discussed the script number above. Now onto how the blocking for each character is stored:

By using getBlockingDetailsOnScreen, we are able to get all this information from the array that is returned by calling that function. Since each element of that array is for one part of the script, 
it becomes fairly straightforward to store the blocking information for each actor. 

The format for the blocking for each character in a part is the following:
- A hashmap mapping the character name to the blocking information (stored as an array) for that character for the script. An example of this would look like the following:

{Hamlet: [1, 6], Claudius: [3, 8]}

In this example, the value of each key is the blocking information for each character during each part of the script. So for Hamlet, 1 is where Hamlet is for the first part and 6, is where Hamlet is for the second part in the script

On the server side we can retrive this POST request and modify only the blocking information in script database. This is easily done as we have the updated blocking changes and the script number in the JSON. 
It just becomes a matter of extracting that information and using it to updated the script in the script database.
