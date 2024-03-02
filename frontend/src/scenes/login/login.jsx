import {
    Box,
    Button,
    TextField, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";

const schema = yup.object().shape({
    email: yup.string().required("required"),
    password: yup.string().required("required"),
});

const initialValues = {
    email: "",
    password: "",
};

const LoginPage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();

    const handleFormSubmit = async (values, onSubmitProps) => {
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
                navigate("/home");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <main className="content">
            <Box>
                <Box
                    width="100%"
                    backgroundColor={theme.palette.background.alt}
                    p="1rem 6%"
                    textAlign="center"
                >
                    <Typography fontWeight="bold" fontSize="32px" color="primary">
                        The Sideline
                    </Typography>
                </Box>

                <Box
                    width={isNonMobileScreens ? "50%" : "93%"}
                    p="2rem"
                    m="2rem auto"
                    borderRadius="1.5rem"
                    backgroundColor={theme.palette.background.alt}
                >
                    <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                        Text for login page
                    </Typography>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={schema}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                >
                                    <TextField
                                        label="Email"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.newPassword}
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
                                        value={values.confirmPassword}
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
                                        SUBMIT
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </main>
    );
};

export default LoginPage;