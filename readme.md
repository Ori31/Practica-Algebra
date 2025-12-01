## Datos del alumno

Nombre del Alumno: Sergio Orion Huerta Martinez
Grupo: B
Materia: Fundamentos de algebra

---

# Cifrado Hill 2x2: Documentación del Proyecto

## Descripción del Proyecto y Algoritmo

Este proyecto implementa el **Algoritmo de Cifrado Hill** con una matriz clave de **2x2**. Es un cifrado de sustitución polialfabética que opera en bloques de dos letras (dígramas).

El sistema utiliza la aritmética modular $\text{módulo 26}$ para el alfabeto inglés (A-Z). Cada letra se mapea a un número del $0$ al $25$, donde $A=0, B=1, \dots, Z=25$.

### Proceso de Encriptación (Cifrado)

1.  El mensaje de texto plano se convierte en un vector de números $\mathbf{P}$.
2.  El mensaje se divide en pares de letras (vectores columna $\mathbf{p} = \begin{pmatrix} p_1 \\ p_2 \end{pmatrix}$). Si el mensaje tiene una longitud impar, se añade una letra de _padding_ (generalmente 'X', valor $23$) para completar el último par.
3.  Cada par $\mathbf{p}$ se multiplica por la matriz clave $\mathbf{K}$:
    $$\mathbf{C} \equiv \mathbf{K} \cdot \mathbf{p} \pmod{26}$$
    Donde $\mathbf{C} = \begin{pmatrix} c_1 \\ c_2 \end{pmatrix}$ es el dígrama cifrado, y $\mathbf{K} = \begin{pmatrix} k_{11} & k_{12} \\ k_{21} & k_{22} \end{pmatrix}$ es la matriz clave.
4.  El vector resultante $\mathbf{C}$ se convierte de nuevo a letras para formar el texto cifrado.

### Ejecución del Encriptador/Desencriptador

1.  **Montaje del Archivo:** Asegúrate de tener un archivo HTML (`index.html`, por ejemplo) que cargue el script de JavaScript. El HTML debe contener los siguientes elementos con sus respectivos `id`:
    - Un campo de texto (`<textarea>` o `<input>`) con `id="mensaje"` para el texto plano.
    - Cuatro campos de entrada (`<input>`) con `id="k11"`, `id="k12"`, `id="k21"`, y `id="k22"` para los elementos de la matriz clave.
    - Un botón con `id="encriptar"`.
    - Un botón con `id="desencriptar"`.
    - Un elemento (`<div>` o `<p>`) con `id="resultado"` donde se mostrará el texto cifrado/descifrado y los mensajes de error.
2.  **Abrir en el Navegador:** Abre el archivo HTML en tu navegador web.
3.  **Para Encriptar:**
    - Ingresa el mensaje en el campo de texto.
    - Ingresa los cuatro valores de la matriz clave $2\times2$ en los campos correspondientes. **Advertencia:** Asegúrate de que la matriz clave sea **invertible** $\pmod{26}$ (ver detalles matemáticos).
    - Presiona el botón **"Encriptar"**. El texto cifrado aparecerá en el área de resultados.
4.  **Para Desencriptar:**
    - Asegúrate de que el texto cifrado a desencriptar se encuentre en el campo de `resultado` (generalmente, después de encriptar).
    - **Mantén la misma matriz clave** $2\times2$ utilizada para el cifrado en los campos de clave.
    - Presiona el botón **"Desencriptar"**. El mensaje original aparecerá en el área de resultados.

---

## Matemáticas Detrás de la Implementación

### El Alfabeto y el Módulo

- **Alfabeto:** Se usa el alfabeto inglés (26 letras, A-Z).
- **Mapeo:** Cada letra $L$ se mapea a un valor numérico $V$:
  $$V = \text{código ASCII}(L) - \text{código ASCII}('A')$$
  Esto da $A=0, B=1, \dots, Z=25$.
- **Módulo:** Todas las operaciones aritméticas (suma, multiplicación) se realizan en el anillo de enteros $\mathbb{Z}_{26}$, es decir, $\pmod{26}$.

### La Matriz Clave $\mathbf{K}$

La clave es una matriz $2\times2$: $\mathbf{K} = \begin{pmatrix} k_{11} & k_{12} \\ k_{21} & k_{22} \end{pmatrix}$.

Para que la clave sea válida y el mensaje se pueda **desencriptar**, su **determinante** $\det(\mathbf{K})$ debe ser:

1.  **No Cero** $\pmod{26}$.
2.  **Copropimo** con $26$. Esto significa que $\det(\mathbf{K})$ no puede ser divisible por $2$ ni por $13$.

$$\det(\mathbf{K}) = (k_{11}k_{22} - k_{12}k_{21}) \pmod{26}$$

### La Matriz Inversa para Desencriptar $\mathbf{K}^{-1}$

La desencriptación utiliza la matriz clave inversa, $\mathbf{K}^{-1}$, definida tal que:
$$\mathbf{K}^{-1} \cdot \mathbf{K} \equiv \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \pmod{26}$$

La fórmula para calcular la matriz inversa es:

$$\mathbf{K}^{-1} \equiv (\det(\mathbf{K}))^{-1} \cdot \begin{pmatrix} k_{22} & -k_{12} \\ -k_{21} & k_{11} \end{pmatrix} \pmod{26}$$

#### 1. Inverso Multiplicativo Modular

