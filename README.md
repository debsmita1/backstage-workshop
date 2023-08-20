# Adding a component to the catalog


### Adding a new component to the Software Catalog

- Click on `Create` navigation item

- If you are starting from scratch, then select a template to get started:
  - Select the `Example Node.js Template` 
  - Enter `nodejs-app` in the `Name` field
  - Enter your GitHub Id in the `owner` field
  - Enter `nodejs-app` in the `Repository` field

  - To add more templates in the catalog, add the snippet below in the `app-config.local.yaml` and re-start the app 

    ```
    catalog:
    ...
    locations:
      ...
      - type: url
        target: https://github.com/janus-idp/software-templates/blob/main/showcase-templates.yaml
    ```

    The above action will add the templates contributed by the [Janus Community](https://janus-idp.io/gpts)

- If you already have an application, then click on `REGISTER EXISTING COMPONENT`
  - Enter the URL of your source code repository
  - Click on `Analyze` and hit `Import`
  
  The above action will add your existing application as a component in the Catalog Page


### Enabling TechDocs ([Backstage TechDocs configuration guide](https://backstage.io/docs/features/techdocs/getting-started))

- Clone the repo create by the Template

  ```
  git clone <Repository-URL>
  ```

- Navigate to the root of your repository

- Create a file named `mkdocs.yaml`, and add the following content 

  ```
  site_name: <provide a name for your application’s doc>

  nav:
    - Home: index.md
    - Guide:
      - Pre-requisites: application/guide.md

  plugins:
    - techdocs-core
  ```

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


### Add Quay Container Registry Plugin by Red Hat ([Backstage Marketplace](https://backstage.io/plugins/))

- Follow the steps [here](https://janus-idp.io/plugins/quay/) to integrate the front-end plugin in your Backstage instance
