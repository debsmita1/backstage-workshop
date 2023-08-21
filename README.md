# Creating a Front-end Plugin


### Create a Plugin ([Backstage's guide to create a new Plugin](https://backstage.io/docs/plugins/create-a-plugin))

- Execute the following command from the root of your Backstage repo to create a new Plugin

  ```
  yarn new --select plugin
  ```

- The wizard will ask for a Plugin id. Enter Id `my-frontend-plugin` and proceed

- You can perform either of the following to run the plugin in isolation
  
  ```
  cd plugins/my-frontend-plugin
  yarn start
  ```
  or

  ```
  yarn workspace @backstage/plugin-my-frontend-plugin start # From the root directory
  ```

- Embed your Plugin in the Entities page

  ```tsx title="packages/app/src/components/catalog/EntityPage.tsx"
  import { TopologyPage } from '@janus-idp/backstage-plugin-topology';

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

- Use Backstage's [proxy](https://backstage.io/docs/plugins/proxying) service to use the `GitHub API` ([Guide to use Backstage Proxy](https://backstage.io/docs/tutorials/using-backstage-proxy-within-plugin/))

  - Set-up the Backstage Proxy
  
    ```yaml title="app-config.local.yaml"
    proxy:
      ...
      '/github':
      target: 'https://api.github.com'
      headers:
        Authorization: 'token ${GITHUB_TOKEN}'  
    ```
  
  - Update the `ExampleFetchComponent` to use the `GitHub API`. Replace the contents of the component with the following

    ```tsx title="ExampleFetchComponent.tsx"
    import React from 'react';
    import { makeStyles } from '@material-ui/core/styles';
    import { Table, TableColumn, Progress, ResponseErrorPanel } from '@backstage/core-components';
    import useAsync from 'react-use/lib/useAsync';
    import { discoveryApiRef, useApi } from '@backstage/core-plugin-api';

    export const DenseTable = ({ users }: any) => {

      const columns: TableColumn[] = [
        { title: 'Name', field: 'githubId' },
        { title: 'Repository URL', field: 'repoUrl' },
        { title: 'Type', field: 'type' },
      ];

      const data = users.map((user: any) => {
        return {
          githubId: user.login,
          repoUrl: user.url,
          type: user.type,
        };
      });

      return (
        <Table
          title="Github Users"
          options={{ search: false, paging: false }}
          columns={columns}
          data={data}
        />
      );
    };


    export const ExampleFetchComponent = () => {

      const discoveryApi = useApi(discoveryApiRef);
      const proxyURL = discoveryApi.getBaseUrl('proxy');


      const { value, loading, error } = useAsync(async (): Promise<User[]> => {
        const res = await fetch(`${await proxyURL}/github/users`)
        const users= await res.json();
        return users;
      }, []);

      if (loading) {
        return <Progress />;
      } else if (error) {
        return <ResponseErrorPanel error={error} />;
      }

      return <DenseTable users={value || []} />;
    };

    ```