Primero, se calcula el **inverso multiplicativo modular** de $\det(\mathbf{K})$, denotado como $(\det(\mathbf{K}))^{-1}$, que es el número $x$ tal que:
$$(\det(\mathbf{K}) \cdot x) \equiv 1 \pmod{26}$$
Este valor $x$ es único si $\det(\mathbf{K})$ es coprimo con $26$. La implementación lo encuentra por fuerza bruta, iterando de $1$ a $25$.

#### 2. Cálculo de $\mathbf{K}^{-1}$

El algoritmo JavaScript calcula los elementos de $\mathbf{K}^{-1} = \begin{pmatrix} k'_{11} & k'_{12} \\ k'_{21} & k'_{22} \end{pmatrix}$ como sigue, asegurando que todos los resultados sean positivos antes de aplicar el $\pmod{26}$:

- $k'_{11} \equiv (\det(\mathbf{K}))^{-1} \cdot k_{22} \pmod{26}$
- $k'_{12} \equiv (\det(\mathbf{K}))^{-1} \cdot (-k_{12}) \pmod{26}$
- $k'_{21} \equiv (\det(\mathbf{K}))^{-1} \cdot (-k_{21}) \pmod{26}$
- $k'_{22} \equiv (\det(\mathbf{K}))^{-1} \cdot k_{11} \pmod{26}$

### Proceso de Desencriptación

Una vez que se tiene $\mathbf{K}^{-1}$, cada dígrama cifrado $\mathbf{C}$ se convierte de nuevo a texto plano $\mathbf{p}$:
$$\mathbf{p} \equiv \mathbf{K}^{-1} \cdot \mathbf{C} \pmod{26}$$

---

## Documentación del Proyecto: Estilos CSS Personalizados

---

### Personalización Realizada

#### 1. Tipografía y Fondo

- **Fondo del Cuerpo (`body`):** Se estableció un fondo negro puro (`#000000`) para simular la oscuridad. Se implementó un patrón de rejilla sutil usando gradientes lineales, con líneas de color magenta neón semitransparentes (`rgba(139, 0, 139, 0.1)`), para dar un efecto de fondo digital .
- **Tipografía:** Se eligió la fuente **`'Tiny5', monospace`** como la fuente principal en todo el proyecto para evocar la estética de terminales de código y sistemas antiguos.

#### 2. Contenedor Principal (`.container`) y Efecto de Escaneo

- **Estilo del Contenedor:** El contenedor principal tiene un fondo muy oscuro (`#111111`) con bordes rectos (`border-radius: 0`). Se aplicó una sombra cian neón (`rgba(0, 191, 255, 0.3)`) para hacerlo destacar.
- **Animación de Escaneo (`@keyframes scan`):** Se añadió un pseudo-elemento (`::before`) al contenedor para simular un **efecto de escaneo horizontal (glitch)** de luz cian neón.
  $$
  \begin{align*}
  &\text{Cian Neón:} \quad \#00bff \\
  &\text{Magenta Neón:} \quad \#8b008b
  \end{align*}
  $$
  El _keyframe_ se define como:
  $$\text{@keyframes scan} \begin{cases} 0\% & \to \text{left: -100\%} \\ 100\% & \to \text{left: 100\%} \end{cases}$$

#### 3. Paleta de Colores y Elementos de Interfaz

Se utilizó una paleta bicolor de alta saturación para acentuar elementos clave:

- **Magenta Neón (`#8b008b`):** Utilizado para títulos principales (`h1`) y en el estado de enfoque (`:focus`) de campos de entrada (`input`, `textarea`) para indicar actividad.
- **Cian Neón (`#00bfff`):** Utilizado para subtítulos (`h3`), etiquetas (`label`) y elementos interactivos como botones (`button`).
- **Feedback de Error:** Los mensajes de error utilizan un color rosa neón (`#ff0080`) sobre un fondo semitransparente para un contraste de alarma visual.

#### 4. Campos de Entrada y Botones

- **Campos de Entrada (`input`, `textarea`):** Tienen un fondo negro (`#000000`) y bordes oscuros (`#333333`). Al enfocar, el borde cambia a magenta neón con una sombra brillante.
- **Botones (`button`):** Se diseñaron como elementos de interfaz digital sin relleno (`background: transparent`), con un borde de cian neón.
  - **Estado Hover:** Al pasar el ratón, el botón adquiere un fondo cian semitransparente (`rgba(0, 191, 255, 0.1)`) y una sombra brillante, proporcionando una respuesta táctil visual inmediata.

#### 5. Display de Resultados

- **Cajas de Resultados (`.resultado-box`, `.matriz-display`, etc.):** Se utilizó un fondo ligeramente más claro que el base (`rgba(255, 255, 255, 0.05)`) y un borde sutil, diferenciando claramente el output de la interfaz de entrada. Los resultados internos (como las matrices) se muestran a menudo en color cian neón para destacarlos.

---

### Módulos Afectados

La implementación de este estilo es transversal y afecta a los siguientes componentes:

- **Módulo de División Sintética:** Aplica el tema al formulario de entrada y a la visualización del proceso tabular.
- **Módulo de Calculadora Simbólica:** Implementa el tema en las secciones de despeje de variables y resolución de ecuaciones.
- **Módulo de Matrices/Algoritmos Similares:** Aplica el tema a la entrada de datos de la matriz y a las áreas de visualización de resultados.
