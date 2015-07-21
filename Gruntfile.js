"use strict";

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var config = {
    browserify: {
      options: {
        //transform: ['hbsfy', 'reactify'],
        watch: true,
        browserifyOptions: {
          debug: true,
        }
      },
      main: {
        dest: 'public/js/main.js',
        src: 'src/js/index.js',
      }
    },
    less: {
      'public/css/styles.css': 'src/less/index.less'
    },
    uglify: {
      main: {
        files: {
          'public/js/main.js': 'public/js/main.js'
        }
      }
    },
    watch: {
      less: {
        files: ['src/less/*.less'],
        tasks: ['less']
      }
    }
  };

  grunt.initConfig(config);

  grunt.registerTask('dev', ['browserify', 'less', 'watch']);
  grunt.registerTask('prod', ['browserify', 'uglify', 'less']);


};
