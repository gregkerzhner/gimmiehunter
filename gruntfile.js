module.exports = function(grunt) {

  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib');

  grunt.initConfig({
    concat: {
      options: {
    // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['public/js/**/*.js'],
        // the location of the resulting JS file
        dest: 'public/build/all-the-scripts.js'
      }
    },
    watch: {
      files: ['public/js/**/*.js'],
      tasks: ['concat'],
      options: {
        livereload: true
      }
    }

  });

  grunt.registerTask('default', 'watch');

}