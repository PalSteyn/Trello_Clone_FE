const API_URL = process.env.REACT_APP_API_URL;

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error Login`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error Login", error);
    throw error;
  }
};

const signup = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({ name: name, email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error Signup`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error Signup", error);
    throw error;
  }
};

const googleLogin = async (token) => {
  try {
    const response = await fetch(`${API_URL}/googleLogin`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error Login Google`);
    }

    const data = await response.json();
    console.log("Backend response:", data);

    return data;
  } catch (error) {
    console.error("Error Login Google", error);
    throw error;
  }
};

export { login, googleLogin, signup };
