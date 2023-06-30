# Backstage Workshop

**Minikube Setup:**
- Install [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- Start the [Docker desktop](https://docs.docker.com/desktop/install/mac-install/)
- minikube start --driver=docker
- minikube config set driver docker
- kubectl cluster-info [This will give the Kubernetes control plane info]
- minikube dashboard [To view the Minikube dashboard]

**Configure K8s integration:**
- Create a namespace: `kubectl create namespace backstage-worskshop`
- Create Service Account: `kubectl create serviceaccount backstage-sa -n backstage-workshop`
- Create Token: `kubectl create token backstage-sa -n backstage-workshop`
- Create a Cluster Role: `kubectl apply -f ./backstage-cr.yaml`
- Create a Cluster Role Binding: `kubectl apply -f ./backstage-crb.yaml`
- Copy the Token in the kubernetes -> clusters -> service account token in the app-config.local.yaml
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
        serviceAccountToken: <token>

