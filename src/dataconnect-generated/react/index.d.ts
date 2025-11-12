import { CreateTransactionData, CreateTransactionVariables, GetTransactionsForUserData, CreateCategoryData, CreateCategoryVariables, GetCategoriesForUserData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateTransaction(options?: useDataConnectMutationOptions<CreateTransactionData, FirebaseError, CreateTransactionVariables>): UseDataConnectMutationResult<CreateTransactionData, CreateTransactionVariables>;
export function useCreateTransaction(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTransactionData, FirebaseError, CreateTransactionVariables>): UseDataConnectMutationResult<CreateTransactionData, CreateTransactionVariables>;

export function useGetTransactionsForUser(options?: useDataConnectQueryOptions<GetTransactionsForUserData>): UseDataConnectQueryResult<GetTransactionsForUserData, undefined>;
export function useGetTransactionsForUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetTransactionsForUserData>): UseDataConnectQueryResult<GetTransactionsForUserData, undefined>;

export function useCreateCategory(options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, CreateCategoryVariables>): UseDataConnectMutationResult<CreateCategoryData, CreateCategoryVariables>;
export function useCreateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, CreateCategoryVariables>): UseDataConnectMutationResult<CreateCategoryData, CreateCategoryVariables>;

export function useGetCategoriesForUser(options?: useDataConnectQueryOptions<GetCategoriesForUserData>): UseDataConnectQueryResult<GetCategoriesForUserData, undefined>;
export function useGetCategoriesForUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCategoriesForUserData>): UseDataConnectQueryResult<GetCategoriesForUserData, undefined>;
