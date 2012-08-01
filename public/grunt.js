module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'js/**/*.js']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        exports: true,
        module: false
      }
    }
  });

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  // grunt.loadNpmTasks('grunt-sample');

  // Default task.
  grunt.registerTask('default', 'lint');

};
