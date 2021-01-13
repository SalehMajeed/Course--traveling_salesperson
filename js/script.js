let cities = [];
let total_cities = 3;

let record_distance;
let best_ever;

function setup() {
	createCanvas(400, 300);
	for (let i = 0; i < total_cities; i++) {
		let v = createVector(random(width), random(height));
		cities[i] = v;
	}

	let d = cal_distance(cities);
	record_distance = d;
	best_ever = cities.slice();
}

function draw() {
	background(0);
	fill(255);

	for (let i = 0; i < cities.length; i++) {
		ellipse(cities[i].x, cities[i].y, 8, 8);
	}

	stroke(255);
	strokeWeight(2);
	noFill();
	beginShape();
	for (let i = 0; i < cities.length; i++) {
		vertex(cities[i].x, cities[i].y);
	}
    endShape();
    
    stroke(255,0,2);
	strokeWeight(4);
	noFill();
	beginShape();
	for (let i = 0; i < cities.length; i++) {
		vertex(best_ever[i].x, best_ever[i].y);
	}
	endShape();

	let i = floor(random(cities.length));
	let j = floor(random(cities.length));

	swap(cities, i, j);

	let d = cal_distance(cities);
	if (d < record_distance) {
		record_distance = d;
		best_ever = cities.slice();
		console.log(record_distance);
	}
}

function swap(a, i, j) {
	let temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}

function cal_distance(points) {
	let sum = 0;
	for (let i = 0; i < points.length - 1; i++) {
		let d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
		sum += d;
	}
	return sum;
}
