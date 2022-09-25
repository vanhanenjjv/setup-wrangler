import { setFailed, exportVariable, getInput } from '@actions/core'
import { exec } from '@actions/exec'
import { saveCache, restoreCache } from '@actions/cache'

(async () => {
  try {
    const apiToken = getInput('apiToken')
    exportVariable('CLOUDFLARE_API_TOKEN', apiToken)

    const accountId = getInput('accountId')
    exportVariable('CLOUDFLARE_ACCOUNT_ID', accountId)

    exportVariable('API_CREDENTIALS', 'API Token')
    
    const version = getInput('wranglerVersion')

    const key = await restoreCache(['/usr/local/bin/wrangler'], `wrangler-${version}`)
    
    if (key && !version) await exec('npm i -g wrangler')
    else await exec(`npm i -g "wrangler@${version}"`)

    await exec('echo $HOME')
    await exec('whereis wrangler')
    
    if (!key) await saveCache(['/usr/local/bin/wrangler'], `wrangler-${version}`)
  } catch (error: any) {
    setFailed(error)
  }
})()
