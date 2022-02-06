let a = ''; //первое число
let b = ''; // второе число
let sign = ''; // знак
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const action = ['-', '+', 'X', '/', '%', '+/-', '<']


window.onload = function () {
    const out = document.querySelector('.screen-big-font');
    const outsmall = document.querySelector('.screen-small-font');
    const expr_half = document.querySelector('.expression-half').textContent
    const expr_square = document.querySelector('.expression-square').textContent
    const expr_root = document.querySelector('.expression-root').textContent

    // очищаем все
    function clearAll() {
        a = ''; //первое число
        b = ''; // второе число
        sign = ''; // знак
        finish = false;
        out.textContent = 0;
        outsmall.textContent = 0;
    }

    // очищаем число по одной цифре
    function clearOne(a, b, sign, finish) {
        // переводим первое и второе число в строку
        a = a.toString()
        b = b.toString()

        // очищаем первое число
        if (!a == '' && !finish && b == '') {
            if (a == '0.' && a.length == 2) {
                a = '0';
                out.textContent = 0;
            }

            a = a.slice(0, -1);
            out.textContent = a;

            if (a == '') {
                out.textContent = 0
            }
        }
        // очищаем второе число
        else if (a != '' && sign != '' && b != '') {
            if (b == '0.' && b.length == 2) {
                b = '0';
                out.textContent = 0;
            }
            b = b.slice(0, -1);
            out.textContent = b;

            if (b == '') {
                out.textContent = 0
            }
        }
        return [a, b]
    }

    document.querySelector('.buttons').onclick = (event) => {

        // нажата не кнопка
        if (!event.target.classList.contains('btn')) return;
        // нажата кнопка C
        if (event.target.classList.contains('c')) return clearAll();
        // нажата кнопка CE
        // очищаем только второе число
        if (event.target.classList.contains('ce')) {
            if (b != '') {
                b = ''
                out.textContent = 0;
            }
            return
        };
        if (event.target.classList.contains('x')) {
            clearMass = clearOne(a, b, sign, finish);
            a = clearMass[0];
            b = clearMass[1];
            console.log(`проверка a = ${a}, b = ${b}`);
            return
        }

        // outsmall.textContent = '';
        // out.textContent = '';

        a = a.toString();
        b = b.toString();
        // проверяем число на длину
        // если больше 14 цифр, то уменьшаем размер текста
        if (a.length >= 15) out.style.fontSize = '25px';
        if (b.length >= 15) out.style.fontSize = '25px';
        if (a.length < 24 && b == '') { out.textContent = a; console.log(a); }
        if (b.length < 24 && a != '' && sign) { out.textContent = b; console.log(b); }
        // получаем кнопку
        const key = event.target.textContent;


        // ищем клавишу
        if (digit.includes(key)) {
            if (b == '' && sign == '') {
                if (a.length < 24) { // если введенных цифр 23, прекратить ввод
                    outsmall.textContent = 0;
                    // проверяем на повторный ввод точки
                    if (key == '.' && String(a).includes('.')) {
                        a += '';
                        out.textContent = a;

                    }
                    // else if (String(b).includes('.') && finish) {
                    //     a = '';
                    //     a += key;
                    //     out.textContent = a;
                    // }
                    else {
                        // начинаем первое число с '0.', если первая кнопка '.'
                        if (key == '.' && a == '') {
                            a = '0.'
                            out.textContent = a;
                            return
                        }
                        // если нажата кнопка числа после получения результата, то начать с новых данных
                        if (a !== '' && finish) {
                            // если точка, то начать число с '0.'
                            if (key == '.') {
                                a = '0' + key;
                                out.textContent = a;
                                finish = false;
                                return
                            }
                            // если цифра, то начать с нее
                            else {
                                a = key;
                                out.textContent = a;
                                finish = false;
                                return
                            }
                        }

                        a += key;
                        out.textContent = a;
                    }
                    // пишем второе число с точкой после результата выражения
                }
            } else if (a !== '' && finish && b.length < 24) {

                if (key == '.') {
                    b = '0' + key;
                    out.textContent = b;
                    return
                }
                b += key;
                finish = false;
                out.textContent = b;

            } else if (b.length < 24) {
                // начинаем второе число с '0.', если первая кнопка '.'
                if (key == '.' && b == '' && !String(b).includes('.')) {
                    b += '0' + key;
                    out.textContent = b;
                    return
                }
                // если нажата кнопка точка, а во втором числе уже есть точка, то ничего не делать
                if (key == '.' && String(b).includes('.')) {

                    b += '';
                    out.textContent = b;
                    return
                }
                b += key;
                out.textContent = b
            }
        }

        // если после получения результата, нажата точка, то начать первое число с '0.'
        if (key == '.' && finish) {
            a = '0.';
            out.textContent = a;
            finish = false;
        }


        // вычисление других выражение (1/x; x^2; корень из x)
        if (key == expr_half) {
            outsmall.textContent = '1' + '/' + '(' + a + ')' + ' ' + '=';
            a = 1 / a;
            out.textContent = a;
            finish = true;
        } else if (key == expr_square) {
            outsmall.textContent = 'sqr' + '(' + a + ')' + ' ' + '=';
            a = a * a;
            out.textContent = a;
            finish = true;
        } else if (key == expr_root) {
            outsmall.textContent = expr_root.slice(0, -1) + '(' + a + ')' + ' ' + '=';
            a = Math.sqrt(a);
            out.textContent = a;
            finish = true;
        }
        // ищем знак для вычисления остальных выражений
        if (action.includes(key)) {
            if (a.length >= 15) outsmall.style.fontSize = '15px'
            outsmall.textContent = a + ' ' + key;
            if (!b == '') {
                a = doublesign(a, b, sign)
                out.textContent = a;
                b = '';
                if (sign != key) sign = key

                return
            }
            if (key == '%' || key == '+/-') {
                sign = key;
                a = doublesign(a, b, sign);
                out.textContent = a;
                b = '';
                return
            }
            sign = key;
            out.textContent = sign;
            return;
        }

        // нажата =
        if (key == '=') {
            a = doublesign(a, b, sign)
            out.textContent = a;
            b = '';
            sign = '';

        }
    }

    // решение знаками +; -; /; x; %; +/-
    function doublesign(a, b, sign) {
        if (b == '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                // sign = '';

                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if (b == '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
            case "%":
                a = a / 100;
                break;
            case "+/-":
                a = a * (-1);
                break;
            case "=":
                break;
        }
        finish = true;

        outsmall.textContent += ' ' + b + ' ' + '=';
        if (b == a) outsmall.textContent = a + ' ' + '=';
        return a
    }
}

