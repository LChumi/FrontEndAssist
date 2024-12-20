export interface InfoResponse {
  status:                       string;
  internalTransactionReference: string;
  amount:                       number;
  transactionId:                string;
  transferNumber:               string;
  date:                         string;
  branchId:                     string;
  posId:                        string;
  currency:                     string;
  description:                  string;
  ordererName:                  string;
  ordererIdentification:        string;
}
