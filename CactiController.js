import Cactus from "./Cactus.js";

/**
 * Třída řídící generování a správu kaktusů ve hře
 * Zajišťuje náhodné vytváření překážek a jejich kolize s hráčem
 */
export default class CactiController {
  // Minimální interval mezi generováním kaktusů (v ms)
  CACTUS_INTERVAL_MIN = 500;
  // Maximální interval mezi generováním kaktusů (v ms)
  CACTUS_INTERVAL_MAX = 2000;

  nextCactusInterval = null; // Čas do vytvoření dalšího kaktusu
  cacti = []; // Pole aktivních kaktusů ve hře

  /**
   * Vytvoří novou instanci kontroleru kaktusů
   * @param {CanvasRenderingContext2D} ctx - Kontext canvasu pro vykreslování
   * @param {Array} cactiImages - Pole obrázků kaktusů
   * @param {number} scaleRatio - Poměr pro škálování
   * @param {number} speed - Rychlost pohybu kaktusů
   */
  constructor(ctx, cactiImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.cactiImages = cactiImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextCactusTime();
  }

  /**
   * Nastaví náhodný čas do vytvoření dalšího kaktusu
   */
  setNextCactusTime() {
    const num = this.getRandomNumber(
      this.CACTUS_INTERVAL_MIN,
      this.CACTUS_INTERVAL_MAX
    );

    this.nextCactusInterval = num;
  }

  /**
   * Generuje náhodné číslo v zadaném rozsahu
   * @param {number} min - Minimální hodnota
   * @param {number} max - Maximální hodnota
   * @returns {number} Náhodné číslo
   */
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Vytvoří nový kaktus s náhodným vzhledem
   */
  createCactus() {
    const index = this.getRandomNumber(0, this.cactiImages.length - 1);
    const cactusImage = this.cactiImages[index];
    const x = this.canvas.width * 1.5;
    const y = this.canvas.height - cactusImage.height;
    const cactus = new Cactus(
      this.ctx,
      x,
      y,
      cactusImage.width,
      cactusImage.height,
      cactusImage.image
    );

    this.cacti.push(cactus);
  }

  /**
   * Aktualizuje stav všech kaktusů
   * @param {number} gameSpeed - Aktuální rychlost hry
   * @param {number} frameTimeDelta - Čas od posledního snímku
   */
  update(gameSpeed, frameTimeDelta) {
    if (this.nextCactusInterval <= 0) {
      this.createCactus();
      this.setNextCactusTime();
    }
    this.nextCactusInterval -= frameTimeDelta;

    this.cacti.forEach((cactus) => {
      cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    this.cacti = this.cacti.filter((cactus) => cactus.x > -cactus.width);
  }

  /**
   * Vykreslí všechny aktivní kaktusy
   */
  draw() {
    this.cacti.forEach((cactus) => cactus.draw());
  }

  /**
   * Kontroluje kolizi kaktusů s daným spritem (hráčem)
   * @param {Object} sprite - Objekt hráče
   * @returns {boolean} True pokud došlo ke kolizi
   */
  collideWith(sprite) {
    return this.cacti.some((cactus) => cactus.collideWith(sprite));
  }

  /**
   * Resetuje stav kontroleru - odstraní všechny kaktusy
   */
  reset() {
    this.cacti = [];
  }
}
