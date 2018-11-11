import React from 'react';
import { StyleSheet, View,FlatList, SafeAreaView,StatusBar,Platform,Image} from 'react-native';
import { Container, Content,Button, Card, CardItem, Thumbnail,Left,Right, Body,Text, Col, Grid,Header,Title,SwipeRow,Icon} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeFromCart,addToCart } from '../actions/actions.js';

class CartScreen extends React.Component{

  _getItem(item,key){
    return (
      <SwipeRow key={key}
        rightOpenValue={-75}
        body={
          <Container style={styles.row}>
           <Left>
                <Body>
                  <Image style={{width: 100, height:100,resizeMode: 'contain'}} source={{uri: item.image}}/>
                </Body>
            </Left>
              <Text>{item.title}</Text>
          </Container>
        }
        right={
          <Button danger onPress={() => {
              this.props.removeFromCart(item);
              alert('Removed From Cart')
            } }>
            <Icon active name="trash" />
          </Button>
        }/>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    const btnTitle = `My Cart ${this.props.cart.length}`;
    console.log(this.props.cart)
    return (
          <Container>
            <Header style={styles.header}>
            <Body>
              <Title style={{"color":"#fff"}}>Cart</Title>
            </Body>
          </Header>
            <Content scrollEnabled={true}>
                    {
                      (this.props.cart.length > 0) ? 
                      <Grid>
                        <Col style={{ flex:1  }}>
                          <FlatList
                          data={this.props.cart}
                          keyExtractor={(index) => index+Math.random(1000)}
                          renderItem={
                              ( {item,key} ) => {
                                console.log('item' + item)
                                console.log(item)
                                console.log('key' + item)
                                console.log(key)
                                  return this._getItem(item,key)
                              }
                          }/>
                        </Col>
                      </Grid>
                      :
                      <Text style={styles.placeholder}>The Cart Is Empty</Text>
                  }
            </Content>
          </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS !== 'ios') ? (StatusBar.currentHeight) : null, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "#f4511e",
    //paddingTop: StatusBar.currentHeight
  },
  row:{
    height:50,
    flex:1,
    padding:10,
  },
  placeholder:{
    flex:1,
    fontSize:20,
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    paddingTop:50
  }
})

const mapStateToProps = (state) => {
  return { cart: state.mainReducer.cart };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    removeFromCart,
    addToCart,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
