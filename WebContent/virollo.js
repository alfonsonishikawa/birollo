
function virollizar( canvasContextMaster, canvasContextSlave ) {
	
	canvasContextMaster.profundidad$ = 5 ;
	canvasContextMaster.ancho$ = canvasContextMaster.canvas.width ;
	canvasContextMaster.alto$ = canvasContextMaster.canvas.height ;
	canvasContextMaster.centroX$ = this.ancho$ / 2 ;
	canvasContextMaster.centroY$ = this.alto$ / 2 ;
	canvasContextMaster.slave$ = canvasContextSlave ;
	
	
	canvasContextMaster.realFillRect$ = canvasContextMaster.fillRect ;
	
	/**
	 * Dada unas coordenadas, indica el desplazamiento X e Y
	 * 
	 * @Entrada:
	 *   1)		/1 de tipo {x:, y:}
	 * 	 2) 	/1 de tipo number (sólo coordenada X)
	 *   3)     /2 de tipo (number, number) (X,Y)
	 *   4)     /2 de tipo (undefined, number) (_,Y)
	 */
	canvasContextMaster.incAlCentro = function(packetOrXOrUndefined, yOrUndefined) {
		var incX = undefined,
			incY = undefined ;
		
		// 1)
		if (typeof(packetOrXOrUndefined) == 'object') {
			incX = packetOrXOrUndefined.x - this.centroX$ ;
			incY = packetOrXOrUndefined.y - this.centroY$ ;
			return {x:incX, y:incY} ;
		}
		
		// 2) y 3)
		if (typeof(packetOrXOrUndefined) == "number") {
			incX = packetOrXOrUndefined - this.centroX$ ;
			if (typeof(yOrUndefined) != "undefined" && typeof(yOrUndefined) != "number") {
				throw "Segundo parámetro inválido. Se esperaba number o undefined" ;
			}
			if (typeof(yOrUndefined) == "number") { // 3)
				incY = yOrUndefined - this.centroY$ ;
			}
			return {x:incX, y:incY} ;
		}
		
		//4)
		if (typeof(yOrUndefined) == "number") {
			incY = yOrUndefined - this.centroY$ ;
			return {x:incX, y:incY} ;
		}
		
		throw "Parámetros inválidos" ;
	} ;
	
	canvasContextMaster.setProfundidad = function ( profundidad ) {
		this.profundidad$ = profundidad ;
	} ;
	
	canvasContextMaster.getProfundidad = function () {
		return this.profundidad$ ;
	} ;
	
	canvasContextMaster.fillRect = function(x, y, w, h) {
		var incCoords = this.incAlCentro(x, y) ;
		this.realFillRect$.apply(this, [x - this.profundidad$, y, w, h]) ;
		
		this.slave$.fillStyle = this.fillStyle ;
		this.slave$.fillRect(x + this.profundidad$, y, w, h) ;
	} ;
	
	canvasContextMaster.beginPath = function() {
		this.__proto__.beginPath() ;
		this.slave$.beginPath() ;
	} ;
	
	canvasContextMaster.fill = function() {
		this.__proto__.fill() ;
		this.slave$.fill() ;
	} ;

} ;