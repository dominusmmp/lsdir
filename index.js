#!/usr/bin/env node

const path = require("path");
const colors = require("colors");
const { lstat, readdir } = require("fs-extra");

const targetDir = process.argv[2] || process.cwd()

readdir(targetDir, async (err, files) => {

    err &&
        console.error(err)

    for (const file of files) {

        isDir = (await lstat(path.join(targetDir, file))).isDirectory()

        if (isDir) {
            console.log(colors.bold.blue(file + '/'))
            continue
        }

        console.log(colors.white(file))
    }
})