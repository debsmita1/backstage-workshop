# Adding a component to the catalog

### Prerequisites

- [pip3](https://www.activestate.com/resources/quick-reads/how-to-install-and-use-pip3/)

### Set-up GitHub Integration ([Backstage GitHub integration guide](https://backstage.io/docs/getting-started/configuration#setting-up-a-github-integration))

1. Create your Personal Access Token by opening the [GitHub token creation page](https://github.com/settings/tokens/new)

2. Select the following and generate the token.
   
  ```
  read:org
  read:user
  user:email
  repo
  workflow
  ```

3. Export your GitHub token

    ```
    export GITHUB_TOKEN=<your-github-token>
    ```

4. Add the following snippet in the `app-config.local.yaml` file

    ```
    integrations:
      ...
      github:
        - host: github.com
          token: ${GITHUB_TOKEN} # This should be the token from GitHub which will look like ghp_urtokendeinfewinfiwebfweb
    ```

### Adding a new component to the Software Catalog

1. Click on `Create` navigation item

2. Select a template to get started:

    2.1. To add more templates in the catalog, add the following URL in the `app-config.yaml` under `catalog.locations` and re-start the app

        catalog:
          ...
          locations:
            ...
            - type: url
              target: https://github.com/backstage/backstage/blob/master/plugins/scaffolder-backend/sample-templates/remote-templates.yaml
              rules:
                - allow: [Template]
    
    2.2. Select the `Create React App Template`
   
    2.3. Enter `backstage-workshop` in the `Name` field
   
    2.4. Enter `This is a react application` in the Description field
   
    2.5. Enter your name in the `owner` field
   
    2.6. Enter `react-app` in the `Repository` field
   
    2.7. Once the scaffolder repository is created go to the catalog-info.yaml file in your repository, and add the following catalog entity URL in the `app-config.yaml` under `catalog.locations`

        
        catalog:
          ...
          locations:
            ...
            - type: url
              target: https://github.com/debsmita1/react-app/blob/master/catalog-info.yaml # Replace this with your entity file URL
              rules:
                - allow: [Component]
        


### Enabling TechDocs ([Backstage TechDocs configuration guide](https://backstage.io/docs/features/techdocs/getting-started))

1. Run the following command to install `mkdocs-techdocs-core` package

    ```
    pip3 install mkdocs-techdocs-core
    ```

2. Make the following change in the `app-config.yaml` and restart the app

    ```yaml app-config.yaml
      techdocs:
        builder: "local" # Alternatives - 'external'
        generator:
          runIn: "local" # Alternatives - 'local'
        publisher:
          type: "local" # Alternatives - 'googleGcs' or 'awsS3'. Read documentation for using alternatives.
    ```

3. Restart the app to view the documentation site

### Configuring Authentication in Backstage ([Backstage Authentication guide](https://backstage.io/docs/auth/))

1. To add GitHub authentication, create OAuth App from the GitHub [developer settings](https://github.com/settings/developers). Use the below values for setting up OAuth

    ```
    Application name: Backstage // or your custom app name
    Homepage URL: http://localhost:3000 // should point to the Backstage Frontend
    Authorization callback URL: http://localhost:7007/api/auth/github/handler/frame // should point to the Backstage Backend
    ```

2. Add the following block under the `auth` section in the `app-config.yaml` to configure the GitHub Provider

    ```yaml title=app-config.local.yaml
      auth:
        environment: development
        providers:
          github:
            development:
              clientId: ${AUTH_GITHUB_CLIENT_ID}
              clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
    ```

3. Create the Sign-In Page. Make the following changes in the `App.tsx` file

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

1. Add the following configuration in the `app-config.yaml` file

    ```
    kubernetes:
      serviceLocatorMethod:
        type: 'multiTenant'
      clusterLocatorMethods:
      - type: 'config'
        clusters:
          - url: 'https://api.cluster-vfdzg.vfdzg.sandbox2317.opentlc.com:6443'
            name: Openshift
            authProvider: 'serviceAccount'
            skipTLSVerify: true
            skipMetricsLookup: true
            serviceAccountToken: sha256~Ck87QpOwIKCQqODTtwis3i0R4_Zdf0zNbPwBuG0Sjuo
    ```

2. Follow the [installation](https://backstage.io/docs/features/kubernetes/installation) steps
  
3. Add the following in your entity's `catalog-info.yaml` file

    ```yaml title=catalog-info.yaml
       annotations:
         ...
         backstage.io/kubernetes-id: backstage-workshop
       spec:
         type: service
    ```

### Add Red Hat's Topology Plugin ([Backstage Marketplace](https://backstage.io/plugins/))

1. Follow the steps [here](https://janus-idp.io/plugins/topology/) to integrate the front-end plugin in your Backstage instance
  
