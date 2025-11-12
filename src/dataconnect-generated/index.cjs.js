const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'reactifyhub',
  location: 'us-east1'
};
exports.connectorConfig = connectorConfig;

const createTransactionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTransaction', inputVars);
}
createTransactionRef.operationName = 'CreateTransaction';
exports.createTransactionRef = createTransactionRef;

exports.createTransaction = function createTransaction(dcOrVars, vars) {
  return executeMutation(createTransactionRef(dcOrVars, vars));
};

const getTransactionsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTransactionsForUser');
}
getTransactionsForUserRef.operationName = 'GetTransactionsForUser';
exports.getTransactionsForUserRef = getTransactionsForUserRef;

exports.getTransactionsForUser = function getTransactionsForUser(dc) {
  return executeQuery(getTransactionsForUserRef(dc));
};

const createCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCategory', inputVars);
}
createCategoryRef.operationName = 'CreateCategory';
exports.createCategoryRef = createCategoryRef;

exports.createCategory = function createCategory(dcOrVars, vars) {
  return executeMutation(createCategoryRef(dcOrVars, vars));
};

const getCategoriesForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCategoriesForUser');
}
getCategoriesForUserRef.operationName = 'GetCategoriesForUser';
exports.getCategoriesForUserRef = getCategoriesForUserRef;

exports.getCategoriesForUser = function getCategoriesForUser(dc) {
  return executeQuery(getCategoriesForUserRef(dc));
};
