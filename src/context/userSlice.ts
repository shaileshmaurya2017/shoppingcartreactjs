import { createSlice, nanoid } from "@reduxjs/toolkit";

/*const user = {
  id: "",
  text: "",
};*/

const initialState = {
  users: [{ id: "", username: "", role: "", token: "" }],
  cart: [{ productid: "", qty: "", price: "" }],
};
export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    addUser: (state, action) => {
      const user = {
        id: action.payload.id,
        username: action.payload.name,
        role: action.payload.role,
        token: action.payload.token,
      };
      //state.users.push(user);
      state.users = [user];
      console.log(state.users[1]);
    },
    removeUser: (state, action) => {
      //const id = action.payload;
      state.users = [];
    },
    addtocart: (state, action) => {
      //state.cart.productids;
      //state.users = [user];
      //console.log(state.cart.productids);
      const products = {
        productid: action.payload.id,
        qty: action.payload.qty,
        price: action.payload.price,
      };
      console.log(action.payload);
      let flag;
      if (state.cart.length > 0) {
        flag = state.cart.findIndex((product) => {
          return product.productid == action.payload.id;
        });
        console.log("flag" + flag);
      } else {
        state.cart = [...state.cart, products];
        flag = -2;
      }

      if (flag == -1) {
        console.log("flag" + flag);
        state.cart = [...state.cart, products];
      }
      if (flag >= 0) {
        state.cart[flag].qty = action.payload.qty;
      }

      console.log("flag" + flag);
      flag = -4;
      console.log(state.cart);
    },
    removefromcart: (state, action) => {
      //const id = action.payload;
      // state.cart.productids. =(action.payload.id);
      let flag;
      if (state.cart.length > 0) {
        flag = state.cart.findIndex((product) => {
          //   console.log("product.productid : " + product.productid);
          // console.log("action.payload.id : " + action.payload.id);
          /*  console.log(
            " product.productid == action.payload.id: " + product.productid ==
              action.payload.id
          ); */
          return product.productid == action.payload.id;
        });
        console.log("flag" + flag);
        if (flag >= 0) {
          state.cart[flag].qty = action.payload.qty;
          console.log("state.cart[flag].qty" + state.cart[flag].qty);
          if (state.cart[flag].qty == "0") {
            console.log("state.cart[flag].qty" + state.cart[flag].qty);
            state.cart.splice(flag, 1);
          }
        }
      } else {
        state.cart = [];
      }
    },
    clearcart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addUser, removeUser, addtocart, removefromcart, clearcart } =
  userSlice.actions;
export default userSlice.reducer;

/*
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = appSlice.actions

export default appSlice.reducer*/
