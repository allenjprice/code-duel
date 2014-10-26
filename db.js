var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "scoreboard"
});

dbConnection.connect();

// exports.findScores = function(callback){

//   var query = 'SELECT Scores.id, Scores.winner, Scores.opponent, Scores.score, Prompts.prompt, Prompts.promptpath\n' +
//               'FROM Prompts LEFT OUTER JOIN Scores ON Prompts.id = Scores.promptid\n' +
//               'ORDER BY Scores.score DESC;';
//   dbConnection.query(query, function(err, results){
//     callback(err, results);
//   });
// };

// exports.findPromt = function(promptname, callback){
//   var query = 'SELECT * FROM Prompts WHERE prompt = ? LIMIT 1;';
//   dbConnection.query(query, promptname, function(err, results){
//     calback(err, results);
//   });
// };

// exports.findPromtById = function(promptId, callback){
//   var query = 'SELECT * FROM Prompts WHERE prompt.id = ? LIMIT 1;';
//   dbConnection.query(query, promptId, function(err, results){
//     calback(err, results);
//   })

// exports.savePrompt = function(promptname, promptpath, testpath, callback){
//   var query = 'INSERT INTO Prompts(prompt, promptpath, testpath) VALUES (?, ?);';
//   dbConnection.query(query, [promptname, promptpath, testpath], function(err, results){
//     calback(err, results);
//   });
// // };
// exports.noDuplicates = function(results, callback){
//   var query = 'IF NOT EXISTS (SELECT TOP 1 session FROM Scores WHERE session = ?';
//   dbConnection.query(query, [results.winner, results.opponent, results.score, results.promptName, results.submittedcode], function(err, results){
//     callback(err, results);
//   });

// }

exports.findUsername = function() {
  var query = 'SELECT socketid FROM users WHERE username =?;';
  dbConnection.query(query, [], function(err, results){
    callback(err, results);
  });
};

exports.addScoreToUsersTable = function(data, callback){
  var query = 'INSERT INTO users(username, socketid) VALUES (?,?);';
  dbConnection.query(query, [data.player, data.id ], function(err, results){
    callback(err, results);
  });
}


exports.saveScore = function(results){
  var query = 'INSERT INTO Scores(winner, loser, score, loserscore, prompt) VALUES (?, ?, ?, ?, ?);';
  dbConnection.query(query, [results.winner, results.loser, results.score, results.loserScore, results.prompt], function(err, results){
    console.log(err, results);
  });
};

exports.checkIfUserExists = function(username, callback){
  var query = 'SELECT username FROM users WHERE username = ?;'
  dbConnection.query(query, username, function(err, results){
    if(results.length > 0) {
      callback(true);
      console.log(results);
    } else {
      callback(false);
    }
  });
}

exports.addUser = function(username, socketid, password, callback){
  console.log('adding user as well')
  var query = 'INSERT INTO users (username, socketid, password) VALUES (?,?,?);'
  dbConnection.query(query, [username, socketid, password], function(err,results){
    console.log(err, " results: ")
  })
}

exports.updateUser = function(username, socketid){
  console.log("sockaetid:======", username, socketid)
  var query = 'UPDATE users SET socketid = ? WHERE username = ?;'
  dbConnection.query(query, [socketid, username], function(err,results){
    console.log(err, " results: " );
  })
}

exports.getAllScores = function(callback){
  var query = 'SELECT * from scores ORDER BY score;'

  dbConnection.query(query, function(err,results){
    console.log(err, "getting high scores")

    callback(err, results);  

  })
}