import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Todo List" }} />
      </Stack>
    </Provider>
  );
}
