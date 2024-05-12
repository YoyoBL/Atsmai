const ErrorMessage = ({ error, reset }) => {
   return (
      <div className="text-center space-y-2">
         <h2 className="text-xl">Something went wrong!</h2>
         <div>{error.message}</div>
         <button onClick={() => reset()} className="btn btn-neutral">
            Try again
         </button>
      </div>
   );
};

export default ErrorMessage;
