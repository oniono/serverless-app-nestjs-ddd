import * as cdk from '@aws-cdk/core';
import { Cognito } from './cognito.construct';
import { ApiConstruct } from './api.construct';

export class FreqServerlessApiStack extends cdk.Stack {
  // Apply default config here
  config = { hostedAuthDomainPrefix: 'my-auth-' + process.env.BRANCH_NAME };

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cognitoResources = new Cognito(this, 'Cognito', {
      hostedAuthDomainPrefix: this.config.hostedAuthDomainPrefix,
    });
    new ApiConstruct(this, 'ApiConstruct', {
      userPool: cognitoResources.userPool,
    });
  }
}
