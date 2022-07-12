import {
  Container,
  Icon,
  Grid,
  GridRow,
  GridColumn,
  Header,
} from 'semantic-ui-react';
import Topics from '../components/Topics';
function Home() {
  // return  <Container><Icon name='users' /></Container>
  return (
    <Container>
      <Grid>
        <GridRow>
          <GridColumn width={3}>
            <Header>主題列表</Header>
            <Topics />
          </GridColumn>
          <GridColumn width={10}>文章列表</GridColumn>
          <GridColumn width={3}>空白</GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
}

export default Home;
