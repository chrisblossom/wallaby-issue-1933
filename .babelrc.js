'use strict';

const babel = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    node: '6.9.0',
                },
            },
        ],
        '@babel/typescript',
    ],
};

module.exports = babel;
