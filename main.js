// Copyright (c) 2022 Ivan Teplov

const canvas = document.querySelector("#canvas")
const context = canvas.getContext("2d")

// Scales an X coordinate from [-1; 1] to [-widthOfCanvas / 2; widthOfCanvas / 2]
const scaleX = number => number * canvas.width / 2

// Scales a Y coordinate from [-1; 1] to [-heightOfCanvas / 2; heightOfCanvas / 2]
const scaleY = number => number * canvas.height / 2

// Object with all parameters of the superellipse
const parameters = {
    get power() {
        return +document.querySelector("#power").value
    },
    get xDivisor() {
        return +document.querySelector("#xDivisor").value
    },
    get yDivisor() {
        return +document.querySelector("#yDivisor").value
    }
}

const y = (x) => parameters.yDivisor * Math.pow(
    1 - Math.pow(Math.abs(x / parameters.xDivisor), parameters.power), 1 / parameters.power
)

const draw = () => {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Save canvas context's default state
    context.save()

    // Move start of coordinates to the center of the canvas
    context.translate(canvas.width / 2, canvas.height / 2)

    // Start the path of superellipse
    context.beginPath()
    
    // Move to the left point of the superellipse
    context.moveTo(scaleX(-1 / xDivisor), 0)

    // Draw the top part of the superellipse
    for (let x = -1; x <= 1; x += 0.01) {
        context.lineTo(scaleX(x), scaleY(y(x)))
    }

    // Draw the bottom part of the superellipse
    for (let x = 1; x >= -1; x -= 0.01) {
        context.lineTo(scaleX(x), scaleY(-y(x)))
    }

    // Close the superellise's path
    context.closePath()

    // Fill the path with a color that's set in CSS
    context.fillStyle = "cornflowerblue"
    context.fill()

    // Restore canvas context's default state
    context.restore()
}

draw()

/* When the window is resized, canvas usually gets cleared.
 * That's why we need to draw the superellipse again */
window.addEventListener("resize", () => draw())

// When any of the available parameters get changed, redraw the superellipse
for (const input of document.querySelectorAll("input")) {
    input.addEventListener("input", () => {
        // Update the input's 'value' attribute in order for `attr(value)` to work in CSS
        input.setAttribute("value", input.value)
        draw()
    })
}

