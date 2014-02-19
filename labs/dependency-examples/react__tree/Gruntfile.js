module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['js/**/*', 'bower_components/**/*']
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 8000,
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('livereload', ['watch:js']);
    grunt.registerTask('server', ['connect:server']);
    
};