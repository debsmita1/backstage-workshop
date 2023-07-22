# Backstage Workshop

**Prerequisites for the workshop:**
- Node.js
- [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)
- [docker](https://docs.docker.com/engine/install/)
- [postgresql](https://www.postgresql.org/download/)
- [psql](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/) 

**Setup Minikube:**
- Install [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- Start the Docker desktop
- To start the minikube, run: `minikube start --driver=docker`
- To get the Kubernetes control plane info, run: `kubectl cluster-info`
- To view the Minikube dashboard, run: `minikube dashboard` 

**Configure K8s integration:**
- Create a namespace: `kubectl create namespace backstage-workshop`
- Create Service Account: `kubectl create serviceaccount backstage-sa -n backstage-workshop`
- Create Token: `kubectl create token backstage-sa -n backstage-workshop`
- Create a Cluster Role: `kubectl apply -f ./backstage-cr.yaml`
- Create a Cluster Role Binding: `kubectl apply -f ./backstage-crb.yaml`
- Add the Token in the environment variables `export K8S_MINIKUBE_TOKEN=<token>` [Perform this from the VSCode terminal]
- Copy the Kubernetes control plane info in the kubernetes -> clusters -> url

app-config.local.yaml
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

