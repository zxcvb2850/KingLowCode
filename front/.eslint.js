module.export = {
  plugins: ["react-hooks"],
  extends: ["react-app", "react-app/jest"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "useRecoilCallback",
      },
    ],
  },
};
