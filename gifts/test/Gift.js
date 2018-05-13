var Gift = artifacts.require('Gift');

contract('Gift', async accounts => {
  let token;
  beforeEach(async function() {
    token = await Gift.new('gift', 'GIFT', {
      from: accounts[0]
    });
  });

  it('Gift created', async () => {
    const name = await token.name();
    const symbol = await token.symbol();
    assert.ok(token.address);
    assert.equal('gift', name);
    assert.equal('GIFT', symbol);
  });

  it('Gift Info', async () => {
    const lambo = await token.items(1);
    assert.equal(25000000000000000000, lambo[1]);
  });
});
