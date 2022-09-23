import { setFailed, exportVariable, getInput } from '@actions/core'
import { mkdirP } from '@actions/io'
import { exec } from '@actions/exec'

(async () => {
  try {
    exportVariable('HOME', './github/workspace')
    exportVariable('WRANGLER_HOME', './github/workspace')

    await mkdirP('./github/workspace/.wrangler')
  
    const version = getInput('wranglerVersion')
    if (!version) await exec('npm i -g wrangler')
    else await exec(`npm i -g "wrangler@${version}"`)

    const apiToken = getInput('apiToken')
    exportVariable('CLOUDFLARE_API_TOKEN', apiToken)

    const accountId = getInput('accountId')
    exportVariable('CLOUDFLARE_ACCOUNT_ID', accountId)

    exportVariable('API_CREDENTIALS', 'API Token')

    const workingDirectory = getInput('workingDirectory')

    await exec('wrangler publish', undefined, {
      cwd: `./${workingDirectory}`
    })
  } catch (error: any) {
    setFailed(error)
  }
})()