import { Worker, NearAccount } from 'near-workspaces';
import anyTest, { TestFn } from 'ava';

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('returns the list of assets', async (t) => {
  const { contract } = t.context.accounts;
  const message: any [] = await contract.view('get_assets', {});
  t.true(Array.isArray(message));
});
test('returns the list of buyers', async (t) => {
  const { contract } = t.context.accounts;
  const message: any [] = await contract.view('get_buyers', {});
  t.true(Array.isArray(message));
});


test('add a new asset', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'set_add_asset', { "asset_name": "Ivan Asset3","asset_type":"Car", "asset_ammount": 3000 });
  const message: any [] = await contract.view('get_assets', {});
  t.true(Array.isArray(message));
});
test('buy an asset', async (t) => {
  const { root, contract } = t.context.accounts;
  const assets: any [] = await contract.view('get_assets', {});
  await root.call(contract, 'set_buy_asset', { "asset_uuid": "3527515450", "buyer_name": "Comprador2 Asset1" });
  const message: any [] = await contract.view('get_buyers_asset', { "uuid": "3527515450" });
  t.true(Array.isArray(message));
});