/**
 * Třída pro správu a zobrazení skóre ve hře
 * Uchovává aktuální skóre a nejvyšší dosažené skóre
 */
export default class Score {
  score = 0; // Aktuální skóre
  HIGH_SCORE_KEY = "highScore"; // Klíč pro ukládání nejvyššího skóre do localStorage

  /**
   * Vytvoří novou instanci správce skóre
   * @param {CanvasRenderingContext2D} ctx - Kontext canvasu pro vykreslování
   * @param {number} scaleRatio - Poměr pro škálování
   */
  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    this.scores = []
  }

  /**
   * Aktualizuje skóre v závislosti na uplynulém čase
   * @param {number} frameTimeDelta - Čas od posledního snímku
   */
  update(frameTimeDelta) {
    this.score += frameTimeDelta * 0.01;
  }

  /**
   * Resetuje aktuální skóre na nulu
   */
  reset() {
    this.score = 0;
  }

  /**
   * Aktualizuje nejvyšší skóre v localStorage, pokud bylo překonáno
   */
  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  /**
   * Vykreslí aktuální skóre a nejvyšší skóre na canvas
   * Zobrazuje skóre v pravém horním rohu s předřazenými nulami
   */
  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = "#525250";
    const scoreX = this.canvas.width - 105 * this.scaleRatio;
    const highScoreX = scoreX - 185 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`High Score ${highScorePadded}`, highScoreX, y);
  }

  // Funkce pro uložení skóre do LocalStorage


  saveScore() {
    const score = this.score.toFixed(0)
    this.scores.push(score)
    this.scores = this.scores.sort()
    localStorage.setItem("scores", this.scores)

    console.log(this.scores)
    console.log(localStorage.getItem("scores"))
    const scoresDiv = document.getElementById("scores")
    scoresDiv.innerHTML = "";
    const count = this.scores.length < 10 ? this.scores.length : 10;
    for (let i = 0; i < count; i++) {
      const tag = document.createElement("p");
      tag.innerHTML = this.scores[this.scores.length - 1 - i];
      scoresDiv.appendChild(tag);
    }
  }

}