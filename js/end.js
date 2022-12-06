const userName = document.querySelector("#userName"); // More CSS selector calling
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];//sending data to local storage and retrieving it 


finalScore.innerText = mostRecentScore; // rendered text content

userName.addEventListener("keyup", () => {
  saveScoreBtn.removeAttribute("id"); // This removes the hidden CSS element and allows the button to appear on the screen
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = { //Sets the score as the score the user received and the value of the input username
    score: mostRecentScore,
    name: userName.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores.splice(4); // This displays the highest 4 scores in local storage

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("end.html"); // This assigns the scores to the end.html file for retrieval
};
