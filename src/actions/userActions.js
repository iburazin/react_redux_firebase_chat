import { userConstants } from "./constants";
import { firestore } from "firebase";

export const getRealtimeUsers = uid => {
  return async dispatch => {
    dispatch({ type: userConstants.GET_REALTIME_USERS_REQUEST });

    const db = firestore();
    const unsubscribe = db
      .collection("users")
      //.where("uid", "!=", uid)
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach(function (doc) {
          if (doc.data().uid != uid) {
            users.push(doc.data());
          }
        });
        //console.log(users);

        dispatch({
          type: userConstants.GET_REALTIME_USERS_SUCCESS,
          payload: { users }
        });
      });

    return unsubscribe;
  };
};

export const updateMessage = msgObj => {
  return async dispatch => {
    const db = firestore();
    db.collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date()
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getRealtimeConversations = user => {
  return async dispatch => {
    const db = firestore();
    db.collection("conversations")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot(querySnapshot => {
        const conversations = [];

        querySnapshot.forEach(doc => {
          if ((doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2) || (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)) {
            conversations.push(doc.data());
          }
        });

        dispatch({
          type: userConstants.GET_REALTIME_MESSAGES_SUCCESS,
          payload: { conversations }
        });

        console.log(conversations);
      });
  };
};
