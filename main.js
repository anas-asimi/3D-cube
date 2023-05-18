class Cube {
    isMouseEnter = false
    isMouseDown = false
    isMouseMove = false
    previousPosition = {
        x: null,
        y: null,
    }
    constructor(cube) {
        this.cube = cube
        this.cube.style.transform = 'rotateX(0deg) rotateY(0deg)'
        // isMouseEnter
        this.cube.addEventListener('mouseenter', () => {
            if (this.isMouseDown) return
            console.log('mouseenter');
            this.isMouseEnter = true
        })
        this.cube.addEventListener('mouseleave', () => {
            if (this.isMouseDown) return
            console.log('mouseleave');
            this.isMouseEnter = false
        })
        // isMouseDown
        window.addEventListener('mousedown', (e) => {
            console.log('mousedown');
            this.isMouseDown = true
            let [x, y] = this.cube.style.transform.split(' ').map(i => Number(i.slice(i.indexOf('(') + 1, i.indexOf('deg'))))
            this.previousPosition = { x, y }
        })
        window.addEventListener('mouseup', () => {
            console.log('mouseup');
            this.isMouseDown = false
            this.isMouseEnter = false
        })
        // 
        window.addEventListener('mousemove', (e) => {
            if (this.isMouseEnter && this.isMouseDown) {
                let deltaX = this.previousPosition.x - e.clientX
                let deltaY = this.previousPosition.y - e.clientY
                this.#updateRotation(deltaX, deltaY)
            }
        })
    }
    #updateRotation(deltaX, deltaY) {
        // get previous x,y
        let { x, y } = this.previousPosition
        // set new ones
        this.cube.style.transform = `rotateX(${y + deltaY}deg) rotateY(${x - deltaX}deg)`
    }
}
let cube = new Cube(document.getElementById('cube'))


// ! fix auto rotate when mouse down