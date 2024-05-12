import InsightWrapper from "./insightWrapper";

const InsightServerError = ({ title }) => {
   return (
      <InsightWrapper title={title}>
         <div>Server Error.</div>
      </InsightWrapper>
   );
};

export default InsightServerError;
