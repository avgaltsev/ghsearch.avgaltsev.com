const path = require("path");

const less = require("less");

const PostcssExportsWebpackPlugin = require("postcss-exports-webpack-plugin").default;

const postcssExportsWebpackPlugin = new PostcssExportsWebpackPlugin({
	output: {
		filename: "main.css",
	}
});

module.exports = {
	mode: "production",

	entry: "./application/main.tsx",

	output: {
		path: path.resolve(__dirname, "public"),
		filename: "[name].js",
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
			},

			{
				test: /\.less$/,
				loader: postcssExportsWebpackPlugin.getLoader(),

				options: {
					preprocess: (source) => {
						return less.render(`@import "${path.resolve("./application/variables.less")}";${source}`).then((output) => {
							return output.css;
						});
					},
				},
			},
		],
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},

	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		"react-redux": "ReactRedux",
		"redux": "Redux",
		"redux-saga": "ReduxSaga",
	},

	plugins: [
		postcssExportsWebpackPlugin,
	],

	devServer: {
		contentBase: path.resolve(__dirname, "public"),
		port: 9000,
	}
};
