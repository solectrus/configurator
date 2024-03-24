describe('App Initialization', () => {
  it('initializes without errors', async () => {
    expect(() => import('../src/main')).not.toThrow()
  })
})
