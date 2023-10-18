module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js', '.svg'],
        alias: {
          '@': './src/',
          '@/theme': './src/theme',
          '@/components': './src/components',
          '@/assets': './src/assets',
        },
      },
    ],
    'jest-hoist',
    'react-native-reanimated/plugin',
  ],
};
