"use strict";

const inputs = document.querySelectorAll('[id*="input"]');
const output = document.querySelector("#output");
const operatorsBtns = document.querySelectorAll('[id*="operator"]');
const toCountBtn = document.querySelector(".inputs-block__submit-btn");
const random2ndNumberBtn = document.querySelector(".inputs-block__random-2nd");
const clearOutputBtn = document.querySelector("#clearButton");
const outputToInput1 = document.querySelector("#moveValueButton");

let operator;

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

		switch (operator) {
			case "+":
				output.style.border = "1px solid rgba(0, 0, 0, 0.35)";
				return `${+firstNumber + +secondNumber}`;

			case "-":
				output.style.border = "1px solid rgba(0, 0, 0, 0.35)";
				return `${+firstNumber - +secondNumber}`;

			case "*":
				output.style.border = "1px solid rgba(0, 0, 0, 0.35)";
				return `${+firstNumber * +secondNumber}`;

			case "/":
				output.style.border = "1px solid rgba(0, 0, 0, 0.35)";
				return `${+firstNumber / +secondNumber}`;

			default:
				for (let btn of operatorsBtns) {
					btn.style.border = "1px solid #FF0000";
				}

				return "";
		}
	}
};

const clearAll = () => {
	output.innerHTML = "";
	inputs[0].value = "";
	inputs[1].value = "";
};

const moveRelultToFirstValue = () => {
	if (output.innerHTML === "") {
		output.style.border = "1px solid #FF0000";
	} else {
		inputs[0].value = `${output.innerHTML}`;
	}
};

toCountBtn.addEventListener("click", showResultInOutput);
clearOutputBtn.addEventListener("click", clearAll);
outputToInput1.addEventListener("click", moveRelultToFirstValue);
