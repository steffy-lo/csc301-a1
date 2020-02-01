The enhancements we chose to implement includes
- An added visual representation for blocking for the actor's view. This makes it easier for actors to visualize where they should be on stage.
- A new user group: a production manager who is responsible for managing the castings and sound for the production

In the manager view, the manager will be able to:
- view the castings for each script, given the script id and clicking on the "castings" button
- view the chosen music/sound on stage for each part given the script id
- make changes to the castings and/or music/sound by modifying the text field and clicking "update"

All the changes that the production manager has made will also be reflected in the director's view.

To store the castings and sound, we've added a casts.txt in the root folder and a sound_data folder that is similar in
structure to the script_data folder.

We have chosen to implement these enhancements because they seem to go well with the objective statement of this app.
In particular, the visual representation of the blocking helps with new actors to get used to the blocking positions
more quickly and is a meaningful addition to the basic requirements of this app. The manager view helps with the coordination of the production manager and the director, avoiding
any confusion that may arise regarding any changes to the cast or sound. Additionally, it effectively improves the efficiency of production as these changes can be made instantaneously.
Our choice of enhancements also relates to the course material since we are required to serialize the json 
for the sound and casting data, similar to what we did for the blocking.
