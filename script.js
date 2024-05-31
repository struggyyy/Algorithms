/* eslint-disable no-unused-vars */
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    document.querySelectorAll('.function-btn').forEach(button => {
        button.classList.remove('active');
    });
    const selectedButton = document.getElementById(sectionId + 'Btn');
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}


//CUBIC FUNCTION
function solveCubic() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const d = parseFloat(document.getElementById('d').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
        alert("Please enter valid numbers for all coefficients.");
        return;
    }

    const cubicEquation = `${a}x³ + ${b}x² + ${c}x + ${d} = 0`;
    document.getElementById('cubicEquation').innerText = cubicEquation;

    const results = solveCubicEquation(a, b, c, d);
    let resultString = "Solutions for x:";
    results.forEach((result, index) => {
        resultString += `<br>x${index + 1} = ${result}`;
    });

    document.getElementById('cubicResult').innerHTML = resultString;
}

function solveCubicEquation(a, b, c, d) {
    
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    const delta = q * q / 4 + p * p * p / 27;

    let roots = [];

    if (delta > 0) {
        const sqrtDelta = Math.sqrt(delta);
        const u = Math.cbrt(-q / 2 + sqrtDelta);
        const v = Math.cbrt(-q / 2 - sqrtDelta);
        roots.push((u + v) - b / (3 * a));
    } else if (delta === 0) {
        const u = Math.cbrt(-q / 2);
        roots.push(2 * u - b / (3 * a));
        roots.push(-u - b / (3 * a));
    } else {
        const r = Math.sqrt(-p * p * p / 27);
        const phi = Math.acos(-q / (2 * r));
        const s = 2 * Math.cbrt(r);
        roots.push(s * Math.cos(phi / 3) - b / (3 * a));
        roots.push(s * Math.cos((phi + 2 * Math.PI) / 3) - b / (3 * a));
        roots.push(s * Math.cos((phi + 4 * Math.PI) / 3) - b / (3 * a));
    }

    return roots.map(root => {
        if (typeof root === 'number') {
            return root.toFixed(5);
        } else {
            const realPart = root.real.toFixed(5);
            const imagPart = root.imag.toFixed(5);
            return `${realPart} ${imagPart < 0 ? '-' : '+'} ${Math.abs(imagPart)}i`;
        }
    });
}

// Initialize the first section to be visible
document.addEventListener('DOMContentLoaded', () => {
    showSection('cubic');
});


//POLYNOMIAL
function evaluatePolynomialEquation(a, b, c, d, e, f, x) {
    return a * Math.pow(x, 5) + b * Math.pow(x, 4) + c * Math.pow(x, 3) + d * Math.pow(x, 2) + e * x + f;
}

function evaluatePolynomial() {
    const a = parseFloat(document.getElementById('a5').value);
    const b = parseFloat(document.getElementById('b4').value);
    const c = parseFloat(document.getElementById('c3').value);
    const d = parseFloat(document.getElementById('d2').value);
    const e = parseFloat(document.getElementById('e1').value);
    const f = parseFloat(document.getElementById('f0').value);
    const minX = parseFloat(document.getElementById('minX').value);
    const maxX = parseFloat(document.getElementById('maxX').value);
    const step = parseFloat(document.getElementById('step').value);
    const epsilon = parseFloat(document.getElementById('epsilon').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f) ||
        isNaN(minX) || isNaN(maxX) || isNaN(step) || isNaN(epsilon)) {
        alert("Please enter valid numbers for all coefficients, min x, max x, step, and epsilon.");
        return;
    }

    if (minX >= maxX) {
        alert("Minimum x should be less than maximum x.");
        return;
    }

    const polynomialEquation = `${a}x⁵ + ${b}x⁴ + ${c}x³ + ${d}x² + ${e}x + ${f} = 0`;
    document.getElementById('polynomialEquation').innerText = polynomialEquation;

    let x = minX;
    let result = '';
    while (x <= maxX) {
        const value = evaluatePolynomialEquation(a, b, c, d, e, f, x);
        result += `P(${x.toFixed(5)}) = ${value.toFixed(5)}\n`;
        x += step;
    }

    document.getElementById('polynomialResult').innerText = result;
}


//MONTE CARLO
function estimatePi() {
    const numPoints = parseInt(document.getElementById('numPoints').value);
    if (isNaN(numPoints) || numPoints <= 0) {
        alert("Please enter a valid number of points.");
        return;
    }

    const canvas = document.getElementById('monteCarloCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2;

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2);
    ctx.stroke();

    let insideCircle = 0;
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random();
        const y = Math.random();
        const canvasX = x * radius * 2;
        const canvasY = y * radius * 2;

        if (x * x + y * y <= 1) {
            insideCircle++;
            ctx.fillStyle = 'blue';
        } else {
            ctx.fillStyle = 'red';
        }
        ctx.fillRect(canvasX, canvasY, 1, 1);
    }

    const piEstimate = (insideCircle / numPoints) * 4;
    document.getElementById('monteCarloResult').innerText = `Estimated value of π: ${piEstimate.toFixed(5)}`;
}


//SIEVE
function sieve() {
    const limit = parseInt(document.getElementById('limit').value);
    const sieveVisualization = document.getElementById('sieveVisualization');
    const primesOutput = document.getElementById('primes');

    const sieveArray = new Array(limit + 1).fill(true);

    for (let i = 2; i * i <= limit; i++) {
        if (sieveArray[i]) {
            for (let j = i * i; j <= limit; j += i) {
                sieveArray[j] = false;
            }
        }
    }

    sieveVisualization.innerHTML = '';
    for (let i = 2; i <= limit; i++) {
        const box = document.createElement('div');
        box.className = 'sieve-box';
        box.textContent = i;
        if (sieveArray[i]) {
            box.classList.add('selected');
        }
        sieveVisualization.appendChild(box);
    }

    primesOutput.textContent = 'Prime Numbers: ';
    for (let i = 2; i <= limit; i++) {
        if (sieveArray[i]) {
            primesOutput.textContent += i + ', ';
        }
    }
}


//TRAVELING SALESMAN
let places = [];

function generatePlaces() {
    const numPlaces = parseInt(document.getElementById('numPlaces').value);
    if (isNaN(numPlaces) || numPlaces <= 0) {
        alert("Please enter a valid number of places.");
        return;
    }
    places = [];
    const canvas = document.getElementById('tspCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numPlaces; i++) {
        const x = Math.floor(Math.random() * (canvas.width - 20)) + 10; // Random x within canvas
        const y = Math.floor(Math.random() * (canvas.height - 20)) + 10; // Random y within canvas
        places.push({ x, y });
    }

    // Draw places
    ctx.fillStyle = 'blue';
    places.forEach(place => {
        ctx.beginPath();
        ctx.arc(place.x, place.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function solveTSP() {
    if (places.length === 0) {
        alert("Please generate places first.");
        return;
    }

    const canvas = document.getElementById('tspCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw places
    ctx.fillStyle = 'green';
    places.forEach((place, index) => {
        ctx.beginPath();
        ctx.arc(place.x, place.y, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Draw number
        ctx.fillStyle = 'black';
        ctx.fillText(index + 1, place.x - 3, place.y - 8);
    });

    // Draw lines
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    places.forEach((place, index) => {
        const nextPlace = places[(index + 1) % places.length];
        ctx.moveTo(place.x, place.y);
        ctx.lineTo(nextPlace.x, nextPlace.y);
    });
    ctx.stroke();
}