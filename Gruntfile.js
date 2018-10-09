module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['webapp/*', 'webapp/assets/img/*', 'webapp/assets/components/**', 'webapp/assets/images/**'],
                        dest: 'build/'
                    }
                ],
            },
            node_modules: {
                files: [
                    {
                        expand: true,
                        cwd: "./node_modules",
                        src: ["handlebars/dist/handlebars.js"],
                        dest: 'webapp/assets/lib/handlebars',
                        flatten: true
                    }
                ],
            },
            
        },
        clean: {
            build: {
                src: ['build/']
            }, 
            cleanup:{
                src: ["temp/"]
            }
        },
        concat: {
            options: {
              stripBanners: true,
              separator: ';'
            //   banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            //     '<%= grunt.template.today("yyyy-mm-dd") %> */',
                //banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            buildjs: {
                src: [
                    'webapp/assets/lib/jquery/dist/jquery.js',
                    'webapp/assets/lib/bootstrap/dist/js/bootstrap.min.js',
                    'webapp/assets/lib/wow/dist/wow.js',
                    'webapp/assets/lib/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.js',
                    'webapp/assets/lib/isotope/dist/isotope.pkgd.js',
                    'webapp/assets/lib/imagesloaded/imagesloaded.pkgd.js',
                    'webapp/assets/lib/flexslider/jquery.flexslider.js',
                    'webapp/assets/lib/owl.carousel/dist/owl.carousel.min.js',
                    'webapp/assets/lib/smoothscroll.js',
                    'webapp/assets/lib/magnific-popup/dist/jquery.magnific-popup.js',
                    'webapp/assets/lib/simple-text-rotator/jquery.simple-text-rotator.min.js',
                    'webapp/assets/js/plugins.js',
                    'webapp/assets/components/color-selector.js',
                    'webapp/assets/js/main.js'
                ],
                dest: 'temp/app.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/webapp/assets/app.min.js': ['temp/app.js']
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            build: {
                src: [
                    "webapp/assets/lib/bootstrap/dist/css/bootstrap.min.css",
                    'webapp/assets/lib/animate.css/animate.css',
                    "webapp/assets/lib/components-font-awesome/css/font-awesome.min.css",
                    "webapp/assets/lib/et-line-font/et-line-font.css",
                    "webapp/assets/lib/flexslider/flexslider.css",
                    "webapp/assets/lib/owl.carousel/dist/assets/owl.carousel.min.css",
                    "webapp/assets/lib/owl.carousel/dist/assets/owl.theme.default.min.css",
                    "webapp/assets/lib/magnific-popup/dist/magnific-popup.css",
                    "webapp/assets/lib/simple-text-rotator/simpletextrotator.css",
                    "webapp/assets/css/style.css",
                    "webapp/assets/css/colors/default.css",
                    "webapp/assets/css/byaas-style.css" 
                ],
                dest: 'build/webapp/assets/css/style.min.css'
            }
        },
        processhtml: {
            build: {
                files: {
                  'build/webapp/index.html': ['build/webapp/index.html']
                }
              }
          },
        handlebars: {
            compile: {
              options: {
                namespace: 'JST'
              },
              files: {
                'webapp/assets/templates/templates.js': ['webapp/assets/templates/*.hbs']
              }
            }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['clean:build', 'concat', 'uglify','cssmin', 'copy:main', 'processhtml', 'clean:cleanup']);
};