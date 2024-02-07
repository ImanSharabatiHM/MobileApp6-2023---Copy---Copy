import client from "./client";
import clientEs from "./clientEs";

const endpoint = "/customer";
const mobileendpoint="/api/MobileAPIController";
const epaymentendpoint="/api/EPaymentsController";
const epaymenttestendpoint="api/EPaymentsTestController";

 const getComplaintDepts = () => client.get(endpoint + "/complaintdept");
const getUnitsByCustId = (CustId) =>
  client.get(endpoint + "/getUnitsByCustId", { CustId });

  const getUnitsByUserID = (USER_ID) =>
  client.get(endpoint + "/getUnitsByUserID", { USER_ID });

  const getUnitsByUserID1 = (USER_ID) =>
  clientEs.get(mobileendpoint + "/getUnitsByUserID", { USER_ID });
 
  const GetUnitDescription = (USER_ID) =>
  clientEs.get(mobileendpoint + "/GetUnitDescription", { USER_ID }); 
 

  const SearchMunCustomersMobileNumbers = (Token,Name) =>
  clientEs.get(mobileendpoint + "/SearchMunCustomersMobileNumbers", { Token,Name }); 

  const SearchMunStaffMobileNumbers = (Token,Name) =>
  clientEs.get(mobileendpoint + "/SearchMunStaffMobileNumbers", { Token,Name }); 



  const GetEmpLeaveBalance = (EmpNo,Token) =>
  clientEs.get(mobileendpoint + "/GetEmpLeaveBalance", { EmpNo,Token }); 
 
  const GetCustomerNameByID = (CustNo,Token) =>
  clientEs.get(mobileendpoint + "/GetCustomerNameByID", { CustNo,Token }); 

  const GetEmpNameByID = (EmpNo,Token) =>
  clientEs.get(mobileendpoint + "/GetEmpNameByID", { EmpNo,Token }); 
  
  const GetCustomerNameByID2 = (CustNo,Token) =>
  clientEs.get(mobileendpoint + "/GetCustomerNameByID2", { CustNo,Token }); 

  const getPayeeTaxesByPayeeCode = (PAYEE_CODE) =>
  clientEs.get(mobileendpoint + "/getPayeeTaxesByPayeeCode", { PAYEE_CODE }); 
  
  
const getUnitsWithTaxByUserID = (id) =>
client.get("/GetUnitsWithTaxByUserID", { id });
 
const getAllTaxForUserByUserID = (userid) =>
client.get("/GetTaxForUser", { userid });
 
const getAppointmentsByUserID = (EmpNo) =>
clientEs.get(mobileendpoint+"/MobileAppointments", { EmpNo });


const GetRemainingPaymentsByEmpNo = (EmpNo,Token) =>
clientEs.get(mobileendpoint+"/GetRemainingPayments", { EmpNo,Token });

 

const GetTakafulTotal = (Token) =>
clientEs.get(mobileendpoint+"/GetTakafulTotal", {Token });

const getSalaryByEmpNo = (EmpNo,Token) =>
clientEs.get(mobileendpoint+"/GetSalarySlip", { EmpNo,Token });

const GetLastSalarySlipDetails = (EmpNo,Token) =>
clientEs.get(mobileendpoint+"/GetLastSalarySlipDetails", { EmpNo,Token });

const GetCustomerFinancial = (CUST_NO,F_TYPE) =>
clientEs.get(mobileendpoint+"/GetCustomerFinancial", { CUST_NO,F_TYPE });


const GetFeesByCustomerID3 = (CustomerID,Token) =>
clientEs.get(epaymentendpoint+"/GetFeesByCustomerID2", { CustomerID,Token });


const GetFeesByCustomerID = (CustomerID,Token,FeesType,TaxCode=null) =>
clientEs.get(epaymentendpoint+"/GetFeesByCustomerID3", { CustomerID,Token,FeesType,TaxCode });


const GetFeesByCustomerIDTest = (CustomerID,Token,FeesType,TaxCode=null) =>
clientEs.get("/api"+epaymentendpoint+"/GetFeesByCustomerID3", { CustomerID,Token,FeesType,TaxCode });

const GetPaymentVoucher = (VoucherNo,Token) =>
clientEs.get(epaymentendpoint+"/GetPaymentVoucher", { VoucherNo,Token });

const PrintPaymentVoucher = (VoucherNo,Token) =>
clientEs.get(epaymentendpoint+"/PrintPaymentVoucher", { VoucherNo,Token });


const GenerateTransID = (Token) =>
clientEs.get(epaymentendpoint+"/GenerateTransID", {Token });


 

const GeneratePaymentToken=(Token)=>
clientEs.get(mobileendpoint+"/GeneratePaymentToken", {Token });

const GenerateEPaymentToken=(Token,Type)=>
clientEs.get(epaymentendpoint+"/GenerateEPaymentToken", {Token,Type });

const GenerateCollectionToken=(Token)=>
clientEs.get(mobileendpoint+"/GenerateCollectionToken", {Token });


