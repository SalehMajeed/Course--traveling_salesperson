let cities = [];
let total_cities = 5;

let pop_size = 300;
let population = [];
let fitness = [];

let record_distance = Infinity;
let best_ever;
let current_best;

let status_p;

function setup() {
	createCanvas(400, 600);
	let order = [];
	for (let i = 0; i < total_cities; i++) {
		let v = createVector(random(width), random(height / 2));
		cities[i] = v;
		order[i] = i;
	}

	for (let i = 0; i < pop_size; i++) {
		population[i] = shuffle(order);
	}

	status_p = createP('').style('font-size', '32pt');
}

function draw() {
	background(0);
	// frameRate(5);

	calculate_fitness();
	normalize_fitness();
	next_generation();

	stroke(255);
	strokeWeight(4);
	noFill();
	beginShape();

	for (let i = 0; i < best_ever.length; i++) {
		let n = best_ever[i];
		vertex(cities[n].x, cities[n].y);
		ellipse(cities[i].x, cities[i].y, 16, 16);
	}
	endShape();

	translate(0, height / 2);
	stroke(255);
	strokeWeight(4);
	noFill();
	beginShape();
	for (let i = 0; i < current_best.length; i++) {
		let n = current_best[i];
		vertex(cities[n].x, cities[n].y);
		ellipse(cities[n].x, cities[n].y, 16, 16);
	}
	endShape();
}

function swap(a, i, j) {
	[a[i], a[j]] = [a[j], a[i]];
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

// function shuffle(a, num) {
// 	for (let i = 0; i < num; i++) {
// 		let index_a = floor(random(a.length));
// 		let index_b = floor(random(b.length));
// 		swap(a, index_a, index_b);
// 	}
// }

function calculate_fitness() {
	let current_record = Infinity;
	for (let i = 0; i < population.length; i++) {
		let d = cal_distance(cities, population[i]);
		if (d < record_distance) {
			record_distance = d;
			best_ever = population[i];
		}
		if (d < current_record) {
			current_record = d;
			current_best = population[i];
		}

		fitness[i] = 1 / (pow(d, 8) + 1);
	}
}

function normalize_fitness() {
	let sum = 0;
	for (let i = 0; i < fitness.length; i++) {
		sum += fitness[i];
	}

	for (let i = 0; i < fitness.length; i++) {
		fitness[i] = fitness[i] / sum;
	}
}

function next_generation() {
	let new_population = [];
	for (let i = 0; i < population.length; i++) {
		let order_a = pick_one(population, fitness);
		let order_b = pick_one(population, fitness);
		let order = cross_over(order_a, order_b);
		mutate(order, 0.01);
		new_population[i] = order;
	}
	population = new_population;
}

function pick_one(list, prob) {
	let index = 0;
	let r = random(1);

	while (r > 0) {
		r = r - prob[index];
		index++;
	}
	index--;
	return list[index].slice();
}

function cross_over(order_a, order_b) {
	let start = floor(random(order_a.length));
	let end = floor(random(start + 1, order_a.length));
	let new_order = order_a.slice(start, end);

	for (let i = 0; i < order_b.length; i++) {
		let city = order_b[i];
		if (!new_order.includes(city)) {
			new_order.push(city);
		}
	}
	return new_order;
}

function mutate(order, mutation_rate) {
	for (let i = 0; i < total_cities; i++) {
		if (random(1) < mutation_rate) {
			let index_a = floor(random(order.length));
			let index_b = (index_a + 1) % total_cities;
			swap(order, index_a, index_b);
		}
	}
}
