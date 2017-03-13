(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Voir = factory();
    }
}(this, function () {
    return {
        install: function(Vue, initState, mutators){
            var store = {
                state: initState,
                commit: function(action) {
                    for(var j = 0 ; j < mutators.length; j++){
                        mutators[j](store.state,action);
                    }
                }
            };
            Vue.mixin({
                data: function() {
                    return {
                        store: store.state
                    }
                }
            });
            Vue.prototype.commit = store.commit;
        }
    };
}));