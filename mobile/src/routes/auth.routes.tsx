import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/Signin";

const Stack = createNativeStackNavigator();

export default function AuthRouter() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Signin" component={ SignIn } options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}