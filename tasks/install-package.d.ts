/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { logging } from '@angular-devkit/core';
import { PackageManager } from '../lib/config/schema';
export declare function installPackage(packageName: string, logger: logging.Logger, packageManager?: PackageManager, extraArgs?: string[], global?: boolean): void;
export declare function installTempPackage(packageName: string, logger: logging.Logger, packageManager?: PackageManager): string;
export declare function runTempPackageBin(packageName: string, logger: logging.Logger, packageManager?: PackageManager, args?: string[]): number;
