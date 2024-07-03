import { loginData } from "../data/login";

export const loginFunc = (email, password, next) => {
    if (email === "" || password === "") {
        console.log("All fields are required");
        return;
    }

    try {
        // check if user exists
        const user = loginData.find((user) => user.email === email && user.password === password);

        if (!user) {
            console.log("Invalid email or password");
            return;
        } else {
            console.log("User logged in successfully");
            next();
        }
    } catch (error) {
        console.error(error);
    }
};