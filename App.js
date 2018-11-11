import React from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider, connect } from 'react-redux';
import  HomeScreen from './screens/HomeScreen';
import  ProductScreen from './screens/ProductScreen';
import  CartScreen from './screens/CartScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware, createNavigationReducer} from 'react-navigation-redux-helpers';
import mainReducer from './reducers/mainReducer';

const tabOps = {
  labelStyle: {
    fontSize: 12,
  },
  tabStyle: {
    width: 100,
  },
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : '-outline'}`;
      } else if (routeName === 'Cart') {
        iconName = `ios-cart${focused ? '' : '-outline'}`;
      } else if (routeName === 'Profile') {
        iconName = `ios-contact${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Product : { screen: ProductScreen }
})

const AppNavigator = createBottomTabNavigator({
  Home: { screen: HomeStack },
  Cart: { screen: CartScreen }
}, tabOps);

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  mainReducer: mainReducer
});

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const App = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
  appReducer,
  applyMiddleware(middleware),
);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Root;