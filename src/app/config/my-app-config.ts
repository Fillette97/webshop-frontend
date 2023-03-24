export default {
// for testing locally
  oidc: {
    clientId: '0oa3m8l7vh6FkE3gK5d7',
    issuer: 'https://dev-67169164.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid','profile','email']
  }

  // oidc: {
  //   clientId: '0oa3m8l7vh6FkE3gK5d7',
  //   issuer: 'https://dev-67169164.okta.com/oauth2/default',
  //   redirectUri: 'https://webshop-frontend-ivory.vercel.app/login/callback',
  //   scopes: ['openid','profile','email']
  // }

  //backup okta config if okta old subscription too full
  // oidc: {
  //   clientId: '0oa7xphez14V04V2N5d7',
  //   issuer: 'https://dev-64446661.okta.com/oauth2/default',
  //   redirectUri: 'http://localhost:4200/login/callback',
  //   scopes: ['openid','profile','email']
  // }
}
