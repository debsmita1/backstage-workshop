# Setting up Backstage locally

### Backstage Installation ([Backstage getting started guide](https://backstage.io/docs/getting-started/#create-your-backstage-app))

- Execute the following command to set up an instance of Backstage in your local

  ```
  npx @backstage/create-app@latest
  ```

- The wizard will ask for the name of the app which will also be the name of your folder

  ```
  backstage-app
  ```

- Once the installation is successful navigate to your backstage folder

- Execute the following steps to start the app

  ```
  cd <backstage-folder>
  yarn dev
  ```


### Set-up GitHub Integration ([Backstage GitHub integration guide](https://backstage.io/docs/getting-started/configuration#setting-up-a-github-integration))

- Create your Personal Access Token by opening the [GitHub token creation page](https://github.com/settings/tokens/new)

- Select the following and generate the token.
  ```
  read:org
  read:user
  user:email
  repo
  workflow
  ```

- Export your GitHub token

  ```
  export GITHUB_TOKEN=<your-github-token>
  ```

- Add the following snippet in the `app-config.local.yaml` file

  ```
  integrations:
    ...
    github:
      - host: github.com
        token: ${GITHUB_TOKEN} # This should be the token from GitHub which will look like ghp_urtokendeinfewinfiwebfweb
  ```
