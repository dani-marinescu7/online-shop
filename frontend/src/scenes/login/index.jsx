import {
    Box,
    Button,
    TextField, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "../../components/FlexBetween";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useState } from "react";
import { Toast } from "react-bootstrap";

const registerSchema = yup.object().shape({
    username: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    username: "",
    email: "",
    password: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const LoginPage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [forgotPasswordClick, setForgotPasswordClick] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [missingEmail, setMissingEmail] = useState(false);
    const [pageType, setPageType] = useState("login");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        const savedUserResponse = await fetch(
            "http://localhost:8080/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        try {
            const loggedInResponse = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const loggedIn = await loggedInResponse.json();
            onSubmitProps.resetForm();
            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const forgotPassword = async (values) => {
        if (values.email.length === 0) {
            setMissingEmail(true);
        } else {
            const forgotPasswordResponse = await fetch("http://localhost:8080/users/forgetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.email }),
            });

            values.email = "";

            if (!forgotPasswordResponse.ok) {
                const errorData = await forgotPasswordResponse.json();
                console.error("Error response from server:", errorData);
            } else {
                const forgotPassword = await forgotPasswordResponse.json();
                setForgotPasswordClick(true);
            }
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <main
            className="content"
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}
        >
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                validationSchema={isLogin ? loginSchema : registerSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                      resetForm,
                  }) => (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            width: '30%',
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            {isRegister && (
                                <>
                                    <TextField
                                        label="Username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.username}
                                        name="username"
                                        error={Boolean(touched.username) && Boolean(errors.username)}
                                        helperText={touched.username && errors.username}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid ${palette.neutral.medium}`}
                                        borderRadius="5px"
                                    >
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) =>
                                                setFieldValue("picture", acceptedFiles[0])
                                            }
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed ${palette.primary.contrastText}`}
                                                    p="1rem"
                                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!values.picture ? (
                                                        <p>Add Picture Here</p>
                                                    ) : (
                                                        <FlexBetween>
                                                            <Typography>{values.picture.name}</Typography>
                                                            <EditOutlinedIcon />
                                                        </FlexBetween>
                                                    )}
                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>
                                </>
                            )}

                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>

                        {/* BUTTONS */}
                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.contrastText,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.contrastText },
                                }}
                                onClick={() => console.log("Submit")}
                            >
                                {isLogin ? "LOGIN" : "REGISTER"}
                            </Button>
                            <Typography
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: palette.primary.contrastText,
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: palette.primary.light,
                                    },
                                }}
                            >
                                {isLogin
                                    ? "Don't have an account? Sign Up here."
                                    : "Already have an account? Login here."}
                            </Typography>
                            {isLogin
                                ? <Typography
                                    onClick={() => forgotPassword(values)}
                                    sx={{
                                        textDecoration: "underline",
                                        color: palette.primary.contrastText,
                                        "&:hover": {
                                            cursor: "pointer",
                                            color: palette.primary.light,
                                        },
                                    }}
                                >
                                    Forgot password? Click here!
                                </Typography>
                                : <Typography></Typography>}
                            {forgotPasswordClick && <Toast message="Please check your email!" severity="success" />}
                            {missingEmail && <Toast message="Please insert your email!" severity="error" />}
                            {wrongCredentials && <Toast message="Incorrect username or password. Please try again!" severity="error" />}
                        </Box>
                    </form>
                )}
            </Formik>
        </main>
    );
};

export default LoginPage;