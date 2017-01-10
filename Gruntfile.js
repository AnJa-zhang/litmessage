module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      pageMask :{
        options: {
          preserveComments: 'some',
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 
                  '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        },
        files: {
          'dist/litmessage.min.js': ['src/litmessage.js']
        }
      }
    },
    concat: {
      pageMask: {
        options: {
          process: function(src, filepath) {
            return src.replace(/(^|\n)\/\/!import '(.+\.js)'/g, function(m, m1, m2) {
                return m1 + grunt.file.read(m2);
              });
          }
        },
        files: {
          'dist/litmessage.js': ['dist/litmessage.min.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify', 'concat']);
};