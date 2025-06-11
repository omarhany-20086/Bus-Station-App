module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
        },
      },
    ],
  ],
  plugins: [["@babel/plugin-transform-typescript", { isTSX: true }]],
};
