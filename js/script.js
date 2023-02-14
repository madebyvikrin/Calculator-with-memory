"use strict";

const inputs = document.querySelectorAll('[id*="input"]');
const output = document.querySelector("#output");
const operatorsBtns = document.querySelectorAll('[id*="operator"]');
const toCountBtn = document.querySelector(".inputs-block__submit-btn");
const random2ndNumberBtn = document.querySelector(".inputs-block__random-2nd");
const randomDiv = document.querySelector(".inputs-block__random-active");
const clearOutputBtn = document.querySelector("#clearButton");
const outputToInput1 = document.querySelector("#moveValueButton");
const randomInputs = document.querySelectorAll('[id*="random"]');

let operator;
let memory = [];

const memoryHeader = document.querySelector(".memory__offering");
const memoryDiv = document.querySelector(".memory__records");
const memoryClearAllBtn = document.querySelector(".memory__clear-btn");
const memoryWarning = document.querySelector(".memory__warning");

const setOperatorsBtns = () => {
	operatorsBtns[0].addEventListener("click", () => {
		for (let btn of operatorsBtns) {
			btn.style.border = "1px solid rgba(0, 0, 0, 0.5)";
		}

		operatorsBtns[0].style.border = "1px solid #00FF19";

		operator = " + ";
	});

	operatorsBtns[1].addEventListener("click", () => {
		for (let btn of operatorsBtns) {
			btn.style.border = "1px solid rgba(0, 0, 0, 0.5)";
		}

		operatorsBtns[1].style.border = "1px solid #00FF19";

		operator = " - ";
	});

	operatorsBtns[2].addEventListener("click", () => {
		for (let btn of operatorsBtns) {
			btn.style.border = "1px solid rgba(0, 0, 0, 0.5)";
		}

		operatorsBtns[2].style.border = "1px solid #00FF19";

		operator = " * ";
	});

	operatorsBtns[3].addEventListener("click", () => {
		for (let btn of operatorsBtns) {
			btn.style.border = "1px solid rgba(0, 0, 0, 0.5)";
		}

		operatorsBtns[3].style.border = "1px solid #00FF19";

		operator = " / ";
	});
};

setOperatorsBtns();

const getExpression = () => {
	const getValues = () => {
		let firstNumberStr = inputs[0].value;
		let secondNumberStr = inputs[1].value;

		if (firstNumberStr === "" && secondNumberStr === "") {
			inputs[0].style.border = "1px solid #FF0000";
			inputs[1].style.border = "1px solid #FF0000";
		} else if (firstNumberStr === "") {
			inputs[0].style.border = "1px solid #FF0000";
			inputs[1].style.border = "1px solid rgba(0, 0, 0, 0.35)";
		} else if (secondNumberStr === "") {
			inputs[0].style.border = "1px solid rgba(0, 0, 0, 0.35)";
			inputs[1].style.border = "1px solid #FF0000";
		} else {
			inputs[0].style.border = "1px solid rgba(0, 0, 0, 0.35)";
			inputs[1].style.border = "1px solid rgba(0, 0, 0, 0.35)";
			return [firstNumberStr, secondNumberStr];
		}
	};

	let numbers = getValues();

	return numbers[0] + operator + numbers[1];
};

const showResultInOutput = () => {
	output.innerHTML = `${calculate()}`;

	function calculate() {
		let expression = getExpression();

		let pos1 = expression.indexOf(" ");
		let pos2 = pos1 + 3;

		let firstNumber = expression.slice(0, pos1);
		let secondNumber = expression.slice(pos2);
		let operator = expression.charAt(pos1 + 1);

		let result = "";

		switch (operator) {
			case "+":
				output.style.border = "1px solid rgba(0, 0, 0, 0.35)";
				showMemory();
				result = `${+firstNumber + +secondNumber}`;
				addMemoryRecord(result);
				renderMemory();
				return result;

			case "-":
				output.style.border = "1px solid rgba(0, 0, 0, 0.35)";
				showMemory();
				result = `${+firstNumber - +secondNumber}`;
				addMemoryRecord(result);
				renderMemory();
				return result;

			case "*":
				output.style.border = "1px solid rgba(0, 0, 0, 0.35)";
				showMemory();
				result = `${+firstNumber * +secondNumber}`;
				addMemoryRecord(result);
				renderMemory();
				return result;

			case "/":
				output.style.border = "1px solid rgba(0, 0, 0, 0.35)";
				showMemory();
				result = `${+firstNumber / +secondNumber}`;
				addMemoryRecord(result);
				renderMemory();
				return result;

			default:
				for (let btn of operatorsBtns) {
					btn.style.border = "1px solid #FF0000";
				}

				return result;
		}
	}
};

