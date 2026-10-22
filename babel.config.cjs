module.exports = {
  plugins: [
    ['babel-plugin-istanbul', { exclude: ['src/tests/**'] }]
  ],
  presets: [
    ['@babel/preset-env', { targets: { chrome: '120' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
}