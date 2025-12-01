const mensaje = document.getElementById('mensaje');
const charCount = document.querySelector('.char-count');
const matrizMensaje = document.getElementById('matrizMensaje');
const k11 = document.getElementById('k11');
const k12 = document.getElementById('k12');
const k21 = document.getElementById('k21');
const k22 = document.getElementById('k22');
const btnEncriptar = document.getElementById('encriptar');
const resultado = document.getElementById('resultado');
const btnDesencriptar = document.getElementById('desencriptar');
// Actualizar contador de caracteres
mensaje.addEventListener('input', () => {
    const len = mensaje.value.length;
    charCount.textContent = `${len}/30`;
    mostrarMatrizMensaje();
});

// Mostrar matriz del mensaje
function mostrarMatrizMensaje() {
    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');
    
    if (texto.length === 0) {
        matrizMensaje.textContent = 'Escribe un mensaje primero...';
        return;
    }
    
    const valores = texto.split('').map(char => char.charCodeAt(0) - 65);
    
    // Agrupar en pares
    let matriz = '[';
    for (let i = 0; i < valores.length; i += 2) {
        if (i > 0) matriz += ' ';
        matriz += '[' + valores[i];
        if (i + 1 < valores.length) {
            matriz += ', ' + valores[i + 1];
        } else {
            matriz += ', ' + (valores.length % 2 === 0 ? '' : '23'); // Padding con 'X'
        }
        matriz += ']';
    }
    matriz += ']';
    
    matrizMensaje.textContent = matriz;
}

// Función de encriptación Hill
btnEncriptar.addEventListener('click', () => {
    // Validar inputs
    const key = [
        [parseInt(k11.value) || 0, parseInt(k12.value) || 0],
        [parseInt(k21.value) || 0, parseInt(k22.value) || 0]
    ];
    
    if (key[0][0] === 0 && key[0][1] === 0 && key[1][0] === 0 && key[1][1] === 0) {
        resultado.textContent = 'Error: Ingresa una matriz clave válida';
        resultado.classList.add('error');
        return;
    }
    
    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');
    
    if (texto.length === 0) {
        resultado.textContent = 'Error: Ingresa un mensaje';
        resultado.classList.add('error');
        return;
    }
    
    // Calcular determinante
    const det = (key[0][0] * key[1][1] - key[0][1] * key[1][0]) % 26;
    
    if (det === 0) {
        resultado.textContent = 'Error: La matriz no es invertible (determinante = 0)';
        resultado.classList.add('error');
        return;
    }
    
    // Convertir texto a números
    let numeros = texto.split('').map(char => char.charCodeAt(0) - 65);
    
    // Agregar padding si es impar
    if (numeros.length % 2 !== 0) {
        numeros.push(23); // 'X'
    }
    
    // Encriptar
    let encriptado = '';
    for (let i = 0; i < numeros.length; i += 2) {
        const v1 = numeros[i];
        const v2 = numeros[i + 1];
        
        const c1 = (key[0][0] * v1 + key[0][1] * v2) % 26;
        const c2 = (key[1][0] * v1 + key[1][1] * v2) % 26;
        
        encriptado += String.fromCharCode(65 + c1);
        encriptado += String.fromCharCode(65 + c2);
    }
    
    resultado.classList.remove('error');
    resultado.textContent = encriptado;
});


function inversaModulo26(a) {
    a = (a % 26 + 26) % 26; 
    for (let x = 1; x < 26; x++) {
        if ((a * x) % 26 === 1) {
            return x;
        }
    }
    return 0; 
}

function desencriptarMensaje() {
    
    const textoEncriptado = resultado.textContent;
    
    if (textoEncriptado.length === 0 || resultado.classList.contains('error')) {
        resultado.textContent = 'Error: Primero debes encriptar un mensaje válido.';
        resultado.classList.add('error');
        return;
    }

    const key = [
        [parseInt(k11.value) || 0, parseInt(k12.value) || 0],
        [parseInt(k21.value) || 0, parseInt(k22.value) || 0]
    ];

    let det = (key[0][0] * key[1][1] - key[0][1] * key[1][0]);
    const detMod = (det % 26 + 26) % 26;
    
    const detInv = inversaModulo26(detMod);

    if (detInv === 0) {
        resultado.textContent = 'Error: La matriz clave no es invertible (determinante no válido para desencriptar).';
        resultado.classList.add('error');
        return;
    }
    
    const invKey = [
        [
            (detInv * key[1][1]) % 26, 
            (detInv * -key[0][1] + 26 * detInv) % 26 // Añadir 26*detInv para asegurar positividad
        ],
        [
            (detInv * -key[1][0] + 26 * detInv) % 26, 
            (detInv * key[0][0]) % 26
        ]
    ];
    
    let numerosEncriptados = textoEncriptado.split('').map(char => char.charCodeAt(0) - 65);


    let desencriptado = '';
    for (let i = 0; i < numerosEncriptados.length; i += 2) {
        const c1 = numerosEncriptados[i];
        const c2 = numerosEncriptados[i + 1];
        

        const v1 = (invKey[0][0] * c1 + invKey[0][1] * c2) % 26;
        const v2 = (invKey[1][0] * c1 + invKey[1][1] * c2) % 26;
        
        desencriptado += String.fromCharCode(65 + v1);
        desencriptado += String.fromCharCode(65 + v2);
    }
    
    const textoOriginal = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (textoOriginal.length % 2 !== 0 && desencriptado.endsWith('X')) {
        desencriptado = desencriptado.slice(0, -1);
    }

    resultado.classList.remove('error');
    resultado.textContent = desencriptado;
}

btnDesencriptar.addEventListener('click', desencriptarMensaje);