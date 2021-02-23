const aws = require('aws-sdk')

const API = new aws.APIGateway({ 
    region: 'us-east-2',
    accessKeyId: 'AKIAQKZRTFGQDAROCXBU',
    secretAccessKey: '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'
})
const cognito = new aws.CognitoIdentityServiceProvider({ region: 'us-east-2' })

const generateApiKey = async (sub) => {
  return await new Promise((resolve, reject) => {
    const params = {
      name: `profileApi-${sub}`,
      enabled: true,
      generateDistinctId: true,
      stageKeys: [ 
        {
          restApiId: 'g1ssbxw172',
          stageName: 'dev',
        },
      ],
    }

    API.createApiKey(params, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

const addToPlan = async (keyId) => {
  return await new Promise((resolve, reject) => {
    const params = {
      keyId,
      keyType: 'API_KEY',
      usagePlanId: 'p3x9yk',
    }

    API.createUsagePlanKey(params, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

const saveApiKey = async (sub, apikey) => {
  return await new Promise((resolve, reject) => {
    const params = {
      UserAttributes: [
        {
          Name: 'custom:apiKey',
          Value: apikey,
        },
      ],
      Username: sub,
      UserPoolId: 'us-east-2_ITjABepe9',
    }

    cognito.adminUpdateUserAttributes(params, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

const main = async (event) => {
  console.log('Event:', event)

  if (event.triggerSource == 'PostConfirmation_ConfirmSignUp') {
    const { sub } = event.request.userAttributes
    const { id, value } = await generateApiKey(sub)
    console.log(id, value)
    await addToPlan(id)
    await saveApiKey(sub, value)
  }
  
  return event 
}

exports.handler = main
