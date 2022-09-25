import { setFailed, exportVariable, getInput } from '@actions/core'
import { mkdirP } from '@actions/io'
import { exec } from '@actions/exec'

(async () => {
  try {
    const apiToken = getInput('apiToken')
    exportVariable('CLOUDFLARE_API_TOKEN', apiToken)

    const accountId = getInput('accountId')
    exportVariable('CLOUDFLARE_ACCOUNT_ID', accountId)

    exportVariable('API_CREDENTIALS', 'API Token')

    await mkdirP('./github/workspace/.wrangler')
  
    const version = getInput('wranglerVersion')
    if (!version) await exec('npm i -g wrangler')
    else await exec(`npm i -g "wrangler@${version}"`)
  } catch (error: any) {
    setFailed(error)
  }
})()
