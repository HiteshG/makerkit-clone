import Alert from "@/core/ui/alert";
import { FirebaseError } from "firebase/app";
import { AlertCircle } from "lucide-react";

const AuthErrorMessage = ({
  error,
} : {
  error: Maybe<Error | FirebaseError | unknown>
}) => {
  if (!error) {
    return null;
  }

  const errorCode = error instanceof FirebaseError ? error.code : error;

  return (
    <Alert icon={<AlertCircle className="rounded-full h-5 w-5" />} type="danger">
      <h6>
        <span className="text-base font-medium">
          Sorry, we could not authenticate you
        </span>
      </h6>
      {errorCode === "auth/user-not-found" && <p>Email or Password are invalid. Please try again</p>}
      {errorCode === "auth/wrong-password" && <p>The credentials entered are incorrect</p>}
    </Alert>
  )
}

export default AuthErrorMessage
