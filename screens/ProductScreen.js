import React from 'react';
import { StyleSheet, View ,Image} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Card, CardItem, Thumbnail,  Left, Right, Body, Icon, Text,Button} from 'native-base';
import { connect } from 'react-redux';
import { addToCart } from '../actions/actions.js';


class ProductScreen extends React.Component{
  static navigationOptions = {
    title:"Product",
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  render() {
    const product = this.props.navigation.getParam('product')
    const {navigate} = this.props.navigation;
    return(
      <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{product.title}</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                  <Image source={{uri: product.image}} style={{height: 300, width: 300, alignSelf: 'center',resizeMode: 'contain',flex: 1}}/>
                <Text>
                  {product.description}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button full onPress={ () => {this.props.addToCart(product); alert('Added To Cart')} }>
                   <Text>Add To Cart</Text>
                 </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({ });


export default connect(mapStateToProps, {
  addToCart,
})(ProductScreen);
