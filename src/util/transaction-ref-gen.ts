import { v4 as uuidv4 } from 'uuid';

const generateTransactionReference = (): string => {
  const transactionId = uuidv4();
  const reference = `TRX-${transactionId}`;
  return reference;
};
export default generateTransactionReference;
