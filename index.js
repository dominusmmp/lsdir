#!/usr/bin/env node

const path = require("path");
const colors = require("colors");
const { lstat, readdir } = require("fs-extra");

const targetDir = process.argv[2] || process.cwd()

readdir(targetDir, async (err, files) => {

    err &&
        console.error(err)

    for (const [i, stat] of files.entries()) {

        isDir = (await lstat(stat)).isDirectory()

        if (isDir) {
            console.log(colors.bold.blue(files[i] + '/'))
            continue
        }

        console.log(colors.white(files[i]))
    }
})