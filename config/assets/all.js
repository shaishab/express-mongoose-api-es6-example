module.exports = {
    nonJs: ['./package.json', './.gitignore'],
    gulpConfig: 'gulpfile.js',
    models: 'app/models/**/*.js',
    routes: 'app/routes/*.js',
    allJS: ['server.js', 'config/**/*.js', 'app/**/*.js', '!node_modules/**', '!gulpfile.js'],
    tests: './app/tests/*.js'
};