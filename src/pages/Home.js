import { Container, Icon, Grid, GridRow, GridColumn } from 'semantic-ui-react';
import Topics from './Topics';
function Home() {
  // return  <Container><Icon name='users' /></Container>
  return (
    <Container>
      <Grid>
        <GridRow>
          <GridColumn width={3}>主題列表<Topics /></GridColumn>
          <GridColumn width={10}>文章列表</GridColumn>
          <GridColumn>空白</GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
}

export default Home;
