class Cube {
	// intialize
	isMouseEnter = false;
	isMouseDown = false;
	isMouseMove = false;
	transforming_SCALE = 2
	previousTransform = {
		x: 0,
		y: 0,
	};
	positionInStart = {
		x: 0,
		y: 0,
	};
	// constructor
	constructor(cube) {
		this.cube = cube;
		this.#start();
	}
	// start listeners
	#start() {
		// set a default transform
		this.cube.style.transform = "rotateX(0deg) rotateY(0deg)";
		// * isMouseEnter controllers
		// set isMouseEnter TRUE when entering the cube
		this.cube.addEventListener("mouseenter", () => {
			this.isMouseEnter = true;
		});
		// set isMouseEnter FALSE when leaving the cube
		this.cube.addEventListener("mouseleave", () => {
			this.isMouseEnter = false;
		});
		// * isMouseDown controllers
		// set isMouseDown TRUE when : mouse is down while inside the cube
		// and update previousTransform
		this.cube.addEventListener("mousedown", (e) => {
			this.isMouseDown = true;
			this.positionInStart = { x: e.clientX, y: e.clientY };
		});
		// set isMouseDown et isMouseMove FALSE when mouse is up
		window.addEventListener("mouseup", () => {
			// if already false do nothing
			if (this.isMouseDown == false) return;
			this.isMouseDown = false;
			this.isMouseMove = false;
			this.previousTransform = this.#getCurrentTransform()
		});
		// * isMouseMove controllers
		// if already isMouseMove is TRUE keep update transforming
		// if not and all the conditions (isMouseEnter, isMouseDown) is true then set isMouseMove TRUE and update transforming
		window.addEventListener("mousemove", (e) => {
			if (!this.isMouseMove) {
				if (this.isMouseEnter && this.isMouseDown) {
					this.isMouseMove = true;
				}
				else { return }
			}
			let Δx = e.clientX - this.positionInStart.x;
			let Δy = e.clientY - this.positionInStart.y;
			this.#updateRotation(Δx, Δy);
		});
	}
	// update transforming function
	#updateRotation(Δx, Δy) {
		let { x, y } = this.previousTransform
		this.cube.style.transform = `
		rotateX(${y - Δy / this.transforming_SCALE}deg)
		rotateY(${x + Δx / this.transforming_SCALE}deg)`;
	}
	#getCurrentTransform() {
		let [x, y] = this.cube.style.transform
			.split(" ")
			.map((i) => Number(i.slice(i.indexOf("(") + 1, i.indexOf("deg"))));
		return { x, y }
	}
}
let cube = new Cube(document.getElementById("cube"));

// ! fix auto rotate when mouse down