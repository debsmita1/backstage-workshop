# Deploying an instance of Backstage using a Helm Chart

### Prerequisites

- [minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm CLI](https://helm.sh/docs/intro/install/)


### Backstage Helm Chart ([Helm Chart Link](https://artifacthub.io/packages/helm/backstage/backstage))

- Start your Docker Desktop

- Start your `minikube`

  ```
  minikube start
  ```

- Run the following commands to add the chart repositories

  ```
  helm repo add backstage https://backstage.github.io/charts
  helm repo add bitnami https://charts.bitnami.com/bitnami
  ```

- Run the following command to access the `minikube` dashboard

  ```
  minikube dashboard
  ```

- Create a `Secret` resource to store all your secrets in base64 encoded format

  - Convert your `Github token` to base64

    ```
    echo -n 'your-token' | base64
    ```

  - Click on the `+` on the top-right in your `minikube`. Copy the contents of the `my-backstage-secrets.yaml` file in this branch and paste the `secret` resource yaml in the yaml editor. Replace the passwords with your base64 strings and hit Upload

- Create `ConfigMap` resource to pass extra configuration to your Backstage instance

  - Run the following command to apply the ConfigMap resource in this branch

    ```
    kubectl create configmap my-app-config --from-file=app-config.extra.yaml=./local/path/to/your/app-config.extra.yaml -n backstage-workshop
    ```

    or 

  - Click on the `+` on the top-right in your `minikube`. Copy the contents of the `my-app-config.yaml` file in this branch and paste the contents into the yaml editor. Add the base URL of the app, backend, and cors origin to the application host URL. Hit Upload.

  Note: Every time you update the `ConfigMap` or the `Secret` resource after the Helm Chart is deployed, you need to restart the associated `Deployment` resource

- Create `values.yaml` file to pass the `Secret` and `ConfigMap` reference to the `Backstage` instance. Copy the contents of the `values.yaml` file in this branch

- Run the following command to install the helm chart

  ```
  helm install my-release backstage/backstage --values=values.yaml -n backstage-workshop
  ```

- Run the following command in another terminal to view the `Backstage` application and update the base URLs in the `Config Map` resource

  ```
  minikube service my-release-backstage -n backstage-workshop
  ```
