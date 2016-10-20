module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8001,
                    hostname: '*',
                    keepalive: true,
                    open: true
                }
            }
        },

    });

    grunt.registerTask('serve', ['connect']);
    grunt.registerTask('default', ['connect']);

};