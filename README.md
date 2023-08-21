# Creating a Backend Plugin


### Create a Plugin ([Backstage's guide to create a backend Plugin](https://backstage.io/docs/plugins/backend-plugin))

- Execute the following command from the root of your Backstage repo to create a backend Plugin

  ```
  yarn new --select backend-plugin
  ```

- The wizard will ask for a Plugin id. Enter Id `test` and proceed

- Run the following commands to start the backend plugin in standalone mode

  ```
  cd plugins/test-backend
  yarn start
  ```

- Run the following command in another terimal

  ```
  curl localhost:7007/test/health
  ```

  The above action should return `{"status":"ok"}`.


### Integrate the plugin in the Backstage backend

- Copy the plugin name in the newly created backend plugin's package.json

  ```
  yarn workspace backend add @internal/plugin-test-backend^0.1.0
  ```

- Create a new file named `packages/backend/src/plugins/test.ts`, and add the following to it

  ```tsx title=test.ts
  import { createRouter } from '@internal/plugin-test-backend';
  import { Router } from 'express';
  import { PluginEnvironment } from '../types';

  export default async function createPlugin(
    env: PluginEnvironment,
  ): Promise<Router> {
    return await createRouter({
      logger: env.logger,
    });
  }
  ```

- And finally, wire this into the overall backend router. Edit `packages/backend/src/index.ts`

  ```tsx title=index.ts
  import test from './plugins/test';
  ...
  async function main() {
    ...
    const testEnv = useHotMemoize(module, () => createEnv('test'));
    apiRouter.use('/test', await test(testEnv));
  ```

- Stress test your service. Run the following command from the root of the repository

  ```
  yarn dev
  ```

- From another terminal execute the following `curl` command

  ```
  curl localhost:7007/api/test/health
  ```

  The above action should return the same response as above `{"status":"ok"}`


### Reading Backstage configuration using the Config API ([Backstage's guide to read configuration](https://backstage.io/docs/conf/reading))

- Add the following in the `test.ts` file

  ```
  ...
  config: env.config,
  ```

- Copy the contents of the `router.ts` file in this branch and paste it in the `plugins/test-backend/src/service/router.ts` file of your backend plugin

- In the  `app-config.yaml` add the following configuration

  ```
  test-plugin:
    configA: "This is configA"
    configB: "This is configB"

  ```

- From another terminal execute the following `curl` command

  ```
  curl localhost:7007/api/test/config/configA
  ```

  The above action should return the same response as above `{"status":"ok","value":"This is configA"}`


### Discover other plugins using the Discover API

- Add the following in the `test.ts` file

  ```
  ...
  discovery: env.discovery,
  ```

- From another terminal execute the following `curl` command

  ```
  curl localhost:7007/api/test/user
  ```

  The above action should return the same response as above `{"status":"ok","value":"Debsmita Santra"}`


### Use the newly created service in your frontend Plugin

- Copy the contents of the `ExampleComponent.tsx` file in this branch and paste it in the `ExampleComponent.tsx` file in your frontend plugin path
