#!/usr/bin/env node

const path = require("path");
const colors = require('colors');
const { lstat, readdir } = require("fs-extra");

const targetDir = process.argv[2] || process.cwd()

readdir(targetDir, async (err, files) => {

    err &&
        console.error(err)

    const statPromises = files.map(file => {
        return lstat(path.join(targetDir, file))
    })

    const allStats = await Promise.all(statPromises)

    for (const [i, stat] of allStats.entries()) {

        if (!stat.isFile()) {
            console.log(colors.bold.blue(files[i] + '/'))
            continue
        }

        console.log(colors.white(files[i]))
    }
})