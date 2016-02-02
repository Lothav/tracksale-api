'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'source/js/**/*.js'
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    'js/api.min.js': ['source/js/**/*.js']
                }
            }
        },
        sass: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'source/sass',
                        src: ['**/*.scss'],
                        dest: 'dist/css',
                        ext: '.css'
                    }
                ],
                options: {
                    sourcemap: 'none'
                }
            }
        },
        cssmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'dist/css/min',
                        ext: '.min.css'
                    }
                ]
            }
        },
        concat_css: {
            'css/api.min.css': ['dist/css/min/**/*.css']
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_js_hint_notifications: 50,
                title: 'Notifications'
            }
        },
        notify: {
            css: {
                options: {
                    title: 'CSS',
                    message: 'CSS ok!'
                }
            },
            js: {
                options: {
                    title: 'JavaScript',
                    message: 'JS ok!'
                }
            },
            sass: {
                options: {
                    title: 'SASS',
                    message: 'SASS ok!'
                }
            }
        },
        watch: {
            js: {
                files: [
                    'source/js/**/*.js'
                ],
                tasks: [
                    'jshint:all',
                    'uglify:dist',
                    'notify:js'
                ]
            },
            css: {
                files: [
                    'source/css/**/*.css'
                ],
                tasks: [
                    'cssmin:dist',
                    'concat_css',
                    'notify:css'
                ]
            },
            scss: {
                files: ['source/sass/**/*.scss'],
                tasks: [
                    'sass:dist',
                    'cssmin:dist',
                    'concat_css',
                    'notify:sass'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'jshint:all',
        'uglify:dist',
        'notify:js',
        'sass:dist',
        'cssmin:dist',
        'concat_css',
        'notify:css'
    ]);
};