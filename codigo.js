

// variables globales

const contBotones = document.querySelector('.contenedor-botones');
const pantallaNum = document.querySelector('.numero');
const pantallaTotal = document.querySelector('.total');
const check = document.getElementById('check');
const contHistorial = document.querySelector('.contenedor-historial');
const historial = document.querySelector('.historial')

let total = 0;
let numActual = '';
let operadorActual = '';
let historialString = '';
let historialText = '';
let numHistorial = '';
let seMostroHistorial = false;
let operador = false;
let click = false;

let sonido = new Audio();
sonido.src = 'tecla.mp3';


// funciones

const checkear = () => {
	check.addEventListener('click', ()=>{
		let checked = check.checked;
		if(checked) {
			contHistorial.style.display = 'flex';
        } else {
        	contHistorial.style.display = 'none';
        }
	})
}


const sumar = (num) => {
	return parseFloat(total)+parseFloat(num);
}

const restar = (num,total) => {
	return parseFloat(total)-parseFloat(num);
}

const mul = (total,num) => {
	return parseFloat(total)*parseFloat(num);
}

const div = (total,num) => {
	return (parseFloat(total)/parseFloat(num));
}

const mostrarNumActual = (numero) => {
    if (numero % 1 == 0) {
        pantallaNum.innerHTML = total;
    } else {
        pantallaNum.innerHTML = total.toFixed(1);
    }
}

const mostrarTotal = (numero) => {
    if (numero % 1 == 0) {
        pantallaTotal.innerHTML = total+' '+operadorActual;
    } else {
        pantallaTotal.innerHTML = total.toFixed(1)+' '+operadorActual;
    }
}

const esEntero = (numero) => {
    if (numero % 1 == 0) {
        return true;
    } else {
        return false;
    }
}

const operar = () => {
	// si ya se preciono un operador 
	if(pantallaTotal.innerHTML !== '') {
        switch (operadorActual) {
         	case '+':         	    
         	    total = sumar(numActual);
         	    mostrarNumActual(total)			             		 
         	break;
         	case '-':            						
		        total = restar(numActual,total);
	            mostrarNumActual(total)					   
            break;
            case '*':            							
				total = mul(numActual,total);
				mostrarNumActual(total)						   
            break;
            case '/':            						
				total = div(total,numActual);
				mostrarNumActual(total)									   
            break;
        }
    } 
}


const rellenarHistorial = (valor) => {
	// rellena el array con el valor que recive y despues lo pasa a un string	
	
	historialString = '';

	if (valor === numActual) {
		numHistorial = '';
		historialString+=valor
		numHistorial = historialString;
	} 

	if (operador === true) {
		historialText +=numHistorial+valor
	}
}

const precionarNum = (boton) => {
	if(boton.classList.value === 'num') {					
		numActual += boton.innerHTML;
		pantallaNum.innerHTML = numActual;	
				
		operador = false;
		seMostroHistorial = false;	
		rellenarHistorial(numActual)
	}

}

const precionarOperador = (boton) => {
	if(boton.classList.value === 'operador') {

		if(operador === false) {
			operar();				
            
			if(boton.innerHTML === '+') {

				if (operadorActual === '') {
					total = sumar(numActual);
				}		
								
				operadorActual = '+';
			}

			if(boton.innerHTML === '-') {

				if (operadorActual === '') {
					if (total === 0) {
					    total = restar(total,numActual);
					} else {
						total = restar(numActual,total);
					}
				}							
				operadorActual = '-';
			}

			if(boton.innerHTML === '*') {
				if (operadorActual === '') {
					if (total === 0) {
					    total = mul(numActual,1);
					} else {
						total = mul(numActual,total);
					}
				}
				operadorActual = '*';
			}

			if(boton.innerHTML === '/') {
				if (operadorActual === '') {
					if (total === 0) {
					    total = div(numActual,1);
					} else {
						total = div(total,numActual);
					}
				}
				console.log(total)
				operadorActual = '/';
			}
			mostrarTotal(total);				
			numActual = '';	
		}
		operador = true;
		seMostroHistorial = false;	
		rellenarHistorial(boton.innerHTML); 
	}

}

const precionarIgual = (boton) => {
	if(boton.classList.value === 'igual') {

		// se acomoda el historial para poder escribir el =

		if(seMostroHistorial === false && pantallaNum.innerHTML !== '' && total !== 0) {
		    if (operador === true) {					
				historialText = historialText.substring(0, historialText.length - 1);
				historialText+= boton.innerHTML+total						
			} else {
				operar()
				historialText += numHistorial+boton.innerHTML;
				if(esEntero(total)) {
					historialText+=total;
				} else {
					historialText+=total.toFixed(1);
				}			
			}

			historial.innerHTML += `${historialText} <br>`;

			// se reinician los valores para poder seguir calculando

			historialText = '';
			pantallaTotal.innerHTML = '';
			total = 0;
			numActual = '';
			operadorActual = '';
			seMostroHistorial = true;
		}				
	}
}

const precionarBorrar = (boton) => {
	if(boton.classList.value === 'borrar') {
		numActual = pantallaNum.innerHTML.substring(0, pantallaNum.innerHTML.length - 1);
		pantallaNum.innerHTML = numActual;
	}
}

const precionarBorrarTodo = (boton) => {
	if(boton.classList.value === 'borrarTodo') {
		historial.innerHTML = '';
		historialText = '';
		pantallaNum.innerHTML = '';
		pantallaTotal.innerHTML = '';
		total = 0;
		numActual = '';
		operadorActual = '';
		seMostroHistorial = false;
	}
}

const precionarBotones = () => {
	
	contBotones.addEventListener('click', (e)=>{
		let boton = e.target;

		setTimeout(()=> {			
		    click = false;
		},400)

		sonido.play();

		if (click === false) {
						
			// si se preciona un numero

			precionarNum(boton);

			// si se preciona un operador

			precionarOperador(boton)

			// si se preciona igual 

			precionarIgual(boton);

			// si se preciona borrar

			precionarBorrar(boton);

			// si se preciona borrarTodo

			precionarBorrarTodo(boton)

	    }
	    click = true;
		
	})
}

// llamar funciones

checkear()
precionarBotones()