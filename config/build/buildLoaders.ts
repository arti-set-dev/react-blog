import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const fontLoader = {
        test: /\.(woff|woff2)$/i,
    }

    const fileLoader = {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
    }

    const styleLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
                modules: {
                    auto: (resPath: string) => Boolean(resPath.includes('.module')),
                    localIdentName: options.isDev
                    ? '[name]--[hash:base64:5]'
                    : '[hash:base64:5]'
                },
            }
          },
          "sass-loader",
        ],
    }

    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        tsLoader,
        styleLoader,
        fontLoader,
        fileLoader
    ]
}