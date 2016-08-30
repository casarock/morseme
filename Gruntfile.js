module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg  : grunt.file.readJSON("package.json"),
        meta : {
            js   : [
                'js/*.js'
            ],
            grunt : [
              'Gruntfile.js'
            ]
        },

        watch: {
            js : {
              files: '<%= meta.js %>',
              tasks: ['concat', 'uglify']
            },

            grunt : {
              files : '<%=  meta.grunt %>',
              tasks : ['watch']
            }
        },

        concat : {
          options : {
            separactor: ';'
          },
          dist : {
            src : '<%= meta.js %>',
            dest : 'script/app.join.js'
          }
        },

        uglify : {
          dist : {
            src : 'script/app.join.js',
            dest : 'script/app.min.js'
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('default', ['build', 'watch']);
};
