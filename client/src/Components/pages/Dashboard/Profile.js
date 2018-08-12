import React, { Component } from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';

const styles = {
  formTop: {
    marginBottom: '70px'
  },
  h2: {
    marginLeft: '20px',
    marginBottom: '30px'
  }
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
  }
  render() {
    const { user } = this;
    return (
      <Container>
        <Row>
          <div style={styles.h2}>
            <h2>Welcome, {sessionStorage.getItem('firstName')}</h2>
          </div>
          <Col md="8" className="offset-md-2">
            <form style={styles.formTop}>
              <p className="h5 text-center mb-4">Adjust Your Profile</p>
              <div className="grey-text">
                <Input
                  label="First name"
                  value={user.firstName}
                  icon="user"
                  group
                  type="text"
                />
                <Input
                  label="Last Name"
                  value={user.lastName}
                  icon="user"
                  group
                  type="text"
                />
                <Input
                  label="Your email"
                  value={user.email}
                  icon="envelope"
                  group
                  type="email"
                />
              </div>
              <div>
                <Button color="primary" data-id={user.id}>
                  Update Profile
                </Button>
              </div>
            </form>
            <form>
              <p className="h5 text-center mb-4">Change Your Password</p>
              <div className="grey-text">
                <Input label="New Password" icon="lock" group type="password" />
                <Input
                  label="Confirm Password"
                  icon="lock"
                  group
                  type="password"
                />
                <Button color="primary">Update Password</Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}
