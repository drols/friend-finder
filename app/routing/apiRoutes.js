var friendsData = require("../data/friends");


module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)

  app.get('/api/friends', function(req, res) {
		res.json(friendsData);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
        
        var userInput = req.body;
		var userResponses = userInput.scores;

		// Compute best friend match
		var name = '';
		var photo = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friendsData.length; i++) {

			// Compute differences for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friendsData[i].scores[j] - userResponses[j]);
			}

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				totalDifference = diff;
				name = friendsData[i].name;
				photo = friendsData[i].photo;
			}
		}

		// Add new user
		friendsData.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', name: name, photo: photo});
	});
};