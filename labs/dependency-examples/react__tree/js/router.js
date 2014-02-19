define(['director'], function(Director) {
    
    var router = new Director();
    router.ALL = ['/', '/all'];
    router.ACTIVE = '/active';
    router.COMPLETED = '/completed';
    return router;

});