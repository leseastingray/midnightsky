import './general.js';

/* Create a class called MidnightSky
- Part 1 - Create and draw stationary stars
    - Initialize instance variables for all of the ui elements in the constructor
        -   this.$canvas = 
        -   this.$context = 
        -   this.$animationFrame; 
    - Initilize some other instance variables that are data related in the constructor
        this.defaults = {
            star: {
                color: 'rgba(255, 255, 255, .5)',
                width: 3,
                randomWidth: true
            },
            line: {
                color: 'rgba(255, 255, 255, .5)',
                width: 0.2
            },
            position: {
                x: 0,
                y: 0
            },
            width: window.innerWidth,
            height: window.innerHeight,
            velocity: 0.1,
            length: 100,
            distance: 120,
            radius: 150,
            stars: []
        };
        this.config = JSON.parse(JSON.stringify(this.defaults));
    - Write the method setCanvas
        -   set the width and the height of the canvas to the 
            width and the height in the config object
        -   bind the class to the method in the constructor
        -   call the method in the constructor
    - Write the method setContext
        -   set the strokeStyle, fileStyle and lineWidth properties of the context
            based on corresponding values in the config object
        -   bind the class to the method in the constructor
        -   call the method in the constructor
    - Write the method setInitialPosition
        -   set the x and y position in the config object to 
            half of the canvas width and height respectively
        -   bind the class to the method in the constructor
        -   call the method in the constructor
    - Write the method createStar
        -   make a copy of the default star characteristics
        -   add x to the star - random number relative to the canvas width
        -   add y to the star - random number relative to the canvas height
        -   add vx to the star - random velocity in the x direction
        -   add vy to the star - random velocity in the y direction
        -   add radius to the star - random size
        -   return the star
        -   bind the class to the method in the constructor
    - Write the method createStars
        -   repeatedly call the method createStar and add the new star to the
            array of stars in the config object.  The number of stars is in the
            length property of the config object.
        -   bind the class to the method in the constructor
        -   call the method in the constructor
    -   Write the method drawStar.  Pass in a star as a parameter
        -   it should draw one star
        -   bind the class to the method
    -   Write the method drawStars.  It should
        -   clear the canvas
        -   repeatedly call the method drawStar
        -   bind the class to the method
        -   call the method in the constructor
  END OF PART 1 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE STARS ON THE PAGE
- PART 2 - Animate the stars - you can do this with setInterval or an animation frame
    -   Write the method moveStar.  It should take a star as it's parameter and
        move the star based on it's x and y position as well as it's x and y velocities.
        When the star bumps into the edge of the canvas, it should reappear on the canvas
        in a reasonable place but don't worry too much about the physics!
    -   Write the method moveStars.  It should repeatedly call moveStar
    -   Write the method animateStars.  It should 
        -   clear the canvas
        -   move the stars
        -   draw the stars
    -   Setup the animation in the constructor.  It should call animateStart every 1/60th 
        of a second.
    -   NOTICE THAT I CREATE A NEW OBJECT WHEN YOU RESIZE THE PAGE.  YOU'LL WANT TO CANCEL
        THE ANIMATION WHERE I'VE WRITTEN THAT COMMENT.
  END OF PART 2 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE STARS MOVE ON THE PAGE 
  - PART 3 - Add lines between stars that are "close" to eachother and are near the mouse
    -   I've given you 2 methods highlight and drawLines that you can use.  Or you can write your own
    -   Write the method drawLines
    -   Call it in an appropriate place
    -   Write the method highlight
    -   Add a mousemove event handler to the canvas that references highlight.  drawLines
        takes the position of the mouse into account.
  END OF PART 3 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE CONSTELLATIONS ON YOUR PAGE       
*/

class MidnightSky 
{

