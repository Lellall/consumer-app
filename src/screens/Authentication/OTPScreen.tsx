import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import HideKeyboardOnTouch from "../../components/Containers/HideKeyboardOnTouch";
import Container from "../../components/Containers/Container";
import AuthHeader from "../../components/Headers/AuthHeader";
import Text from "../../components/Text/Text";
import Button from "../../components/Buttons/Button";
import Loader from "../../components/Loaders/Loader";
import useQuery from "../../hooks/useQuery";
import useAlert from "../../hooks/useAlert";
import { setToken } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { CloseIcon } from "../../assets/Svg/Index";
import { AuthBg } from "../../assets/Images";

const OTPScreen = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { Alert, showAlert } = useAlert();
  const dispatch = useDispatch();
  return (
    <HideKeyboardOnTouch>
      <ImageBackground source={AuthBg} style={styles.container}>
        <Loader loading={loading} />
        <>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.close}
          >
            <CloseIcon />
          </TouchableOpacity>
          <View style={{ width: "100%", marginTop: 100, flex: 1 }}>
            <Text style={{ textAlign: "center" }} h1>
              Enter One-Time-Password
            </Text>

            <OTPInputView
              style={{ width: "100%", height: 100 }}
              pinCount={4}
              code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => setCode(code)}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={async (code) => {
                const bodyData = {
                  code: code,
                };
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  navigation.navigate("Success");
                }, 2000);
              }}
            />
            <Text
              style={{
                color: "#AAAAAA",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              An OTP has been sent to this number (sample@mail.com) Enter the
              code above
            </Text>

            <View style={styles.otp}>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Text style={{ color: "#F06D06" }}>Resend Code</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Text style={{ color: "#1570EF" }}>Send an email instead</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </ImageBackground>
    </HideKeyboardOnTouch>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#000",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },

  underlineStyleBase: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderRadius: 5,
    color: "black",
    borderColor: "transparent",
    backgroundColor: "#F4F4F6",
  },

  underlineStyleHighLighted: {
    borderColor: "#0E5D37",
    backgroundColor: "#fff",
  },
  otp: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  close: {
    marginLeft: "auto",
    marginTop: 20,
  },
});