const CheckVisaPayment=(PaymentReference,Token)=>
clientEs.get(epaymentendpoint+"/CheckVisaPayment", {PaymentReference,Token });

 

///const GeneratePaymentLink=(Token,CustomerID,Amount,Fees,Notes)=>
//clientEs.get(epaymentendpoint+"/GenerateCardLink?Token="+Token,{CustomerID,Amount,Fees,Notes });
export const GeneratePaymentLink = (Token,data, onUploadProgress) => {
  return clientEs.post(epaymentendpoint + "/GenerateCardLink?Token="+Token, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const GeneratePaymentLinkTest = (Token,data, onUploadProgress) => {
  return clientEs.post("/api"+epaymenttestendpoint + "/GenerateCardLink?Token="+Token, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const PostPaymentByCustomerID2 = (Token,data, onUploadProgress) => {
  return clientEs.post(epaymenttestendpoint + "/PostPaymentByCustomerID2?Token="+Token, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};export const PayLastInvoiceByServiceNO = (Token,data, onUploadProgress) => {
  return clientEs.post(epaymentendpoint + "/PostPaymentByCustomerID2?Token="+Token, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};


const GetWaterServicesByCustNo=(Token) =>
clientEs.get(mobileendpoint+"/GetWaterServicesByCustNo", {Token });

const GetWaterConsumptionByServiceNo = (SerivceNo,Token) =>
clientEs.get(mobileendpoint+"/GetWaterConsumptionByServiceNo", { SerivceNo,Token });


  const GetEmpAppDetails = (Token) =>
clientEs.get(mobileendpoint+"/GetEmpAppDetails", { Token});

const GetEmployeePermissions = (Token) =>
clientEs.get(mobileendpoint+"/GetEmployeePermissions", { Token});


const GetEmployeeTabletPermissions = (Token) =>
clientEs.get(mobileendpoint+"/GetEmployeeTabletPermissions", { Token});

const GetCustomerFinancialTotals = (CUST_NO) =>
clientEs.get(mobileendpoint+"/GetCustomerFinancialTotals", { CUST_NO });

const getAlternateEmployees = (EmpNo,Token) =>
clientEs.get(mobileendpoint+"/GetAlternateEmployees", { EmpNo,Token });


const GetEmployeesLeaves = (ShowAll,FromDate,ToDate,Token) =>
clientEs.get(mobileendpoint+"/GetEmployeesLeaves", { ShowAll,FromDate,ToDate,Token });

const IsAttendanceMonitor = (Token) =>
clientEs.get(mobileendpoint+"/IsAttendanceMonitor", {Token });

export const createCM = (complaint, onUploadProgress) => {
    return client.post(endpoint + "/PostCMComplaint", complaint, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };

  export const createHourLeave = (request,Token, onUploadProgress) => {
    return clientEs.post(mobileendpoint + "/PostHourLeave?Token="+Token, request, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };
   const ResetCustPassword = (request,Token) => 
    clientEs.get(mobileendpoint + "/ResetCustPassword?Token="+Token+'&CustNo='+request.CustNo+'&MobileNo='+request.MobileNo)
   
    const SendVerificationCode = (CustID,Token) => 
    clientEs.get(mobileendpoint + "/SendVerificationCode?Token="+Token+'&CustID='+CustID)

    const VerifyCode = (CustID,Code,Token) => 
    clientEs.get(mobileendpoint + "/VerifyCode?Token="+Token+'&CustID='+CustID+'&Code='+Code)



  
  export const createDayLeave = (request,Token, onUploadProgress) => {
    return clientEs.post(mobileendpoint + "/PostDayLeave?Token="+
    
    
    Token, request, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };
export default {
  GetEmployeePermissions,
  GetCustomerNameByID2,
  GenerateCollectionToken,
  PostPaymentByCustomerID2,
  GenerateTransID,
  PrintPaymentVoucher,
  GetPaymentVoucher,
  CheckVisaPayment,
  GeneratePaymentLinkTest,
  GeneratePaymentLink,
  GeneratePaymentToken,
  GetWaterServicesByCustNo,
  GetWaterConsumptionByServiceNo,
  IsAttendanceMonitor,
  GetEmployeesLeaves,
  GetEmpAppDetails,
  createCM,
  GetFeesByCustomerID,
  getAppointmentsByUserID,
  getUnitsByCustId,
  getUnitsByUserID,
  getUnitsWithTaxByUserID,
  getComplaintDepts,
  getAllTaxForUserByUserID,
  getSalaryByEmpNo,createHourLeave,
  createDayLeave,
  getAlternateEmployees,
  GetCustomerFinancial,
  GetCustomerFinancialTotals,
  GetLastSalarySlipDetails,
  getUnitsByUserID1,
  GetUnitDescription,
  getPayeeTaxesByPayeeCode,
  GetEmpLeaveBalance,
  GetCustomerNameByID,
  ResetCustPassword,
  SearchMunCustomersMobileNumbers,
  SearchMunStaffMobileNumbers
 
};
