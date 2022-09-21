import Vue from 'vue';

Vue.mixin({
    computed: {
        STATIC_PATH: () => STATIC_PATH
    }
});
