/**
 * Třída reprezentující pohybující se zem/podlahu ve hře
 * Vytváří nekonečný efekt pohybu země pomocí dvou opakujících se obrázků
 */
export default class Ground {
  /**
   * Vytvoří novou instanci země
   * @param {CanvasRenderingContext2D} ctx - Kontext canvasu pro vykreslování
   * @param {number} width - Šířka země
   * @param {number} height - Výška země
   * @param {number} speed - Rychlost pohybu země
   * @param {number} scaleRatio - Poměr pro škálování
   */
  constructor(ctx, width, height, speed, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scaleRatio = scaleRatio;

    this.x = 0;
    this.y = this.canvas.height - this.height;

    this.groundImage = new Image();
    this.groundImage.src = "images/ground.png";
  }

  /**
   * Aktualizuje pozici země v závislosti na rychlosti hry
   * @param {number} gameSpeed - Aktuální rychlost hry
   * @param {number} frameTimeDelta - Čas od posledního snímku
   */
  update(gameSpeed, frameTimeDelta) {
    this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
  }

  /**
   * Vykreslí zem na canvas
   * Používá dva obrázky vedle sebe pro vytvoření plynulého nekonečného pohybu
   */
  draw() {
    this.ctx.drawImage(
      this.groundImage,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.ctx.drawImage(
      this.groundImage,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );

    if (this.x < -this.width) {
      this.x = 0;
    }
  }

  /**
   * Resetuje pozici země do výchozího stavu
   */
  reset() {
    this.x = 0;
  }
}
