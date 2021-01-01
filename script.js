const stars = [];
const numberOfStars = 800;

let speed = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (let i = 0; i < numberOfStars; i++) {
    stars.push(new Star());
  }
}

function draw() {
  // Reset background
  background(0);

  // Initial speed
  speed = map(mouseX, 0, width, 5, 100);

  // Translate the origin to the center of the window
  translate(width / 2, height / 2);

  // Update and show the stars on screen
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

class Star {
  constructor() {
    // We are using the -widht/height because the origin is centered (Consider the negative grid)
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);

    // Save the previous location of the start to draw the edge between them
    this.pz = this.z;
  }

  update() {
    // Move the star down on the Z axis (Push away from screen)
    this.z = this.z - speed;

    // If the star is out, reset a new position
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);

      this.z = random(width);
      this.pz = this.z;
    }
  }

  show() {
    // Re-maps a number from one range to another.
    const sx = map(this.x / this.z, 0, 1, 0, width);
    const sy = map(this.y / this.z, 0, 1, 0, height);

    // Map the ellipse size to the Z values for the size
    const randomSize = map(this.z, 0, width, 7, 0);

    // Ellipse config
    fill(255);
    noStroke();

    // Draw the ellipse
    ellipse(sx, sy, randomSize, randomSize);

    // Re-map the previous x/y positions
    const px = map(this.x / this.pz, 0, 1, 0, width);
    const py = map(this.y / this.pz, 0, 1, 0, height);

    // Re-position the previous
    this.pz = this.z;

    // Set the stroke color to white
    stroke(255);
    // Draw the connecting edge between the 2 stars
    line(px, py, sx, sy);
  }
}
