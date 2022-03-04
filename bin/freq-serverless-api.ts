#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FreqServerlessApiStack } from '../lib/freq-serverless-api-stack';

const app = new cdk.App();
new FreqServerlessApiStack(app, 'FreqServerlessApiStack-${process.env.BRANCH_NAME}',
    {
        env: {
            account: process.env.AWS_TARGET_ACCOUNT_ID
        }
    });
