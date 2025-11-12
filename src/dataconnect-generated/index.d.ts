import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateCategoryData {
  category_insert: Category_Key;
}

export interface CreateCategoryVariables {
  name: string;
  type: string;
}

export interface CreateTransactionData {
  transaction_insert: Transaction_Key;
}

export interface CreateTransactionVariables {
  categoryId: UUIDString;
  amount: number;
  date: DateString;
  description?: string | null;
  type: string;
}

export interface GetCategoriesForUserData {
  categories: ({
    id: UUIDString;
    name: string;
    type: string;
  } & Category_Key)[];
}

export interface GetTransactionsForUserData {
  transactions: ({
    id: UUIDString;
    amount: number;
    date: DateString;
    description?: string | null;
    type: string;
    category: {
      id: UUIDString;
      name: string;
      type: string;
    } & Category_Key;
  } & Transaction_Key)[];
}

export interface Transaction_Key {
  id: UUIDString;
  __typename?: 'Transaction_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTransactionVariables): MutationRef<CreateTransactionData, CreateTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTransactionVariables): MutationRef<CreateTransactionData, CreateTransactionVariables>;
  operationName: string;
}
export const createTransactionRef: CreateTransactionRef;

export function createTransaction(vars: CreateTransactionVariables): MutationPromise<CreateTransactionData, CreateTransactionVariables>;
export function createTransaction(dc: DataConnect, vars: CreateTransactionVariables): MutationPromise<CreateTransactionData, CreateTransactionVariables>;

interface GetTransactionsForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTransactionsForUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTransactionsForUserData, undefined>;
  operationName: string;
}
export const getTransactionsForUserRef: GetTransactionsForUserRef;

export function getTransactionsForUser(): QueryPromise<GetTransactionsForUserData, undefined>;
export function getTransactionsForUser(dc: DataConnect): QueryPromise<GetTransactionsForUserData, undefined>;

interface CreateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
  operationName: string;
}
export const createCategoryRef: CreateCategoryRef;

export function createCategory(vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;
export function createCategory(dc: DataConnect, vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;

interface GetCategoriesForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCategoriesForUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCategoriesForUserData, undefined>;
  operationName: string;
}
export const getCategoriesForUserRef: GetCategoriesForUserRef;

export function getCategoriesForUser(): QueryPromise<GetCategoriesForUserData, undefined>;
export function getCategoriesForUser(dc: DataConnect): QueryPromise<GetCategoriesForUserData, undefined>;

