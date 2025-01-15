// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// // import { psychicsReducer} from "./reducers/psychicsReducers";
// //  import { psyAboutReducer } from "./reducers/aboutReducers";
// import { chatReducer } from './reducers/chatReducers';
// import { psyauthReducer, psyReducer } from './reducers/psyauthReducer';
// import {authReducer, userReducer} from './reducers/authReducers';
// import { messageReducer } from './reducers/messageReducers';

// const reducer = combineReducers({
//    // psyabout: psyAboutReducer,
//    // psychics: psychicsReducer,
   
//    chat: chatReducer,
//    messages: messageReducer,
//    psyauth:psyauthReducer,
//    user:userReducer,
//    auth: authReducer
// });


// let initialState = {}

// const middleware = [thunk];
// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// export default store;