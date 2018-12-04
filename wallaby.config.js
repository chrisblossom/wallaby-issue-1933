'use strict';

module.exports = (wallaby) => {
    var babelConfig = require('./.babelrc');

    return {
        files: [
            { pattern: '.babelrc+(.js|)', instrument: false },
            { pattern: 'tsconfig.json', instrument: false },
            'src/**/*.ts',
            'jest.config.js',
            '.env',
            '*/**/__snapshots__/*.snap',
            '!src/**/*.test.ts',
        ],

        tests: [
            'src/**/*.test.ts',
        ],

        compilers: {
            '**/*.ts': wallaby.compilers.babel(babelConfig),
        },

        hints: {
            ignoreCoverage: /ignore coverage/,
        },

        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',

        setup: (w) => {
            /**
             * https://github.com/wallabyjs/public/issues/1268#issuecomment-323237993
             */
            if (w.projectCacheDir !== process.cwd()) {
                process.chdir(w.projectCacheDir);
            }

            process.env.NODE_ENV = 'test';
            const jestConfig = require('./jest.config');

            w.testFramework.configure(jestConfig);
        },
    };
};
