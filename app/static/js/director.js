/* director.js - Theatre blocking JavaScript */
"use strict";
console.log('director.js') // log to the JavaScript console.

/* UI functions below - DO NOT change them */

// Function to remove all blocking parts from current window
function removeAllBlocks() {
	blocks.innerHTML = '';
	setScriptNumber('');
}

/* This function returns a JavaScript array with the information about blocking displayed
in the browser window.*/
function getBlockingDetailsOnScreen() {

	// this array will hold
	const allBlocks = []

	// go through all of the script parts and scrape the blocking informatio on the screen
	for (let i = 0; i < blocks.children.length; i++) {
		const block = {};  const blockElement = blocks.children[i]
		block.part = i + 1;
		block.text = blockElement.children[1].textContent;
		block.actors = []
		const actors = blockElement.children[2].children
		for (let j = 0; j < actors.length; j++) {
			block.actors.push([actors[j].textContent, actors[j].children[0].value])
		}
		allBlocks.push(block)
	}

	// Look in the JavaScript console to see the result of calling this function
	return allBlocks;
}

function setScriptNumber(num) {
	const scriptNum = document.querySelector('#scriptNum')
	scriptNum.innerHTML = `${num}`
}

function getScriptNumber(num) {
	return document.querySelector('#scriptNum').innerHTML
}

/* Function to add the blocking parts to browser window */
function addBlockToScreen(scriptText, startChar, endChar, actors, positions) {

	const scriptPartText = scriptText.slice(startChar, endChar + 1);
	const html = `<h4>Part ${blocks.children.length + 1}</h4>
      <p><em>"${scriptPartText}"</em></p>
      <div class='actors'></div>`

    const block = document.createElement('div')
    block.className = 'col-lg-12'
    block.innerHTML = html;
    for (let j = 0; j < actors.length; j++) {
    	const actorHtml = `${actors[j]}<input id='scriptText' style="width: 40px;" type="text" name="" value="${positions[j]}">`
    	const actorContainer = document.createElement('p');
    	actorContainer.innerHTML = actorHtml;
    	block.children[2].appendChild(actorContainer)
	}

    console.log(block)
    blocks.appendChild(block)

}

/* UI functions above */


// Adding example script blocking
// (the blocks should be removed from the screen when getting a script from the server)
addBlockToScreen(`That's it Claudius, I'm leaving!Fine! Oh..he left already..`, 0, 31, ['Hamlet', 'Claudius'], [5, 2])
addBlockToScreen(`That's it Claudius, I'm leaving!Fine! Oh..he left already..`, 32, 58, ['Hamlet', 'Claudius'], ['', 3])
setScriptNumber('example')
getBlockingDetailsOnScreen();

//////////////
// The two functions below should make calls to the server
// You will have to edit these functions.

function getBlocking() {

  removeAllBlocks();
	const scriptNumber = scriptNumText.value;
	setScriptNumber(scriptNumber)
	console.log(`Get blocking for script number ${scriptNumber}`)

	console.log('Getting ')
	/// Make a GET call (using fetch()) to get your script and blocking info from the server,
	// and use the functions above to add the elements to the browser window.
	// (similar to actor.js)

	const url = '/script/' + scriptNumber;

	console.log(url)

	//fetch call to server

	return fetch(url)
		.then((res) => {
			return res.json()
		})
		.then((jsonResult) => {
			console.log('Result:', jsonResult)
			const scriptText = jsonResult['script']
			const parts = jsonResult['parts']
			const blocking = jsonResult['blocking']

			for (let i = 0; i < parts.length; i++){
				const positions = blocking[i]
				const startChar = parts[i][0]
				const endChar = parts[i][1]
				const actor_ids = []
				const scene_pos = []
				for (const [key, value] of Object.entries(positions)){
					actor_ids.push(key)
					scene_pos.push(value)
				}
				addBlockToScreen(scriptText, startChar, endChar, actor_ids, scene_pos)
			}
		}).catch((error)=> {
			console.log("An error occurred with fetch:", error)
		})

}

function changeScript() {
	// You can make a POST call with all of the
	// blocking data to save it on the server

	const url = '/script';

    // The data we are going to send in our request
    // It is a Javascript Object that will be converted to JSON

		//get blocking information currently on the screen
		const screen_info = []
		screen_info = getBlockingDetailsOnScreen();

    let data = {
    	scriptNum: getScriptNumber()
    }
		for(let i = 0; i <screen_info.length; i++){
			data["Line " + (i+1)] = screen_info[i]
		}

    // Create the request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request
    fetch(request)
    	.then((res) => {
    		//// Do not write any code here
    		// Logs success if server accepted the request
    		//   You should still check to make sure the blocking was saved properly
    		//   to the text files on the server.
    		console.log('Success')
	        return res.json()
	        ////
	    })
	    .then((jsonResult) => {
	    	// Although this is a post request, sometimes you might return JSON as well
	        console.log('Result:', jsonResult)

	    }).catch((error) => {
	    	// if an error occured it will be logged to the JavaScript console here.
	        console.log("An error occured with fetch:", error)
	    })
}
