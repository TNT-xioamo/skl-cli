const path = require('path')
const fs = require('fs-extra')
const chalk= require('chalk')
const Inquirer = require('inquirer')
const cwd = process.cwd()


class Creator {
  constructor(projectName, options) {
    this.projectName = projectName
    this.options = options
  }
  async create() {
    const isOverwrite = await this.handleDirectory()
    console.log('====================================');
    console.log(isOverwrite);
    console.log('====================================');
    if(!isOverwrite) return
    console.log('todo....')
  }
  async handleDirectory() {
    const targetDirectory = path.join(cwd, this.projectName)
    if (fs.existsSync(targetDirectory)) {
      if (this.options.force) {
        await fs.remove(targetDirectory)
      } else {
        let { isOverwrite } = new Inquirer.prompt([
          {
            name: 'isOverwrite',
            type: 'list',
            message: '是否强制覆盖已存在的同名目录？',
            choices: [
              { name: '覆盖', value: true },
              { name: '不覆盖', value: false },
            ]
          }
        ])
        if (isOverwrite) {
          await fs.remove(targetDirectory)
        } else {
          console.log(chalk.red.bold('创建终止'))
          return false
        }
      }
    }
    return true
  }
}

module.exports = async function(projectName, options) {
  const creator = new Creator(projectName, options)
  await creator.create()
}
