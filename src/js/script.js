// Seleção de elementos DOM para botões de tema (modo claro/escuro)
const lightMode = document.getElementById('light-mode');
const darkMode = document.getElementById('dark-mode');

// Seleção de botões operadores
const operatorBtns = document.querySelectorAll('.operator');

// Elemento do display (campo de entrada para mostrar o resultado)
const display = document.getElementById('result');
console.log('Display element:', display); // Verifica se o elemento foi encontrado

// Seleção de todos os botões da calculadora
const btns = document.querySelectorAll('.btn');
console.log('Botões encontrados:', btns.length); // Verifica quantos botões foram selecionados

// Variáveis globais para armazenar o estado da calculadora
let displayValue = ''; // Valor atual exibido no display
let operator = '';     // Operador selecionado (+, -, *, /)
let previousValue = ''; // Valor anterior para cálculo

// Função para atualizar o display com o valor atual
function updateDisplay() {
    if (display) {
        display.value = displayValue;
        console.log('Display atualizado para:', displayValue, 'Valor no input:', display.value);
    } else {
        console.error('Display element not found!');
    }
}

// Função para realizar o cálculo baseado no operador
function calculate() {
    const prev = parseFloat(previousValue); // Converte o valor anterior para número
    const current = parseFloat(displayValue); // Converte o valor atual para número
    let result;

    console.log('Calculando:', prev, operator, current);

    // Verifica se os valores são válidos
    if (isNaN(prev) || isNaN(current)) {
        console.log('Valores inválidos para cálculo');
        return;
    }

    // Realiza a operação baseada no operador
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            // Evita divisão por zero
            if (current === 0) {
                alert('Erro: Divisão por zero!');
                return;
            }
            result = prev / current;
            break;
        default:
            console.log('Operador inválido');
            return; // Se nenhum operador válido, sai da função
    }

    console.log('Resultado:', result);

    // Atualiza o displayValue com o resultado e limpa as variáveis
    displayValue = result.toString();
    operator = '';
    previousValue = '';
}

// Função principal para lidar com cliques nos botões
function handleButtonClick(event) {
    // Encontra o botão mais próximo (caso clique no ícone dentro)
    const button = event.target.closest('.btn');
    if (!button) return; // Se não for um botão, ignora

    const value = button.value; // Obtém o valor do botão

    console.log('Botão clicado:', value); // Log para debugar

    // Se for um número ou ponto decimal, adiciona ao displayValue
    if ((value >= '0' && value <= '9') || value === '.') {
        displayValue += value;
        updateDisplay();
    }
    // Se for um operador (+, -, *, /), armazena o valor atual e define o operador
    else if (['+', '-', '*', '/'].includes(value)) {
        if (displayValue) {
            previousValue = displayValue;
            operator = value;
            displayValue = '';
            updateDisplay(); // Limpa o display após selecionar operador
            console.log('Operador selecionado:', operator, 'Previous:', previousValue);
        }
    }
    // Se for o botão de igual (=), realiza o cálculo
    else if (value === '=') {
        if (previousValue && operator && displayValue) {
            calculate();
            updateDisplay();
        } else {
            console.log('Faltam valores para calcular');
        }
    }
    // Se for o botão de limpar (C), reseta tudo
    else if (value === 'C') {
        displayValue = '';
        operator = '';
        previousValue = '';
        updateDisplay();
        console.log('Limpou tudo');
    }
}

// Adiciona event listeners a todos os botões para capturar cliques
btns.forEach(btn => {
    btn.addEventListener('click', handleButtonClick);
});

// Código comentado para alternância de tema (pode ser descomentado futuramente)
// lightMode.addEventListener('click', () => {
//     document.body.classList.add('light-mode');
//     document.body.classList.remove('dark-mode');
// });

// darkMode.addEventListener('click', () => {
//     document.body.classList.add('dark-mode');
//     document.body.classList.remove('light-mode');
// });