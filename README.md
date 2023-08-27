# Adding a component to the catalog

### Prerequisites

- [pip3](https://www.activestate.com/resources/quick-reads/how-to-install-and-use-pip3/)

### Adding a new component to the Software Catalog

- Click on `Create` navigation item

- If you are starting from scratch, then select a template to get started:

  - Select the `Example Node.js Template`
  - Enter `nodejs-app` in the `Name` field
  - Enter your GitHub Id in the `owner` field
  - Enter `nodejs-app` in the `Repository` field

  - To add more templates in the catalog, add the following urls in the `app-config.local.yaml` under `catalog.locations` and re-start the app

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

- Clone the repo created by the Template

  ```
  git clone <Repository-URL>
  ```

- Navigate to the root of your repository and create a file named `mkdocs.yaml`. Copy the contents from the `mkdocs.yaml` file in this branch

- Create `docs` folder in the root of the repository

  ```
  mkdir docs
  ```

- Create the `index.md` and `application/guide.md` files and add contents to it.

- Update the component's entity description by adding the following annotation

  ```yaml title="deployment.yaml"
      ...
      metadata:
        ...
        annotations:
          ...
          backstage.io/techdocs-ref: dir:.

  ```

- Push the changes and refresh your entity to view the tech docs for your component.

### Configuring Authentication in Backstage ([Backstage Authentication guide](https://backstage.io/docs/auth/))

- To add GitHub authentication, create OAuth App from the GitHub [developer settings](https://github.com/settings/developers). Use the below values for setting up OAuth

  ```
  Application name: Backstage (or your custom app name)
  Homepage URL: http://localhost:3000
  Authorization callback URL: http://localhost:7007/api/auth/github/handler/frame
  ```

- Add the following block under the `auth` section in the `app-config.local.yaml` to configure the GitHub Provider

  ```yaml title=app-config.local.yaml
    auth:
      environment: development
      providers:
        github:
          development:
            clientId: ${AUTH_GITHUB_CLIENT_ID}
            clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
  ```

- Create the Sign-In Page

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

- Start the Docker Desktop

- Start the minikube

  ```
  minikube start --driver=docker
  ```

- Create a namespace

  ```
  kubectl create namespace backstage-workshop
  ```

- Create Service Account

  ```
  kubectl create serviceaccount backstage-sa -n backstage-workshop
  ```

- Create a Token

  ```
  kubectl create token backstage-sa -n backstage-workshop
  ```

- Create a Cluster Role

  ```
  kubectl apply -f ./backstage-cr.yaml
  ```

- Create a Cluster Role Binding

  ```
  kubectl apply -f ./backstage-crb.yaml
  ```

- Deploy the hello-app application

  ```
  kubectl apply -f ./deploy-hello-app.yaml
  ```

- Add the Token to the environment variables

  ```
  export K8S_MINIKUBE_TOKEN=<token>
  ```

- To get the Kubernetes control plane info

  ```
  kubectl cluster-info
  ```

- Add the following snippet in the `app-config.local.yaml` file

  ```
  ...
  kubernetes:
    serviceLocatorMethod:
      type: 'multiTenant'
    clusterLocatorMethods:
    - type: 'config'
      clusters:
        - url: <k8s-control-plane>
          name: minikube
          authProvider: 'serviceAccount'
          skipTLSVerify: true
          skipMetricsLookup: true
          serviceAccountToken: ${K8S_MINIKUBE_TOKEN}
  ```

- To view the Minikube dashboard

  ```
  minikube dashboard
  ```

- Follow the [installation](https://backstage.io/docs/features/kubernetes/installation) steps 

### Add Quay Container Registry Plugin by Red Hat ([Backstage Marketplace](https://backstage.io/plugins/))

- Follow the steps [here](https://janus-idp.io/plugins/quay/) to integrate the front-end plugin in your Backstage instance
