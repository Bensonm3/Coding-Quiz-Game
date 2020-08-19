// Element Selection
const quizcontainer = document.getElementById("quizcontainer");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const countdown = document.getElementById("countdown");
const start = document.getElementById("start");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const results = document.getElementById("results");
let image = document.getElementById("image");
const cantinaMusic = document.getElementById("cantinaMusic");
const wrongBuzzer = document.getElementById("wrongBuzzer");
const endBuzzer = document.getElementById("endBuzzer");
const correctBuzzer = document.getElementById("correctBuzzer");
const initialsBox = document.getElementById("initialsBox");
const submitHighScore = document.getElementById("submitHighScore");
const highScoreName = document.getElementById("highScoreName");
const addScoreBtn = document.getElementById("addScoreBtn");
const answerLight = document.getElementById("answerLight");

var questions = [
    {
      title: "What does the acronym JSON stand for?",
      choiceA: "JavaScript Orientation Navigation",
      choiceB: "JavaScript Object Notation",
      choiceC: "JavaScript Opening Nullifications",
      choiceD: "JabbaS Odious raNcor",
      answer: "B",
      starwars: "D",
      pic: "images/json.png"
    },
    {
      title: "What does the acronym HTML stand for?",
      choiceA: "Helpful Text Margin Layering",
      choiceB: "Han Takes Money from Leia",
      choiceC: "HyperText Markup Language",
      choiceD: "Heat Treated Makeup Logistics",
      answer: "C",
      starwars: "B",
      pic: "images/html.png",
    },
    {
    title: "What does the acronym CSS stand for?",
    choiceA: "Cascading Style Sheets",
    choiceB: "Computational Style Selection",
    choiceC: "Correctional System Setup",
    choiceD: "C3PO Speaks Sillily",
    answer: "A",
    starwars: "D",
    pic: "images/css.png",
    },
    {
    title: "What does API stand for in Web API?",
    choiceA: "Application Production Input",
    choiceB: "Applied Prerequisite Inspection",
    choiceC: "Advanced Podracing Intuition",
    choiceD: "Application Programming Interface",
    answer: "D",
    starwars: "C",
    pic: "images/api.png",
    },
    {
    title: "What does the acronym AJAX stand for in programming?",
    choiceA: "Asynchronous JavaScript + XML",
    choiceB: "Advanced Jetfighters Are X-wings",
    choiceC: "Allowed Javascript Actions eXpenditure",
    choiceD: "Attached Javascript allocated eXternalities",
    answer: "A",
    starwars: "B",
    pic: "images/ajax.png"
    }

  ];
// Variable definitions
const lastQuestion = questions.length - 1;
let currentQuestion = 0;
const quizTime = 75;
var timeleft = 75;
score = 0;
starWarsScore = 0;
let Timer;



// Question Render Function
function renderQuestion(){
let q = questions[currentQuestion];
image.innerHTML = "<img src="+ q.pic +">";
question.innerHTML = "<p>"+ q.title +"</p>";
choiceA.innerHTML = "<p>"+ q.choiceA +"</p>";
choiceB.innerHTML = "<p>"+ q.choiceB +"</p>";
choiceC.innerHTML = "<p>"+ q.choiceC +"</p>";
choiceD.innerHTML = "<p>"+ q.choiceD +"</p>";
}






// Start Quiz Function

start.addEventListener("click", quizStart)
function quizStart(){
    start.style.display = "none";
    renderQuestion();
    Count();
}

// Timer and question+answer display
Count = function(){
    countdown.style.display = "block";
    question.style.display = "block";
    choices.style.display = "block";
    image.style.display = "block";
    initialsBox.style.display = "none";
    answerLight.style.display = "block";
var Timer = setInterval(function(){
  countdown.innerHTML = "Time Left: " + timeleft;
  timeleft -= 1;
  if(timeleft <= -1){
    endBuzzer.play();
    scoreRender();
  }
}, 1000);
};
// Check the user input compared to the correct answer
function checkAnswer(answer){
  if(answer == questions[currentQuestion]["starwars"]){
    starWarsScore++;
    timeleft = timeleft + 5;
    answerIsWrong();
  }
  else if( answer == questions[currentQuestion]["answer"]){
      score++;
      answerIsCorrect();
  }
  // Check to see if the answer is Star Wars

  // Remaining options are incorrect
  else{
      answerIsWrong();
  }
  count = 0;
  if(currentQuestion < lastQuestion){
      currentQuestion++;
      renderQuestion();
  }
  else{
      // end the quiz and show the score
      clearInterval(countdown);
      scoreRender();
  }
// answer is right function
  function answerIsCorrect(){
    correctBuzzer.play();
    answerLight.style.backgroundColor = "green";
}

// answer is wrong function
function answerIsWrong(){
      wrongBuzzer.play();
      answerLight.style.backgroundColor = "red";
      timeleft = timeleft - 15;
}
}

