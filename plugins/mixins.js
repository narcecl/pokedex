import Vue from 'vue';

Vue.mixin({
    data: function(){
        return {
            mobile_breakpoint: 768,
            window_width: null,
            window_height: null
        };
    },
    computed: {
        isMobile: function(){
            if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) return true;
            return false;
        },
        isMobileViewport: function(){
            return ( this.window_width <= this.mobile_breakpoint );
        }
    },
    methods: {
        setDimensions: function(){
            this.window_width = window.innerWidth;
            this.window_height = window.innerHeight;
        }
    },
    created: function(){
        this.setDimensions();
    },
    mounted: function(){
        window.addEventListener('resize', this.setDimensions);
    }
});