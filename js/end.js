const userName = document.querySelector("#userName");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


finalScore.innerText = mostRecentScore;

userName.addEventListener("keyup", () => {
  saveScoreBtn.removeAttribute("id");
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: userName.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores.splice(3);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("end.html");
};