const moveRelultToFirstValue = () => {
	if (output.innerHTML === "") {
		output.style.border = "1px solid #FF0000";
	} else {
		inputs[0].value = `${output.innerHTML}`;
	}
};

const transformRandomBtn = () => {
	randomDiv.classList.remove("inputs-block__random-active--hiden");
	random2ndNumberBtn.classList.add("inputs-block__random-2nd--hiden");
};

const showRandomNumber = () => {
	const moveRandomToInput2Btn = document.querySelector("#random-confirm-btn");

	const getRandomInteger = () => {
		let min = parseInt(randomInputs[0].value);
		let max = parseInt(randomInputs[1].value);
		let rand;

		if (!min && !max) {
			randomInputs[0].style.border = "1px solid #FF0000";
			randomInputs[1].style.border = "1px solid #FF0000";
		} else if (!min) {
			randomInputs[0].style.border = "1px solid #FF0000";
			randomInputs[1].style.border = "1px solid rgba(0, 0, 0, 0.35)";
		} else if (!max) {
			randomInputs[0].style.border = "1px solid rgba(0, 0, 0, 0.35)";
			randomInputs[1].style.border = "1px solid #FF0000";
		} else {
			randomInputs[0].style.border = "1px solid rgba(0, 0, 0, 0.35)";
			randomInputs[1].style.border = "1px solid rgba(0, 0, 0, 0.35)";

			rand = min + Math.random() * (max + 1 - min);
		}

		return Math.floor(rand);
	};

	moveRandomToInput2Btn.addEventListener("click", () => {
		inputs[1].value = `${getRandomInteger()}`;
	});
};

function initRandom() {
	transformRandomBtn();
	showRandomNumber();
}

const clearAll = () => {
	output.innerHTML = "";
	output.style.border = "1px solid rgba(0, 0, 0, 0.35";

	for (let input of inputs) {
		input.value = "";
		input.style.border = "1px solid rgba(0, 0, 0, 0.35)";
	}

	for (let randInput of randomInputs) {
		randInput.value = "";
		randInput.style.border = "1px solid rgba(0, 0, 0, 0.35)";
	}

	randomDiv.classList.add("inputs-block__random-active--hiden");
	random2ndNumberBtn.classList.remove("inputs-block__random-2nd--hiden");
};

function addMemoryRecord(result) {
	const record = {
		result,
		deleted: false,
		id: `${Math.random()}`,
	};

	memory.push(record);
}

function deleteMemoryRecord(id) {
	memory.forEach((record) => {
		if (id === record.id) {
			record.deleted = true;
		}
	});
}

function renderMemory() {
	let memoryHtml = "";

	memory.forEach((record) => {
		if (record.deleted) {
			return;
		} else {
			memoryHtml += `
			<div class="memory__record">
				<div class="memory__data">
					<p class="memory__index">err.</p>
					<p class="memory__value">err</p>
				</div>
				<button class="memory__delete-btn" id="memoryDeleteBtn">
					<img
						src="/Calculator-with-memory/src/img/icons/delete.svg"
						alt="x"
					/>
				</button>
			</div>
		`;
		}
	});

	memoryDiv.innerHTML = memoryHtml;
}

function showMemory() {
	memoryHeader.classList.remove("memory__offering--hiden");
	memoryClearAllBtn.classList.remove("memory__clear-btn--hiden");
}

toCountBtn.addEventListener("click", showResultInOutput);
clearOutputBtn.addEventListener("click", clearAll);
outputToInput1.addEventListener("click", moveRelultToFirstValue);
random2ndNumberBtn.addEventListener("click", initRandom);
