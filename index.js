#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const colors = require('colors');

const { lstat } = fs.promises
const targetDir = process.argv[2] || process.cwd()

fs.readdir(targetDir, async (err, files) => {
    if (err) {
        console.log(err)
    }

    const statPromises = files.map(file => {
        return lstat(path.join(targetDir, file))
    })

    const allStats = await Promise.all(statPromises)

    for (const stat of allStats) {
        const index = allStats.indexOf(stat)

        if (stat.isFile()) {
            console.log(colors.green(files[index]))
        } else {
            console.log(colors.bold.blue(files[index]))
        }
    }
})