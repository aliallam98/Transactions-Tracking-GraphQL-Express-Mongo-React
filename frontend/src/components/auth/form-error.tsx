import { ApolloError } from "@apollo/client";
import { FiAlertTriangle } from "react-icons/fi";

interface FormErrorProps {
  message?: ApolloError | string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  console.log(message);
  

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <FiAlertTriangle className="h-4 w-4" />
      <p>{message.toString()}</p>
    </div>
  );
};
