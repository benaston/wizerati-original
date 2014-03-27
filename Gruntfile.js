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
          'public/javascripts/application/core/infrastructure-services/**/*.js',
          'public/javascripts/application/core/clients/**/*.js',
          'public/javascripts/application/core/connectors/**/*.js',
          'public/javascripts/application/core/config.js',
          'public/javascripts/application/core/models/**/*.js',
          'public/javascripts/application/core/views/**/*.js',
          'public/javascripts/application/core/helpers/**/*.js',
          'public/javascripts/application/core/packs/**/*.js',
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
          'public/stylesheets/vendor/third-party-reset.css',
          'public/stylesheets/application/wizerati-style-reset-non-form.css',
          'public/stylesheets/application/wizerati-style-reset-form.css',

          'public/stylesheets/vendor/lucid-style-buttons.css',
          'public/stylesheets/vendor/lucid-style-form-elements.css',
          'public/stylesheets/vendor/lucid-style-typography.css',

          'public/stylesheets/application/wizerati-style-animation.css',
          'public/stylesheets/application/wizerati-style-body.css',
          'public/stylesheets/application/wizerati-style-cube.css',
          'public/stylesheets/application/wizerati-style-faces.css',
          'public/stylesheets/application/wizerati-style-items-of-interest.css',
          'public/stylesheets/application/wizerati-style-loading-and-background.css',
          'public/stylesheets/application/wizerati-style-main-container.css',
          'public/stylesheets/application/wizerati-style-modal-container.css',
          'public/stylesheets/application/wizerati-style-apply-to-contract-dialog.css',
          'public/stylesheets/application/wizerati-style-tab-bar.css',
          'public/stylesheets/application/wizerati-style-search-panel.css',
          'public/stylesheets/application/wizerati-style-search-form.css',
          'public/stylesheets/application/wizerati-style-search-panel-handle.css',
          'public/stylesheets/application/wizerati-style-bookmark-panel.css',
          'public/stylesheets/application/wizerati-style-navbar-and-logo-and-build.css',
          'public/stylesheets/application/wizerati-style-result-list-panel.css'
        ],
        dest: 'public/stylesheets/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
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
        src: 'public/stylesheets/<%= pkg.name %>.encoded.css',
        dest: 'public/stylesheets/<%= pkg.name %>.min.css'
      }
    },
    replace: {
      escapeAngleBracketPercent: {
        options: {
          patterns: [
            {
              match: /\/<%/g,
              replacement: '/<\\%'
            }
          ]
        },
        files: [
          {src: ['public/javascripts/<%= pkg.name %>.min.broken-angle-bracket-percent.js'], dest: 'public/javascripts/<%= pkg.name %>.min.js'}
        ]
      },
      injectEditWarningIntoHead: {
        options: {
          patterns: [
            {
              match: 'warning',
              replacement: '<!-- WARNING: DO NOT EDIT THIS FILE DIRECTLY \n' +
                  '     WARNING: DO NOT EDIT THIS FILE DIRECTLY \n' +
                  '     WARNING: DO NOT EDIT THIS FILE DIRECTLY \n' +
                  '     WARNING: DO NOT EDIT THIS FILE DIRECTLY -->'
            }
          ]
        },
        files: [
          {src: ['view-templates/index.ejs'], dest: 'view-templates/_index-warning-injected.ejs'}
        ]
      },
      injectCssIntoHead: {
        options: {
          patterns: [
            {
              match: 'css',
              replacement: '<%= grunt.file.read("public/stylesheets/' + grunt.file.readJSON('package.json').name + '.min.css") %>'
            }
          ]
        },
        files: [
          {src: ['view-templates/_index-warning-injected.ejs'], dest: 'view-templates/_index-css-injected.ejs'}
        ]
      }, injectBuildNumber: {
        options: {
          patterns: [
            {
              match: 'build',
              replacement: new Date().toISOString()
            }
          ]
        },
        files: [
          {src: ['view-templates/_index-in-page-templates-injected.ejs'], dest: 'view-templates/_index-build-injected.ejs'}
        ]
      },injectInPageTemplates: {
        options: {
          patterns: [
            {
              match: 'search-form-contract-template',
              replacement: '<%= grunt.file.read("public/template-server/contract/templates/search-form.html") %>'
            },{
              match: 'item-of-interest-contract-template',
              replacement: '<%= grunt.file.read("public/template-server/contract/templates/item-of-interest.html") %>'
            },{
              match: 'result-contract-template',
              replacement: '<%= grunt.file.read("public/template-server/contract/templates/result.html") %>'
            },
            {
              match: 'no-script',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/no-script.html") %>'
            },
            {
              match: 'result-list-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/result-list-panel.html") %>'
            },
            {
              match: 'items-of-interest-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/items-of-interest-panel.html") %>'
            },
            {
              match: 'nav-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/tab-bar.html") %>'
            },
            {
              match: 'bookmark-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/bookmark-panel.html") %>'
            }
          ]
        },
        files: [
          {src: ['view-templates/_index-css-injected.ejs'], dest: 'view-templates/_index-in-page-templates-injected.ejs'}
        ]
      },injectDialogs: {
        options: {
          patterns: [
            {
              match: 'apply-to-contract-dialog',
              replacement: '<%= grunt.file.read("public/template-server/contract/templates/apply-to-contract-dialog.html") %>'
            }
          ]
        },
        files: [
          {src: ['view-templates/_index-build-injected.ejs'], dest: 'view-templates/_index-build-injected.ejs'}
        ]
      },
      injectFavoriteCube: {
        options: {
          patterns: [
            {
              match: 'favorite-cube',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/favorite-cube.html") %>'
            }
          ]
        },
        files: [
          {src: ['view-templates/_index-build-injected.ejs'], dest: 'view-templates/_index-build-injected.ejs'}
        ]
      },
      injectScriptTagForDebugging: {
        options: {
          patterns: [
            {
              match: 'javascript',
              replacement: '<script src="/javascripts/<%= pkg.name %>.js"></script>'
            }
          ]
        },
        files: [
          {src: ['view-templates/_index-build-injected.ejs'], dest: 'views/index.ejs'}
        ]
      }, injectJavaScriptIntoBody: {
        options: {
          patterns: [
            {
              match: 'javascript',
              replacement: '<script><%= grunt.file.read("public/javascripts/' + grunt.file.readJSON('package.json').name + '.min.js") %></script>'
            }
          ]
        },
        files: [
//          {src: ['view-templates/_index-build-injected.ejs'], dest: 'view-templates/_index-javascript-injected.ejs'}
          {src: ['view-templates/_index-build-injected.ejs'], dest: 'view-templates/_index-javascript-injected.ejs'}
        ]
      },
      //corrects for an apparent bug in the replace plugin for grunt that replaces "$&&" with "@@javascript"
      correctForReplaceTaskBug: {
        options: {
          patterns: [
            {
              match: /@@javascript/g,
              replacement: '$$&' //guesswork made this work - bug appears to be that $& gets replaces by @@javascript
            }
          ]
        },
        files: [
          {src: ['view-templates/_index-javascript-injected.ejs'], dest: 'views/index-single-file.ejs'}
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
      files: ['public/**/*', 'view-templates/index.ejs'],
      tasks: ['default'],
      options: {
        debounceDelay: 250
      }
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
  grunt.registerTask('default', ['concat',
    'uglify',
    'cssUrlEmbed',
    'cssmin',
//    'replace:escapeAngleBracketPercent',
    'replace:injectEditWarningIntoHead',
    'replace:injectCssIntoHead',
    'replace:injectInPageTemplates',
    'replace:injectBuildNumber',
    'replace:injectDialogs',
//    'replace:injectFavoriteCube',
    'replace:injectScriptTagForDebugging',
    'replace:injectJavaScriptIntoBody',
    'replace:correctForReplaceTaskBug'
  ]);
};
