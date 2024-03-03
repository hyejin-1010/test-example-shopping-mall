import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // [Arrange] className을 지닌 컴포넌트 렌더링
  // render API 호출 → 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현
  await render(<TextField className="my-class" />);

  // [Act] 이 테스트는 렌더링에 대한 검증이기 때문에 이 단계는 생략한다.
  // 클릭이나 메서드 호출, prop 변경 등에 대한 작업이 여기에 해당된다.

  // [Assert] 렌더링 후 DOM에 해당 class가 존재하는 지 검증
  const textField = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // vitest의 expect함수를 사용하여 기대 결과를 검증
  // 렌더링되는 DOM 구조가 올바르게 변경되었는 지 확인 → 최종적으로 사용자가 보는 결과는 DOM
  expect(textField).toHaveClass('my-class');
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    // [Arrange] 컴포넌트 렌더링
    await render(<TextField />);

    // [Act] 이 테스트는 렌더링에 대한 검증이기 때문에 이 단계는 생략한다.
    // 클릭이나 메서드 호출, prop 변경 등에 대한 작업이 여기에 해당된다.

    // [Assert] 렌더링 후 DOM에 해당 placeholder를 가진 textfield가 존재하는 지 검증
    const textField = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    expect(textField).toBeInTheDocument();
  });

  it('placeholder props에 따라 placeholder가 변경된다,', async () => {
    const testPlaceholder = '상품명을 입력해주세요';

    // [Arrange] 컴포넌트 렌더링
    await render(<TextField placeholder={testPlaceholder} />);

    // [Act] 이 테스트는 렌더링에 대한 검증이기 때문에 이 단계는 생략한다.
    // 클릭이나 메서드 호출, prop 변경 등에 대한 작업이 여기에 해당된다.

    // [Assert] 렌더링 후 DOM에 해당 placeholder를 가진 textfield가 존재하는 지 검증
    const textField = screen.getByPlaceholderText(testPlaceholder);
    expect(textField).toBeInTheDocument();
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn(); // 스파이 함수: 테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는 지 어떤 값을 반환하는지
  const { user } = await render(<TextField onChange={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test');

  expect(spy).toHaveBeenCalledWith('test');
});

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn(); // 스파이 함수: 테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는 지 어떤 값을 반환하는지
  const { user } = await render(<TextField onEnter={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test{Enter}');

  expect(spy).toHaveBeenCalledWith('test');
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(spy).toHaveBeenCalled();
});

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: 2,
    borderColor: 'rgb(25,118,210',
  });
});
