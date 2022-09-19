export default {
	data: function(){
		return {
			mobile_breakpoint: 768,
			window_width: null,
			window_height: null
		};
	},
	computed: {
		isMobile: function(){
			// Verificamos si es mobile (por userAgent del navegador)
			return ( navigator.userAgent.match( /Android/i ) || navigator.userAgent.match( /webOS/i ) || navigator.userAgent.match( /iPhone/i ) || navigator.userAgent.match( '/iPad/i' ) || navigator.userAgent.match( /iPod/i ) || navigator.userAgent.match( /BlackBerry/i ) || navigator.userAgent.match( /Windows Phone/i ));
		},
		isMobileViewport: function(){
			// Verificamos si el mobile (por tamaño del dispositivo)
			return ( this.window_width <= this.mobile_breakpoint );
		}
	},
	methods: {
		setDimensions: function(){
			// Actualizamos las variables (width / height)
			if( typeof window !== 'undefined' ){
				this.window_width = window.innerWidth;
				this.window_height = window.innerHeight;
			}
		}
	},
	created: function(){
		// Seteamos las variables al crear la instancia
		this.setDimensions();
	},
	mounted: function(){
		// Agregamos el evento
		window.addEventListener( 'resize', this.setDimensions );
	}
};
