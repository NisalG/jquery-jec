/*jslint indent: 4*/
/*global module*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        copy: {
            dist: {
                expand: true,
                flatten: true,
                src: 'src/*',
                dest: 'dist/'
            }
        },
        uglify: {
            options: {
                mangle: false,
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/jquery-jec.min.js': [
                        'dist/jquery-jec.js'
                    ]
                }
            }
        },
        jslint: {
            all: {
                src: [
                    'src/*.js',
                    'test/*.js',
                    'Gruntfile.js'
                ]
            }
        },
        jshint: {
            all: [
                'src/*.js',
                'test/*.js',
                'Gruntfile.js'
            ]
        },
        jsonlint: {
            sample: {
                src: [
                    'package.json',
                    'bower.json'
                ]
            }
        },
        mocha: {
            all: {
                src: [
                    'test/*.html'
                ]
            },
            options: {
                run: true
            }
        },
        blanket: {
            instrument: {
                options: {},
                files: {
                    'src-cov/': ['src/']
                }
            }
        },
        blanket_mocha: {
            all: {
                src: [
                    'test/*.html'
                ],
                options: {
                    threshold: 100,
                    run: true
                }
            }
        },
        shell: {
            coveralls: {
                options: {
                    stderr: false
                },
                command: './node_modules/.bin/mocha --require blanket --reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-blanket');
    grunt.loadNpmTasks('grunt-blanket-mocha');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('test', ['jslint', 'jshint', 'jsonlint', 'mocha']);
    grunt.registerTask('cover', ['blanket_mocha']);
    grunt.registerTask('build', ['copy', 'uglify']);
    grunt.registerTask('default', ['build']);
};