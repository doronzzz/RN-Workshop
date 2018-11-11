import React from 'react';
import { Image,View,FlatList,TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail,Left,Body,Text} from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import { Font } from "expo";
import Client from 'shopify-buy';
const client = Client.buildClient({
  storefrontAccessToken: 'af8f6edb3c0d3975b0720090d1d4085e',
  domain: 'evexpress.myshopify.com'
});
import mockData from '../mockjson.json';
console.log(mockData);

export default class HomeScreen extends React.Component{
  
  constructor(props){
    super(props)
    this.state = { loading : true, products: mockData.items}
  }

  static navigationOptions = {
    title:"Shop",
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  _getItemImage(item){
      return(
        <View style={{width: 100, height: 50, backgroundColor: 'steelblue'}}>
            <Image style={{width: 100, height: 50}} source={{uri: item.image}}/>
         </View>
      )
  }

  _getItem(item,key){
      const { navigate } = this.props.navigation;
      return(
        <TouchableOpacity onPress={ () => navigate('Product', { product: item }) }>
          <Card style={{padding:10}}>
              <CardItem>
                  <Body style={{flex:1, alignItems:"center", justifyContent:"center" }}>
                    <Text>{item.title}</Text>
                    <Thumbnail source={{uri: item.image}} style={{height: 100, width:100, flex: 1,resizeMode: 'contain'}}/>
                  </Body>
              </CardItem>
            </Card>
        </TouchableOpacity>
      )
  }

  render() {
    if(!this.state.loading){
      return(
            <Container>
              <Content>
                <Grid>
                    <Col style={{ flex:1}}>
                      <FlatList
                        data={this.state.products}
                        keyExtractor={(id,index) => index+""}
                        renderItem={
                            ( {item,key} ) => {
                                return this._getItem(item,key)
                            }
                        }/>
                    </Col>
                </Grid>
              </Content>
            </Container>
      )
    }else{
      return null
    }
  }
}