// function hides the question, choices, and countdown while displaying the results.
function scoreRender(){
  answerLight.style.display = "none";
  choices.style.display = "none";
  countdown.style.display = "none";
  question.style.display = "none";
  results.style.display = "block";
  addScoreBtn.style.display = "block";
  initialsBox.style.display = "block";
  highScoreName.style.display ="block";
// checks for star wars answers, if the user selected all 5 they get a special result!
if(starWarsScore == questions.length){
  cantinaMusic.play();
  results.innerHTML = "<p> May the force be with you, because coding acronyms certainly are not.</p> <br> <p>Score: 0</p>";
  timeleft = "A";
  image.innerHTML = "<img src=images/starwars.gif>";
  question.innerHTML = 0;
  
}
// if user did not select all 5 star wars answers then they get the standard result
else{
  const questionscore = Math.round(100 * score/questions.length);
  var calculatedScore = questionscore - Math.floor((75-timeleft)/75 *10);
// makes sure the user does not get a negative score
if(calculatedScore <= 0){
  calculatedScore = calculatedScore - calculatedScore;
}
// determines the result image. green emoji is good, yellow emoji is ok, red emoji is bad
  results.innerHTML = "<p> Final Score: " + calculatedScore +"<p>";
  // stores the calculated Score in the question field so it can be retrieved for the high scores list
  question.innerHTML = calculatedScore;
  timeleft = "A";
if(calculatedScore >= 70){
  image.innerHTML = "<img src=images/greenface.png>";
}
else if (calculatedScore <= 30){
  image.innerHTML = "<img src=images/redface.png>"
}
else if(calculatedScore <= 70 && calculatedScore >= 30){
  image.innerHTML = "<img src=images/yellowface.png>"
  }
  }
}

function viewScores(){
  addScoreBtn.style.display = "none";
  highScoreName.style.display ="none";
  start.style.display ="none";
  question.innerHTML = "<p> Ranked Scores </p>";
  question.style.display = "block";
  var retrievedData = localStorage.getItem("highScores");
  var data = JSON.parse(retrievedData);
  console.log(data);
  choices.style.display ="block";
  var displayedScores = data.toString();
  console.log(displayedScores)
  choices.innerHTML = "<p>" + retrievedData +"</p>";
};
function addScore() {
  arrayScore = parseInt(question.innerHTML);
  console.log(arrayScore);
  // Parse any JSON previously stored in highScores
  var highScores = JSON.parse(localStorage.getItem("highScores"));
  if(highScores == null) highScores = [];
  var entryTitle = highScoreName.value;
  var entryText = question.innerHTML;
  var newScore = {
      Name: highScoreName.value,
      Score: arrayScore
  };
  localStorage.setItem("newScore", JSON.stringify(newScore));
  // Save allEntries back to local storage
  highScores.push(newScore);
  var sortedScores = highScores.sort(function(a, b){
    return b.Score - a.Score
    console.log(sortedScores);
  });
  localStorage.setItem("highScores", JSON.stringify(sortedScores));
  console.log(sortedScores);
  function viewScores(){}
}



// old code I'm hanging onto because I'm superstitious
// function addEntry() {
//   // Parse any JSON previously stored in allEntries
//   var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
//   if(existingEntries == null) existingEntries = [];
//   var entryTitle = document.getElementById("entryTitle").value;
//   var entryText = document.getElementById("entryText").value;
//   var entry = {
//       "title": entryTitle,
//       "text": entryText
//   };
//   localStorage.setItem("entry", JSON.stringify(entry));
//   // Save allEntries back to local storage
//   existingEntries.push(entry);
//   localStorage.setItem("allEntries", JSON.stringify(existingEntries));
// };

//   const highScores = []
//   if (localStorage.getItem("highScores") === null) {
//     const highScores = []
//   }
//   else {
//     const highScores = JSON.parse(localStorage.getItem("highScores"))
//   }
//   const maxHighScores = 10;
//   const newScore = {'name':highScoreName.value, 'score':calculatedScore};
//   localStorage.setItem('newScore', JSON.stringify(newScore));
//   highScores.push(newScore);
//   localStorage.setItem('highScores', JSON.stringify(highScores));
//   // highScores.sort((a, b) => b.score -a.score);
  
//   console.log(highScores); //replace console.log with display highscores

// }
// function displayScores(){
//   question.style.display = "block";
//   question.innerHTML = highscores;
// }

