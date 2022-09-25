import { setFailed, exportVariable, getInput } from '@actions/core'
import { exec, getExecOutput } from '@actions/exec'
import { saveCache, restoreCache } from '@actions/cache'

(async () => {
  try {
    const apiToken = getInput('apiToken')
    exportVariable('CLOUDFLARE_API_TOKEN', apiToken)

    const accountId = getInput('accountId')
    exportVariable('CLOUDFLARE_ACCOUNT_ID', accountId)

    exportVariable('API_CREDENTIALS', 'API Token')
    
    const version = getInput('wranglerVersion')

    const lib = await (await getExecOutput('npm bin -g')).stdout

    const key = await restoreCache([`${lib}/wrangler`], `wrangler-${version}`)
    
    if (!key) {
      if (version) await exec(`npm i -g "wrangler@${version}"`)
      else await exec('npm i -g wrangler')
    }
    
    await exec('echo $HOME')
    await exec('whereis wrangler')
    
    if (!key) await saveCache([`${lib}/wrangler`], `wrangler-${version}`)
  } catch (error: any) {
    setFailed(error)
  }
})()
