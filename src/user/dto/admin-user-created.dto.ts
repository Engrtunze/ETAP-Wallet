export class AdminUserCreatedDto {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  transactionPin: string;
  email: string;
  isAdmin: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
