
function virollizar( canvasContextMaster, canvasContextSlave ) {
	
	canvasContextMaster.profundidad$ = 5 ;
	/** Valor que escala el efecto de profundidad. Cuanto mayor es el valor, menos se percibe. */
	canvasContextMaster.escaladoProfundidad$ = 2 ;
	/** La profundidad efectiva es la profundidad dividida entre el escalado */
	canvasContextMaster.profundidadEfectiva$ = 5/2 ;
	
	canvasContextMaster.ancho$ = canvasContextMaster.canvas.width ;
	canvasContextMaster.alto$ = canvasContextMaster.canvas.height ;
	canvasContextMaster.centroX$ = this.ancho$ / 2 ;
	canvasContextMaster.centroY$ = this.alto$ / 2 ;
	canvasContextMaster.slave$ = canvasContextSlave ;

	
	canvasContextMaster.realFillRect$ = canvasContextMaster.fillRect ;
	canvasContextMaster.realDrawImage$ = canvasContextMaster.drawImage ;
	
	canvasContextMaster.setProfundidad = function ( profundidad ) {
		this.profundidad$ = profundidad ;
		this.profundidadEfectiva$ = profundidad / this.escaladoProfundidad$ ;
	} ;
	
	canvasContextMaster.getProfundidad = function () {
		return this.profundidad$ ;
	} ;

	canvasContextMaster.setEscaladoProfundidad = function (escalado) {
		this.escaladoProfundidad$ = escalado ;
		this.profundidadEfectiva$ = this.profundidad$ / this.escaladoProfundidad$ ;
	} ;
	
	canvasContextMaster.getEscaladoProfundidad = function (escalado) {
		return this.escaladoProfundidad$ ;
	} ;
	
	canvasContextMaster.fillRect = function(x, y, w, h) {
		this.realFillRect$.apply(this, [x - this.profundidadEfectiva$, y, w, h]) ;
		
		this.slave$.fillStyle = this.fillStyle ;
		this.slave$.fillRect(x + this.profundidadEfectiva$, y, w, h) ;
	} ;
	
	canvasContextMaster.drawImage = function(image, dxOrSx, dyOrSy, dwOrSw, dhOrSh, dx, dy, dw, dh) {
		if (typeof(dwOrSw) == "undefined") {
			this.realDrawImage$.apply(this, [image, dxOrSx - this.profundidadEfectiva$, dyOrSy]) ;
			this.slave$.drawImage(image, dxOrSx + this.profundidadEfectiva$, dyOrSy) ;
		} else if (typeof(dx) == "undefined") {
			this.realDrawImage$.apply(this, [image, dxOrSx - this.profundidadEfectiva$, dyOrSy, dwOrSw, dhOrSh]) ;
			this.slave$.drawImage(image, dxOrSx + this.profundidadEfectiva$, dyOrSy, dwOrSw, dhOrSh) ;
		} else {
			this.realDrawImage$.apply(this, [image, dxOrSx, dyOrSy, dwOrSw, dhOrSh, dx - this.profundidadEfectiva$, dy, dw, dh]) ;
			this.slave$.drawImage(image, dxOrSx, dyOrSy, dwOrSw, dhOrSh, dx + this.profundidadEfectiva$, dy, dw, dh) ;
		}
		
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