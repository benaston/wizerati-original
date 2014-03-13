module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        options: {
          separator: ';'
        },
        src: [
          'public/javascripts/vendor/zepto.min.js',
          'public/javascripts/vendor/zepto-callbacks.js',
          'public/javascripts/vendor/zepto-deferred.js',
          'public/javascripts/vendor/underscore.js',
          'public/javascripts/vendor/_cookie.js',
          'public/javascripts/vendor/decorator.js',
          'public/javascripts/vendor/tiny-pub-sub.js',
          'public/javascripts/vendor/moment.min.js',
          'public/javascripts/vendor/invertebrate.js/invertebrate.js',
          'public/javascripts/vendor/invertebrate.js/**.js',
          'public/javascripts/application/wizerati.js',
          'public/javascripts/application/core/services/**/*.js',
          'public/javascripts/application/core/clients/**/*.js',
          'public/javascripts/application/core/connectors/**/*.js',
          'public/javascripts/application/core/config.js',
          'public/javascripts/application/core/models/**/*.js',
          'public/javascripts/application/core/views/**/*.js',
          'public/javascripts/application/core/controllers/**/*.js',
          'public/javascripts/application/core/factories/**/*.js',
          'public/javascripts/application/core/caches/**/*.js',
          'public/javascripts/application/core/entities/**/*.js',
          'public/javascripts/application/core/repositories/**/*.js',
          'public/javascripts/application/core/layout/**/*.js',
          'public/javascripts/application/core/decorators/**/*.js',
          'public/javascripts/application/core/route-registry.js',
          'public/javascripts/application/module-registry.js',
          'public/javascripts/application/env.js',
          'public/javascripts/application/core/app.js',
          'public/javascripts/application/app-start.js'
        ],
        dest: 'public/javascripts/<%= pkg.name %>.js'
      },
      css: {
        src: [
          'public/stylesheets/vendor/lucid-style-reset.css',
          'public/stylesheets/application/wizerati-style-reset.css',

//          'public/stylesheets/vendor/lucid-style-animation.css',
          'public/stylesheets/vendor/lucid-style-buttons.css',
          'public/stylesheets/vendor/lucid-style-declarative.css',
//          'public/stylesheets/vendor/lucid-style-dialogs.css',
          'public/stylesheets/vendor/lucid-style-faces.css',
          'public/stylesheets/vendor/lucid-style-form-elements.css',
          'public/stylesheets/vendor/lucid-style-table.css',
          'public/stylesheets/vendor/lucid-style-typography.css',
          'public/stylesheets/vendor/lucid-style-declarative.css',
          'public/stylesheets/vendor/lucid-style-colors.css',

          'public/stylesheets/application/wizerati-style-animation.css',
          'public/stylesheets/application/wizerati-style-body.css',
          'public/stylesheets/application/wizerati-style-dialogs.css',
          'public/stylesheets/application/wizerati-style-items-of-interest.css',
          'public/stylesheets/application/wizerati-style-loading-and-background.css',
          'public/stylesheets/application/wizerati-style-main-container.css',
          'public/stylesheets/application/wizerati-style-modal-container.css',
          'public/stylesheets/application/wizerati-style-search-panel.css',
          'public/stylesheets/application/wizerati-style-navbar-and-logo.css',
          'public/stylesheets/application/wizerati-style-result-list-panel.css',
//          'public/stylesheets/application/wizerati-style-cube.css',
          'public/stylesheets/application/wizerati-style-special.css'
        ],
        dest: 'public/stylesheets/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        preserveComments: false
      },
      dist: {
        files: {
          'public/javascripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    cssUrlEmbed: {
      encodeWithBaseDir: {
        options: {
          baseDir: './public/stylesheets'
        },
        files: {
          'public/stylesheets/<%= pkg.name %>.encoded.css': ['public/stylesheets/<%= pkg.name %>.css']
        }
      }
    },
    cssmin: {
      css: {
        src: 'public/stylesheets/<%= pkg.name %>.css',
        dest: 'public/stylesheets/<%= pkg.name %>.min.css'
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'css',
              replacement: '<%= grunt.file.read("public/stylesheets/'+ grunt.file.readJSON('package.json').name +'.min.css") %>'
            }
          ]
        },
        files: [
          {src: ['views/index-dev.ejs'], dest: 'views/index.ejs'}
        ]
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-css-url-embed');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['concat', 'uglify', 'cssUrlEmbed', 'cssmin', 'replace']);
};