    constructor() 
    {
        // instance variables for UI
        this.$canvas = document.querySelector('#imgCanvas');
        this.$context = this.$canvas.getContext('2d');
        this.$animationFrame;

        // data-related instance variables
        this.defaults = {
            star: {
                color: 'rgba(255, 255, 255, .5)',
                width: 3,
                randomWidth: true
            },
            line: {
                color: 'rgba(255, 255, 255, .5)',
                width: 0.2
            },
            position: {
                x: 0,
                y: 0
            },
            width: window.innerWidth,
            height: window.innerHeight,
            velocity: 0.1,
            length: 100,
            distance: 120,
            radius: 150,
            stars: []
        };
        
        // config object, created from parsed+stringified this.defaults
        this.config = JSON.parse(JSON.stringify(this.defaults));
        
        // bind methods
        this.setCanvas = this.setCanvas.bind(this);
        this.setContext = this.setContext.bind(this);
        this.setInitialPosition = this.setInitialPosition.bind(this);
        this.createStar = this.createStar.bind(this);
        this.createStars = this.createStars.bind(this);
        this.drawStar = this.drawStar.bind(this);
        this.drawStars = this.drawStars.bind(this);

        // method calls
        this.setCanvas();
        this.setContext();
        this.setInitialPosition();
        this.createStars();
        this.drawStars();
    }

    // setCanvas method
    setCanvas()
    {
        // this.config, or just config? looks like this.config
        const canvasWidth = this.config.width;
        const canvasHeight = this.config.height;

        this.$canvas.width = canvasWidth;
        this.$canvas.height = canvasHeight;
    }
    // setContext method
    setContext()
    {
        // strokeStyle
        this.$context.strokeStyle = this.config.strokeStyle;
        // fileStyle
        this.$context.fileStyle = this.config.fileStyle;
        // lineWidth
        this.$context.lineWidth = this.config.lineWidth;
    }
    // setInitialPosition method
    setInitialPosition()
    {
        this.config.x = this.$canvas.width / 2;
        this.config.y = this.$canvas.height / 2;        
    }
    // createStar
    createStar()
    {
        let star = JSON.parse(JSON.stringify(this.defaults));

        let x = (Math.random() * this.$canvas.width);
        let y = (Math.random() * this.$canvas.height);
        let vx = Math.random() * x;
        let vy = Math.random() * y;
        let radius = Math.random();

        this.config.star = {"x": x, "y": y, "vx": vx, "vy": vy, "radius": radius};
        return star;
    }
    // createStars
    createStars()
    {
        for (let i = 0; i < this.config.length; i++)
        {
            let newStar = this.createStar();
            this.config.stars += newStar;
        }
    }
    // drawStar -- this one doesn't work!
    drawStar(star)
    {
        this.$context.beginPath();
        this.$context.arc(this.config.star.x, this.config.star.y, this.config.star.vx, this.config.star.vy, this.config.star.radius);
        this.$context.fill();
    }
    // drawStars
    drawStars()
    {
        // clear canvas/context
        this.$context.clearRect(0, 0, this.$canvas.height, this.$canvas.width);

        for (let i = 0; i < this.config.stars.length; i++)
        {
            this.drawStar(this.star);
        }
    }
/*
    add once you see stars

    highlight(e) {
        this.config.position.x = e.pageX - this.$canvas.offsetLeft;
        this.config.position.y = e.pageY - this.$canvas.offsetTop;
    }
    drawLines () {
        for (let i = 0; i < this.config.length; i++) {
            for (let j = 0; j < this.config.length; j++) {
                let iStar = this.config.stars[i];
                let jStar = this.config.stars[j];
                if ((iStar.x - jStar.x) < this.config.distance &&
                    (iStar.y - jStar.y) < this.config.distance &&
                    (iStar.x - jStar.x) > - this.config.distance &&
                    (iStar.y - jStar.y) > - this.config.distance) {
                    if ((iStar.x - this.config.position.x) < this.config.radius &&
                        (iStar.y - this.config.position.y) < this.config.radius &&
                        (iStar.x - this.config.position.x) > - this.config.radius &&
                        (iStar.y - this.config.position.y) > - this.config.radius) {
                        this.$context.beginPath();
                        this.$context.moveTo(iStar.x, iStar.y);
                        this.$context.lineTo(jStar.x, jStar.y);
                        this.$context.stroke();
                        this.$context.closePath();
                    }
                }
            }
        }
    }
    */
}
let midnightsky;
window.addEventListener('load', () => midnightsky = new MidnightSky());
window.addEventListener('resize', () => {
    // cancel the animation
    midnightsky = new MidnightSky();
});
