import { TokenizerPipe } from './tokenizer.pipe';
describe('TokenizerPipe', () => {
  it('create an instance', () => {
    const pipe = new TokenizerPipe();
    expect(pipe).toBeTruthy();
  });
});
