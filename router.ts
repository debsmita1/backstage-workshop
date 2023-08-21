import { errorHandler, PluginEndpointDiscovery } from '@backstage/backend-common';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

export interface RouterOptions {
  logger: Logger;
  config?: Config;
  discovery?: PluginEndpointDiscovery;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config, discovery } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  // use Config API
  router.get('/config/:configId', (request, response) => {
    logger.info('Read config');
    const {configId} = request.params;
    const cfg = config.get(`test-plugin.${configId}`)
    response.json({ status: 'ok' , value: cfg});
  });

  // use Discovery API
  router.get('/user', async (_, res) => {
    const authUrl = await discovery.getExternalBaseUrl('proxy');
    const response = await fetch(`${authUrl}/github/user`);
    const data = await response.json();

    res.send({ response: data.name });
  });

  router.use(errorHandler());
  return router;
}
