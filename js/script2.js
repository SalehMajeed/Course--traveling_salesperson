let vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function setup() {
	createCanvas(400, 300);
}

function draw() {
	console.log(vals);

	let largest_i = -1;
	for (let i = 0; i < vals.length - 1; i++) {
		if (vals[i] < vals[i + 1]) {
			largest_i = i;
		}
	}
	if (largest_i == -1) {
		noLoop();
		console.log('finished');
	}

	let largest_j = -1;
	for (let j = 0; j < vals.length; j++) {
		if (vals[largest_i] < vals[j]) {
			largest_j = j;
		}
	}

	swap(vals, largest_i, largest_j);

	let end_array = vals.splice(largest_i + 1);
	end_array.reverse();
	vals = vals.concat(end_array);

	background(0);
	textSize(64);
	let s = '';
	for (let i = 0; i < vals.length; i++) {
		s += vals[i];
	}
	fill(255);
	text(s, 20, height / 2);
}

function swap(a, i, j) {
	let temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}
