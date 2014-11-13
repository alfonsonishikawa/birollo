
function Planeta(nombre, htmlImageElement, canvas, tamano, posicionInfo) {
	
//       posicionInfo = {anguloInicial,
//                       radio,
//                       alturaTraslacion,
//                       velocidadAngular,
//                       centroX,
//                       centroY,
//                       centroProfundidad,
//                       maxProfundidad}
	
	this.nombre = nombre ;
	this.angulo = posicionInfo.anguloInicial;
	posicionInfo.maxProfundidad = posicionInfo.maxProfundidad || posicionInfo.centroProfundidad ; 
	
	this.tick = function() {
		this.angulo = this.angulo + posicionInfo.velocidadAngular ;
	};
	
	this.getPosicion = function() {
		var posX = posicionInfo.centroX + Math.cos(this.angulo) * posicionInfo.radio ;
		var profundidad = posicionInfo.centroProfundidad - Math.sin(this.angulo) * posicionInfo.maxProfundidad ;
		var posY = posicionInfo.centroY - posicionInfo.alturaTraslacion * Math.cos(this.angulo) ;
		return {x: posX, y: posY, profundidad: profundidad} ;
	} ;
	
	this.dibujar = function() {
		var posicion = this.getPosicion() ;
		var profundidadADibujar = 0 ;
		if (posicion.profundidad > 0) profundidadADibujar = posicion.profundidad ;
		canvas.setProfundidad(profundidadADibujar) ;
		canvas.drawImage(htmlImageElement, posicion.x, posicion.y, tamano, tamano) ;
	} ;
	
} 

function getOrdenadosPorProfundidad ( arrayPlanetas ) {
	var ordenados = arrayPlanetas.sort(function(a,b) { return a.getPosicion().profundidad > b.getPosicion().profundidad ; } ) ;
	return ordenados ;
}