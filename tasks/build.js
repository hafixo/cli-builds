"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf = require("rimraf");
const path = require("path");
const webpack = require("webpack");
const app_utils_1 = require("../utilities/app-utils");
const webpack_config_1 = require("../models/webpack-config");
const utils_1 = require("../models/webpack-configs/utils");
const config_1 = require("../models/config");
const fs = require('fs');
const Task = require('../ember-cli/lib/models/task');
const SilentError = require('silent-error');
exports.default = Task.extend({
    run: function (runTaskOptions) {
        const config = config_1.CliConfig.fromProject().config;
        const app = app_utils_1.getAppFromConfig(runTaskOptions.app);
        const outputPath = runTaskOptions.outputPath || app.outDir;
        if (this.project.root === outputPath) {
            throw new SilentError('Output path MUST not be project root directory!');
        }
        if (config.project && config.project.ejected) {
            throw new SilentError('An ejected project cannot use the build command anymore.');
        }
        if (runTaskOptions.deleteOutputPath) {
            rimraf.sync(path.resolve(this.project.root, outputPath));
        }
        const webpackConfig = new webpack_config_1.NgCliWebpackConfig(runTaskOptions, app).buildConfig();
        const webpackCompiler = webpack(webpackConfig);
        const statsConfig = utils_1.getWebpackStatsConfig(runTaskOptions.verbose);
        return new Promise((resolve, reject) => {
            const callback = (err, stats) => {
                if (err) {
                    return reject(err);
                }
                this.ui.writeLine(stats.toString(statsConfig));
                if (runTaskOptions.watch) {
                    return;
                }
                if (!runTaskOptions.watch && runTaskOptions.statsJson) {
                    const jsonStats = stats.toJson('verbose');
                    fs.writeFileSync(path.resolve(this.project.root, outputPath, 'stats.json'), JSON.stringify(jsonStats, null, 2));
                }
                if (stats.hasErrors()) {
                    reject();
                }
                else {
                    resolve();
                }
            };
            if (runTaskOptions.watch) {
                webpackCompiler.watch({ poll: runTaskOptions.poll }, callback);
            }
            else {
                webpackCompiler.run(callback);
            }
        })
            .catch((err) => {
            if (err) {
                this.ui.writeError('\nAn error occured during the build:\n' + ((err && err.stack) || err));
            }
            throw err;
        });
    }
});
//# sourceMappingURL=/private/var/folders/lp/5h0nls311ws4fn75nn7kzz600037zs/t/angular-cli-builds11756-34955-heb2o6.8aqm9xjemi/angular-cli/tasks/build.js.map