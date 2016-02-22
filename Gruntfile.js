/**
 * Created by irfan.maulana on 2/19/2016.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: grunt.file.
                            expandMapping([
                                'src/**/*.js', '!src/**/*min.js'],
                                'build/',
                                {
                                    rename: function(destBase, destPath) {
                                        return destBase+destPath.replace('.js', '.min.js');
                                    }
                                }
                            )
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files : {
                expand : true,
                cwd : 'src/frontend/static/stylesheets/',
                src : ['**/*.css', '!**/*.min.css'],
                dest : 'build/src/frontend/static/stylesheets/',
                ext : '.min.css'
            },
            combine : {
                files: {
                    'build/src/frontend/static/stylesheets/all-combine-style.min.css':

                        [   'build/src/frontend/static/stylesheets/style.min.css',
                            'build/src/frontend/static/stylesheets/library/normalize.min.css',
                            'build/src/frontend/static/stylesheets/library/font-awesome.min.css',
                            'build/src/frontend/static/stylesheets/library/materialize.min.css',
                            'build/src/frontend/static/stylesheets/library/sweet-alert.min.css',
                            'build/src/frontend/static/stylesheets/library/animate.min.css']
                }
            }
        },

        concat: {
            js : {
                src : [
                    'src/frontend/static/javascripts/library/jquery-1.11.0.min.js',
                    'src/frontend/static/javascripts/library/angular.min.js',
                    'src/frontend/static/javascripts/library/angular-resource.min.js',
                    'build/src/frontend/static/javascripts/library/*.js',
                    'build/src/frontend/static/javascripts/app/*.js',
                    'build/src/frontend/static/javascripts/nativescript/*.js',
                ],
                dest : 'build/src/frontend/static/javascripts/all-combine-function.js'
            }
        }

    });

    // Load the plugin that provides the task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', [ 'uglify', 'cssmin', 'concat' ]);

};
