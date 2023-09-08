import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    entry: {
        'index.js': './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name]',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            // '/SRC': path.resolve(__dirname, 'src/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/, /\.test\./i],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.webpack.json',
                            // transpileOnly: true,
                        }
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        moduleIds: 'deterministic',
        innerGraph: true,
        concatenateModules: true
    },
};

export default config;