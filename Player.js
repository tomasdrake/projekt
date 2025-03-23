/**
 * Třída reprezentující hráče (dinosaura) ve hře
 * Zajišťuje pohyb, animace a interakci s uživatelským vstupem
 */
export default class Player {
  // Časovač pro animaci chůze (v milisekundách)
  WALK_ANIMATION_TIMER = 200;
  walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  dinoRunImages = []; // Pole obrázků pro animaci běhu

  // Stav skoku
  jumpPressed = false; // Indikuje, zda je stisknuto tlačítko pro skok
  jumpInProgress = false; // Indikuje probíhající skok
  falling = false; // Indikuje pád (sestupnou fázi skoku)
  JUMP_SPEED = 0.6; // Rychlost skoku
  GRAVITY = 0.4; // Gravitační síla působící na hráče

  /**
   * Vytvoří novou instanci hráče
   * @param {CanvasRenderingContext2D} ctx - Kontext canvasu pro vykreslování
   * @param {number} width - Šířka hráče
   * @param {number} height - Výška hráče
   * @param {number} minJumpHeight - Minimální výška skoku
   * @param {number} maxJumpHeight - Maximální výška skoku
   * @param {number} scaleRatio - Poměr pro škálování
   */
  constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;

    this.x = 70  * scaleRatio;
    this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
    this.yStandingPosition = this.y;

    this.standingStillImage = new Image();
    this.standingStillImage.src = "images/standing_still.png";
    this.image = this.standingStillImage;

    const dinoRunImage1 = new Image();
    dinoRunImage1.src = "images/dino_run1.png";

    const dinoRunImage2 = new Image();
    dinoRunImage2.src = "images/dino_run2.png";

    this.dinoRunImages.push(dinoRunImage1);
    this.dinoRunImages.push(dinoRunImage2);

    //keyboard
    window.removeEventListener("keydown", this.keydown);
    window.removeEventListener("keyup", this.keyup);

    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);

    //touch
    window.removeEventListener("touchstart", this.touchstart);
    window.removeEventListener("touchend", this.touchend);

    window.addEventListener("touchstart", this.touchstart);
    window.addEventListener("touchend", this.touchend);
  }

  /**
   * Zpracování doteku obrazovky - začátek skoku
   */
  touchstart = () => {
    this.jumpPressed = true;
  };

  /**
   * Zpracování konce doteku obrazovky
   */
  touchend = () => {
    this.jumpPressed = false;
  };

  /**
   * Zpracování stisku klávesy (mezerník pro skok)
   */
  keydown = (event) => {
    if (event.code === "Space") {
      this.jumpPressed = true;
    }
  };

  /**
   * Zpracování uvolnění klávesy
   */
  keyup = (event) => {
    if (event.code === "Space") {
      this.jumpPressed = false;
    }
  };

  /**
   * Aktualizuje stav hráče v každém snímku
   * @param {number} gameSpeed - Aktuální rychlost hry
   * @param {number} frameTimeDelta - Čas od posledního snímku
   */
  update(gameSpeed, frameTimeDelta) {
    this.run(gameSpeed, frameTimeDelta);

    if (this.jumpInProgress) {
      this.image = this.standingStillImage;
    }

    this.jump(frameTimeDelta);
  }

  /**
   * Řídí mechaniku skoku včetně výšky a pádu
   * @param {number} frameTimeDelta - Čas od posledního snímku
   */
  jump(frameTimeDelta) {
    if (this.jumpPressed) {
      this.jumpInProgress = true;
    }

    if (this.jumpInProgress && !this.falling) {
      if (
        this.y > this.canvas.height - this.minJumpHeight ||
        (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)
      ) {
        this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
      } else {
        this.falling = true;
      }
    } else {
      if (this.y < this.yStandingPosition) {
        this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
        if (this.y + this.height > this.canvas.height) {
          this.y = this.yStandingPosition;
        }
      } else {
        this.falling = false;
        this.jumpInProgress = false;
      }
    }
  }

  /**
   * Aktualizuje animaci běhu
   * @param {number} gameSpeed - Aktuální rychlost hry
   * @param {number} frameTimeDelta - Čas od posledního snímku
   */
  run(gameSpeed, frameTimeDelta) {
    if (this.walkAnimationTimer <= 0) {
      if (this.image === this.dinoRunImages[0]) {
        this.image = this.dinoRunImages[1];
      } else {
        this.image = this.dinoRunImages[0];
      }
      this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    }
    this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
  }

  /**
   * Vykreslí hráče na canvas
   */
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
