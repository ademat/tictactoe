'use strict';

const display_elm = document.querySelector('.display');

const write_number = (event) => {
  if (display_elm.textContent.length === 1 && display_elm.textContent === '0') {
    display_elm.textContent = event.target.textContent;
  } else {
    display_elm.textContent += event.target.textContent;
  }
}

let num1 = 0;
let operator = '+';
let num2 = 0;
let sum = 0;

const clear_display = () => {
  display_elm.textContent = '0';
  num1 = 0;
  operator = '+';
  num2 = 0;
  sum = 0;
}


const save = (event) => {
  if (num1 !== 0) {
    calculate();
    num1 = sum;
    operator = save_operator();
    display_elm.textContent = '0';
  } else {
    num1 = save_number();
    operator = save_operator();
    display_elm.textContent = '0';
  }
}

const save_number = () => {
  return Number(display_elm.textContent);
}

const save_operator = () => {
  return event.target.textContent;
}

const show_result = () => {
  calculate();
  display_elm.textContent = sum;
  num1 = 0;
  sum = 0;
}

const calculate = () => {
  num2 = Number(display_elm.textContent);
  if (operator === '+') {
    sum = num1 + num2;
  } else if (operator === '-') {
    sum = num1 - num2;
  } else if (operator === '*') {
    sum = num1 * num2;
  } else {
    sum = Math.round((num1 / num2) * 1000) / 1000;
  }

}

const btn_nmb_elm = document.querySelectorAll('.btn_nmb');

for (let i = 0; i < btn_nmb_elm.length; i += 1) {
  btn_nmb_elm[i].addEventListener('click', write_number);
}

const btn_opr_elm = document.querySelectorAll('.btn_opr');

for (let i = 0; i < btn_opr_elm.length; i += 1) {
  btn_opr_elm[i].addEventListener('click', save);
}

const btn_equals_elm = document.querySelector('.btn_equals').addEventListener('click', show_result)

const btn_cls_elm = document.querySelector('.btn_cls').addEventListener('click', clear_display);