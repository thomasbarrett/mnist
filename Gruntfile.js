module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    babel: {
       options: {
         presets: ["stage-1"],
         plugins: ["transform-react-jsx", "transform-es2015-modules-commonjs"]
       },
       dist: {
           files: [{
             expand: true,
             cwd: 'src/',
             src: ['*.js'],
             dest: 'dist/'
          }]
       }
   }

  })

  grunt.loadNpmTasks('grunt-babel');

  // Default task(s).
  grunt.registerTask('default', ['babel']);

};
