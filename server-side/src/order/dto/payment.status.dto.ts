class AmountPayment {
  value: string;
  currency: string;
}

class ObjectPayment {
  id: string;
  status: string;
  amount: AmountPayment;
  method_payment: {
    type: string;
    id: string;
    saved: boolean;
    title: string;
    card: string;
  };
  created_at: string;
  expires_at: string;
  description: string;
}

export class PaymentStatusDto {
  event:
    | 'payment.succeeded'
    | 'payment.waiting_for_capture'
    | 'payment_cancelled'
    | 'refund_succeeded';
  type: string;
  object: ObjectPayment;
}
