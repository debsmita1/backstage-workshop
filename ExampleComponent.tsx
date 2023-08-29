import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { Grid } from '@material-ui/core';
import { discoveryApiRef, useApi } from '@backstage/core-plugin-api';
import { Header, Page, Content, HeaderLabel } from '@backstage/core-components';
import { ExampleFetchComponent } from '../ExampleFetchComponent';

export const ExampleComponent = () => {
  const discoveryApi = useApi(discoveryApiRef);
  const baseUrl = discoveryApi.getBaseUrl('test');
  const { value } = useAsync(async () => {
    const response = await fetch(`${await baseUrl}/user`);
    const data = await response.json();
    return data;
  }, []);

  return (
    <Page themeId="tool">
      <Header title="Welcome!">
        <HeaderLabel label="Owner" value={value?.value?.name || 'Owner'} />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <ExampleFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
