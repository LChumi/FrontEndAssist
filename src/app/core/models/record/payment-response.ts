export interface PaymentResponse {
  status:        string;
  transactionId: string;
  qr:            string;
  deeplink:      string;
  numeric:       string;
}
