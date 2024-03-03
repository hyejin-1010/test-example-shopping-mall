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
