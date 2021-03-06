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
          'public/javascripts/vendor/smooth-scroll.js',
          'public/javascripts/vendor/debounce.js',
          'public/javascripts/vendor/underscore.js',
          'public/javascripts/vendor/_cookie.js',
          'public/javascripts/vendor/decorator.js',
          'public/javascripts/vendor/sha-1.js',
          'public/javascripts/vendor/tiny-pub-sub.js',
          'public/javascripts/vendor/moment.min.js',
          'public/javascripts/vendor/invertebrate/invertebrate.js',
          'public/javascripts/vendor/invertebrate/**.js',
          'public/javascripts/application/wizerati.js',
          'public/javascripts/application/core/**/*.js',
          '!public/javascripts/application/core/**/old/*.js',
          'public/javascripts/application/module-registry.js',
          'public/javascripts/application/env.js',
          'public/javascripts/application/app-start.js'
        ],
        dest: 'public/javascripts/<%= pkg.name %>.js'
      },
      css: {
        src: [
          'public/stylesheets/reset/third-party-reset.css',
          'public/stylesheets/reset/wizerati-style-reset-form.css',
          'public/stylesheets/reset/wizerati-style-reset-non-form.css',
          'public/stylesheets/vendor/lucid-style-faces.css',
          'public/stylesheets/vendor/lucid-style-buttons.css',
          'public/stylesheets/vendor/lucid-style-buttons-rotating.css',
          'public/stylesheets/vendor/lucid-style-form-elements.css',
          'public/stylesheets/application/*.css',
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
          {src: ['view-templates/index.ejs'], dest: 'view-templates/_index-css-injected.ejs'}
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
            },{
              match: 'bookmark-period-contract-template',
              replacement: '<%= grunt.file.read("public/template-server/contract/templates/bookmark-period.html") %>'
            },{
              match: 'account-template',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/account.html") %>'
            },
            {
              match: 'footer',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/footer.html") %>'
            },{
              match: 'no-script',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/no-script.html") %>'
            },{
              match: 'no-compatibility',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/no-compatibility.html") %>'
            },
            {
              match: 'search-form-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/search-form-panel.html") %>'
            },{
              match: 'result-list-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/result-list-panel.html") %>'
            },
            {
              match: 'items-of-interest-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/items-of-interest-panel.html") %>'
            },
            {
              match: 'account-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/account-panel.html") %>'
            },
            {
              match: 'nav-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/tab-bar.html") %>'
            },
            {
              match: 'bookmark-list-panel',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/bookmark-list-panel.html") %>'
            },
            {
              match: 'sign-in-modal',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/sign-in-modal.html") %>'
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
              match: 'apply-dialog-contract',
              replacement: '<%= grunt.file.read("public/template-server/contract/templates/apply-dialog.html") %>'
            },
            {
              match: 'account-tab-personal-details',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/account-tab-personal-details.html") %>'
            },
            {
              match: 'account-tab-security',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/account-tab-security.html") %>'
            },
            {
              match: 'account-tab-my-cvs',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/account-tab-my-cvs.html") %>'
            },
            {
              match: 'account-tab-job-applications',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/account-tab-job-applications.html") %>'
            },
            {
              match: 'account-tab-job-adverts',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/account-tab-job-adverts.html") %>'
            },
            {
              match: 'account-tab-billing',
              replacement: '<%= grunt.file.read("public/template-server/shared/templates/account-tab-billing.html") %>'
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
      },
      sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'expanded'
          },
          files: {                         // Dictionary of files
            'main.css': 'main.scss',       // 'destination': 'source'
            'widgets.css': 'widgets.scss'
          }
        }
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-css-url-embed');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['concat',
    'uglify',
    'cssUrlEmbed',
    'cssmin',
    'replace:injectCssIntoHead',
    'replace:injectInPageTemplates',
    'replace:injectBuildNumber',
    'replace:injectDialogs',
    'replace:injectScriptTagForDebugging',
    'replace:injectJavaScriptIntoBody',
    'replace:correctForReplaceTaskBug'
  ]);
};
