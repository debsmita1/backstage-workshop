# Adding a component to the catalog

### Prerequisites

- [pip3](https://www.activestate.com/resources/quick-reads/how-to-install-and-use-pip3/)

### Adding a new component to the Software Catalog

- Click on `Create` navigation item

- Select a template to get started:

  - To add more templates in the catalog, add the following URL in the `app-config.yaml` under `catalog.locations` and re-start the app

    ```
    catalog:
      ...
      locations:
        ...
        - type: url
          target: https://github.com/backstage/backstage/blob/master/plugins/scaffolder-backend/sample-templates/remote-templates.yaml
          rules:
            - allow: [Template]
      ```
  - Select the `Create React App Template`
  - Enter `backstage-workshop` in the `Name` field
  - Enter `This is a react application` in the Description field
  - Enter your name in the `owner` field
  - Enter `react-app` in the `Repository` field
  - Once the scaffolder repository is created go to the catalog-info.yaml file in your repository, and add the following catalog entity URL in the `app-config.yaml` under `catalog.locations`

    ```
    catalog:
      ...
      locations:
        ...
        - type: url
          target: https://github.com/debsmita1/react-app/blob/master/catalog-info.yaml # Replace this with your entity file URL
          rules:
            - allow: [Component]
    ```


### Enabling TechDocs ([Backstage TechDocs configuration guide](https://backstage.io/docs/features/techdocs/getting-started))

- Run the following command to install `mkdocs-techdocs-core` package

  ```
  pip3 install mkdocs-techdocs-core
  ```

- Make the following change in the `app-config.yaml` and restart the app

  ```yaml app-config.yaml
    techdocs:
      builder: "local" # Alternatives - 'external'
      generator:
        runIn: "local" # Alternatives - 'local'
      publisher:
        type: "local" # Alternatives - 'googleGcs' or 'awsS3'. Read documentation for using alternatives.
  ```

- Restart the app to view the documentation site

### Configuring Authentication in Backstage ([Backstage Authentication guide](https://backstage.io/docs/auth/))

- To add GitHub authentication, create OAuth App from the GitHub [developer settings](https://github.com/settings/developers). Use the below values for setting up OAuth

  ```
  Application name: Backstage // or your custom app name
  Homepage URL: http://localhost:3000 // should point to the Backstage Frontend
  Authorization callback URL: http://localhost:7007/api/auth/github/handler/frame // should point to the Backstage Backend
  ```

- Add the following block under the `auth` section in the `app-config.yaml` to configure the GitHub Provider

  ```yaml title=app-config.local.yaml
    auth:
      environment: development
      providers:
        github:
          development:
            clientId: ${AUTH_GITHUB_CLIENT_ID}
            clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
  ```

- Create the Sign-In Page. Make the following changes in the `App.tsx` file

  ```tsx title=packages/app/src/App.tsx

    import { githubAuthApiRef } from '@backstage/core-plugin-api';
    import { SignInPage } from '@backstage/core-components';

    const app = createApp({
      ...
      components: {
        SignInPage: props => (
          <SignInPage
            {...props}
            auto
              providers={[
                  'guest',
                {
                id: 'github-auth-provider',
                title: 'GitHub',
                message: 'Sign in using GitHub',
                apiRef: githubAuthApiRef,
                },
              ]}
            />
         ),
        },
      ...
    });

  ```

### Add the Kubernetes Plugin ([Backstage Kubernetes Plugin](https://backstage.io/docs/features/kubernetes/))

- Add the following configuration in the `app-config.yaml` file

  ```
  kubernetes:
    serviceLocatorMethod:
      type: 'multiTenant'
    clusterLocatorMethods:
    - type: 'config'
      clusters:
        - url: <cluster-url>
          name: <cluster-name>
          authProvider: 'serviceAccount'
          skipTLSVerify: true
          skipMetricsLookup: true
          serviceAccountToken: ${CLUSTER_TOKEN}
  ```

- Follow the [installation](https://backstage.io/docs/features/kubernetes/installation) steps
  
- Add the following in your entity's `catalog-info.yaml` file

  ```yaml title=catalog-info.yaml
     annotations:
       ...
       backstage.io/kubernetes-id: backstage-workshop
     spec:
       type: service
  ```

### Add Red Hat's Topology Plugin ([Backstage Marketplace](https://backstage.io/plugins/))

- Follow the steps [here](https://janus-idp.io/plugins/topology/) to integrate the front-end plugin in your Backstage instance
  
