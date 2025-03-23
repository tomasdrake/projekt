/**
 * Třída reprezentující překážku (kaktus) ve hře
 * Zajišťuje pohyb, vykreslování a detekci kolizí kaktusu
 */
export default class Cactus {
  /**
   * Vytvoří novou instanci kaktusu
   * @param {CanvasRenderingContext2D} ctx - Kontext canvasu pro vykreslování
   * @param {number} x - Počáteční X pozice kaktusu
   * @param {number} y - Počáteční Y pozice kaktusu
   * @param {number} width - Šířka kaktusu
   * @param {number} height - Výška kaktusu
   * @param {Image} image - Obrázek kaktusu
   */
  constructor(ctx, x, y, width, height, image) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  /**
   * Aktualizuje pozici kaktusu v závislosti na rychlosti hry
   * @param {number} speed - Základní rychlost pohybu
   * @param {number} gameSpeed - Aktuální rychlost hry
   * @param {number} frameTimeDelta - Čas od posledního snímku
   * @param {number} scaleRatio - Poměr pro škálování
   */
  update(speed, gameSpeed, frameTimeDelta, scaleRatio) {
    this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
  }

  /**
   * Vykreslí kaktus na canvas
   */
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Kontroluje kolizi kaktusu s daným spritem (hráčem)
   * Používá zmenšený hitbox pro přesnější detekci kolizí
   * @param {Object} sprite - Objekt hráče
   * @returns {boolean} True pokud došlo ke kolizi
   */
  collideWith(sprite) {
    const adjustBy = 1.4;
    if (
      sprite.x < this.x + this.width / adjustBy &&
      sprite.x + sprite.width / adjustBy > this.x &&
      sprite.y < this.y + this.height / adjustBy &&
      sprite.height + sprite.y / adjustBy > this.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
