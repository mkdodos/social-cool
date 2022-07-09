import { Card, Icon, Container } from 'semantic-ui-react';

function NewPost() {
  return (
    <Container>
      <Card>
        <Card.Content>
          <Card.Header>Mark</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    </Container>
  );
}

export default NewPost;
