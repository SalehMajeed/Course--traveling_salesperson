let cities = [];
let total_cities = 7;

let order = [];
let total_permutations;
let count = 0;

let record_distance;
let best_ever;

function setup() {
	createCanvas(400, 600);
	for (let i = 0; i < total_cities; i++) {
		let v = createVector(random(width), random(height / 2));
		cities[i] = v;
		order[i] = i;
	}

	let d = cal_distance(cities, order);
	record_distance = d;
	best_ever = order.slice();

	total_permutations = factorial(total_cities);
	console.log(total_permutations);
}

function draw() {
	background(0);
	// frameRate(5);
	fill(255);

	for (let i = 0; i < cities.length; i++) {
		ellipse(cities[i].x, cities[i].y, 8, 8);
	}

	stroke(255, 0, 255);
	strokeWeight(4);
	noFill();
	beginShape();
	for (let i = 0; i < order.length; i++) {
		let n = best_ever[i];
		vertex(cities[n].x, cities[n].y);
	}
	endShape();

	translate(0, height / 2);
	stroke(255);
	strokeWeight(1);
	noFill();
	beginShape();
	for (let i = 0; i < order.length; i++) {
		let n = order[i];
		vertex(cities[n].x, cities[n].y);
	}
	endShape();

	let d = cal_distance(cities, order);
	if (d < record_distance) {
		record_distance = d;
		best_ever = order.slice();
	}

	textSize(32);
	// let s = '';
	// for (let i = 0; i < order.length; i++) {
	// 	s += order[i];
	// }
	fill(255);
	// text(s, 20, height / 2 - 50);

	let percent = 100 * (count / total_permutations);
	text(nf(percent, 0, 2) + '% completed', 20, height / 2 - 50);

	next_order();
}

function swap(a, i, j) {
	let temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}

function cal_distance(points, order) {
	let sum = 0;
	for (let i = 0; i < order.length - 1; i++) {
		let city_a_index = order[i];
		let city_a = points[city_a_index];

		let city_b_index = order[i + 1];
		let city_b = points[city_b_index];

		let d = dist(city_a.x, city_a.y, city_b.x, city_b.y);
		sum += d;
	}
	return sum;
}

function next_order() {
	count++;
	let largest_i = -1;
	for (let i = 0; i < order.length - 1; i++) {
		if (order[i] < order[i + 1]) {
			largest_i = i;
		}
	}
	if (largest_i == -1) {
		noLoop();
	}

	let largest_j = -1;
	for (let j = 0; j < order.length; j++) {
		if (order[largest_i] < order[j]) {
			largest_j = j;
		}
	}

	swap(order, largest_i, largest_j);

	let end_array = order.splice(largest_i + 1);
	end_array.reverse();
	order = order.concat(end_array);
}

function factorial(n) {
	if (n == 1) {
		return 1;
	} else {
		return n * factorial(n - 1);
	}
}
