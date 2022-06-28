#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'


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
            console.log(files[index])
        } else {
            console.log(chalk.bold(files[index]))
        }
    }
})