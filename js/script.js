"use strict";

let memory = [];
let operator;

const inputs = document.querySelectorAll('[id*="input"]');
const output = document.querySelector("#output");
const operatorsBtns = document.querySelectorAll('[id*="operator"]');
const toCountBtn = document.querySelector(".inputs-block__submit-btn");
const random2ndNumberBtn = document.querySelector(".inputs-block__random-2nd");
const clearOutputBtn = document.querySelector("#clearButton");
const outputToInput1 = document.querySelector("#moveValueButton");

operatorsBtns[0].addEventListener("click", () => {
	operator = " + ";
});
operatorsBtns[1].addEventListener("click", () => {
	operator = " - ";
});
operatorsBtns[2].addEventListener("click", () => {
	operator = " * ";
});
operatorsBtns[3].addEventListener("click", () => {
	operator = " / ";
});

const getValues = () => {
	let firstNumber = inputs[0].value;
	let secondNumber = inputs[1].value;
	return [firstNumber, secondNumber];
};

const getExpression = () => {
	let numbers = getValues();
	return numbers[0] + operator + numbers[1];
};

const calculate = () => {
	let expression = getExpression();

	let pos1 = expression.indexOf(" ");
	let pos2 = pos1 + 3;

	let firstNumber = expression.slice(0, pos1);
	let secondNumber = expression.slice(pos2);
	let operator = expression.charAt(pos1 + 1);

	switch (operator) {
		case "+":
			return `${+firstNumber + +secondNumber}`;

		case "-":
			return `${+firstNumber - +secondNumber}`;

		case "*":
			return `${+firstNumber * +secondNumber}`;

		case "/":
			return `${Math.floor(+firstNumber / +secondNumber)}`;

		default:
			throw "Error: operator undefined";
	}
};

const showResultInOutput = () => {
	output.innerHTML = `${calculate()}`;
};

toCountBtn.addEventListener("click", showResultInOutput);
