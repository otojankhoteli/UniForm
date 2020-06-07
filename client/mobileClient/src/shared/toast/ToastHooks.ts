import { useEffect } from "react";
import Toast from "react-native-tiny-toast";
import { useGlobalState } from "../globalState/AppContext";
import { ExceptionState } from "../exceptionHandling/ExceptionHandlingModels";


function canToast(exception:ExceptionState){
  return !(exception.type==="ApiError" && exception.statusCode===401);
}

function getToastMessage(exception: ExceptionState) {
  let message = "";
  switch (exception.type) {
    case "NetworkError":
      message = "We have some trouble getting to Uni";
      break;
    case "ApiError":
      message = exception.method === "get" ? "Failed to fetch" : "Failed to post";
      break;
    default:
      break;
  }

  return message;
}
export default function useToast() {
  const [state,] = useGlobalState();

  useEffect(() => {
    if (!state.exception)
      return;
    if(canToast(state.exception)){

      Toast.show(getToastMessage(state.exception), {
        position: Toast.position.BOTTOM,
        containerStyle: { width: 300, height: 60, backgroundColor: "white", borderRadius: 33 },
        textStyle: { color: "red", fontWeight: "bold" },
        shadow: true,
        imgStyle: {},
        mask: true,
        maskStyle: {},
      });
    }
  }, [state.exception])

}