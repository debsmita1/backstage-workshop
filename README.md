# Creating a Frontend Plugin


### Create a Plugin ([Backstage's guide to create a new Plugin](https://backstage.io/docs/plugins/create-a-plugin))

1. Execute the following command from the root of your Backstage repo to create a new Plugin

    ```
    yarn new --select plugin
    ```

2. The wizard will ask for a Plugin id. Enter Id `my-frontend-plugin` and proceed

3. You can perform either of the following to run the plugin in isolation
  
    ```
    cd plugins/my-frontend-plugin
    yarn start
    ```
    or
  
    ```
    yarn workspace @backstage/plugin-my-frontend-plugin start # From the root directory
    ```

4. Embed your Plugin in the Entities page

    ```tsx title="packages/app/src/components/catalog/EntityPage.tsx"
    import {MyFrontendPluginPage} from '@internal/plugin-my-frontend-plugin';
  
    const serviceEntityPage = (
      <EntityPageLayout>
        ...
    
        <EntityLayout.Route path="/my-plugin" title="My FE Plugin">
          <MyFrontendPluginPage />
        </EntityLayout.Route>
  
        ...
      </EntityPageLayout>
    );
    ```

### Update the Plugin

1. Use Backstage's [proxy](https://backstage.io/docs/plugins/proxying) service to use the [GitHub API](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api) ([Guide to use Backstage Proxy](https://backstage.io/docs/tutorials/using-backstage-proxy-within-plugin/))

    1.1 Set-up the Backstage Proxy
    
        ```yaml title="app-config.local.yaml"
            proxy:
              ...
              '/github':
              target: 'https://api.github.com'
              headers:
                Authorization: 'token ${GITHUB_TOKEN}'  
        ```
    
    1.2 Update the `ExampleFetchComponent` to use the `GitHub API`. Replace the contents of the `ExampleFetchComponent.tsx` file with the `ExampleFetchComponent.tsx` file in this branch
