export class Player {
  x: number;
  y: number;
  radius: number;
  groundY: number;
  velocityY: number;
  gravity: number;
  jumpStrength: number;
  isJumping: boolean;

  constructor(x: number, groundY: number) {
    this.x = x;
    this.y = groundY;
    this.radius = 20;
    this.groundY = groundY;

    this.velocityY = 0;
    this.gravity = 0.5;
    this.jumpStrength = -10;
    this.isJumping = false;
  }

  update(): void {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.velocityY = 0;
      this.isJumping = false;
    }
  }

  jump(): void {
    if (this.y >= this.groundY) {
      this.velocityY = this.jumpStrength;
      this.isJumping = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y - this.radius, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Game {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  groundY: number;
  player: Player;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.groundY = height - 100;

    this.player = new Player(60, this.groundY);
  }

  update(): void {
    this.player.update();
  }

  drawBackground(): void {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw ground
    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(0, this.groundY, this.width, 100);
  }

  draw(): void {
    this.drawBackground();
    this.player.draw(this.ctx);
  }

  jump(): void {
    this.player.jump();
  }
}
