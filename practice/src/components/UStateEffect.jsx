import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid ${(props) => (props.error ? '#ff4d4f' : '#ccc')};
    border-radius: 5px;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const Button = styled.button`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;

    &:hover {
        background-color: #f0f0f0;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &[type='submit'] {
        background-color: #007bff;
        color: white;
        border: none;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

const ErrorMessage = styled.div`
    color: #ff4d4f;
    font-size: 12px;
    margin-top: -5px;
`;

const InputGroup = styled.div`
    position: relative;
`;

const PasswordToggle = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: #666;
`;

const LoadingSpinner = styled.div`
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

const INITIAL_FORM_DATA = {
    user: '',
    email: '',
    password: '',
};

const VALIDATION_MESSAGES = {
    USER_REQUIRED: '이름을 입력해주세요',
    EMAIL_REQUIRED: '이메일을 입력해주세요',
    EMAIL_INVALID: '올바른 이메일 형식이 아닙니다.(예: example@example.com)',
    PASSWORD_REQUIRED: '비밀번호를 입력해주세요',
    PASSWORD_INVALID: '올바른 비밀번호 형식이 아닙니다.(예: 8자 이상, 영문+숫자)',
};

function UStateEffect() {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); // 로딩중인지 아닌지 false -> true

    // 비밀번호 보기/숨기기 토글
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 자동 저장 기능
    // formData나 errors가 변경될 때마다, 사용자가 입력할 때마다 실행됨
    useEffect(() => {
        const autoSave = setTimeout(() => {
            if (Object.values(errors).every((error) => !error)) {
                // 모든 필드에 에러가 없을 때만 저장(유효하지 않은 데이터는 저장하지 않음)
                localStorage.setItem('formData', JSON.stringify(formData));
            }
        }, 1000); // 1초 후 저장, 연속 입력 시 마지막 입력 후 1초 후에 저장

        return () => clearTimeout(autoSave);
        // cleanup 함수 : 새로운 입력이 들어오면 이전 타이머 취소, 불필요한 저장 방지
    }, [formData, errors]);

    // 페이지 로드 시 저장된 데이터 불러오기
    useEffect(() => {
        loadData();
    }, []);

    const loadData = (showAlert = false) => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
            if (showAlert) {
                alert('저장된 데이터를 불러왔습니다.');
            }
        } else if (showAlert) {
            alert('저장된 데이터가 없습니다.');
        }
    };

    // 각 필드별로 검증하는 함수를 만듭니다
    const validateField = (name, value) => {
        switch (name) {
            case 'user':
                return !value ? VALIDATION_MESSAGES.USER_REQUIRED : '';
            case 'email':
                if (!value) return VALIDATION_MESSAGES.EMAIL_REQUIRED;
                // value가 formData.email인지 확인
                if (!REGEX.EMAIL.test(value)) return VALIDATION_MESSAGES.EMAIL_INVALID;
                return '';
            case 'password':
                if (!value) return VALIDATION_MESSAGES.PASSWORD_REQUIRED;
                if (!REGEX.PASSWORD.test(value)) return VALIDATION_MESSAGES.PASSWORD_INVALID;
                return '';
            default:
                return '';
        }
    };

    // 전체 폼 검증
    const validateForm = () => {
        // if (!formData.user) {
        //     alert(VALIDATION_MESSAGES.USER_REQUIRED);
        //     return false;
        // }

        // if (!formData.email) {
        //     alert(VALIDATION_MESSAGES.EMAIL_REQUIRED);
        //     return false;
        // }

        // if (!REGEX.EMAIL.test(formData.email)) {
        //     alert(VALIDATION_MESSAGES.EMAIL_INVALID);
        //     return false;
        // }

        // if (!formData.password) {
        //     alert(VALIDATION_MESSAGES.PASSWORD_REQUIRED);
        //     return false;
        // }

        // if (!REGEX.PASSWORD.test(formData.password)) {
        //     alert(VALIDATION_MESSAGES.PASSWORD_INVALID);
        //     return false;
        // }
        // return true;

        const newErrors = {}; // 에러를 저장할 객체
        let isValid = true; // 전체 폼의 유효성 상태

        // formData의 모든 KEY(user, email, password)를 순회(forEach)
        Object.keys(formData).forEach((key) => {
            // 각 필드 검증(validateField)
            const error = validateField(key, formData[key]);
            if (error) {
                // 에러가 있다면(error가 빈 문자열이 아니라면)
                newErrors[key] = error; // 에러 객체에 저장
                isValid = false; // 전체 폼의 유효성 실패
            }
        });

        setErrors(newErrors); // 최종 에러 상태 업데이트
        return isValid; // 전체 폼의 유효성 결과 반환
    };

    // 빠른 비동기 처리(async/await)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // validateForm이 false를 반환하면 여기서 함수 실행 중단

        // localStorage.setItem('formData', JSON.stringify(formData));
        // alert(`제출이 완료되었습니다.\n이름: ${formData.user}\n이메일: ${formData.email}`);

        // 제출 시 로딩 상태 적용
        setIsLoading(true); // 로딩 시작

        // 빠른 비동기 처리(try/finally):에러가 발생해도 로딩 상태 해제
        try {
            // API 호출이나 저장 작업
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연 (실제로는 API 호출)
            localStorage.setItem('formData', JSON.stringify(formData));
            alert(`제출이 완료되었습니다.\n이름: ${formData.user}\n이메일: ${formData.email}`);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    const handleLoad = () => {
        loadData(true);
    };

    const handleReset = () => {
        setFormData(INITIAL_FORM_DATA);
        localStorage.removeItem('formData');
    };

    // 입력값이 변경될 때마다 검증합니다
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // 폼 데이터 업데이트
        setFormData((prev) => ({ ...prev, [name]: value }));

        // 실시간으로 에러 체크
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                name="user"
                value={formData.user}
                onChange={handleInputChange}
                placeholder="이름"
            />

            <InputGroup>
                <Input
                    name="email"
                    value={formData.email}
                    type="email"
                    onChange={handleInputChange}
                    placeholder="이메일 (예: example@example.com)"
                    error={errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
                <Input
                    name="password"
                    value={formData.password}
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleInputChange}
                    placeholder="비밀번호 (8자 이상, 영문+숫자)"
                    error={errors.password}
                />
                <PasswordToggle type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                </PasswordToggle>
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </InputGroup>

            <ButtonGroup>
                {/* <Button type="submit">제출</Button> */}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : '제출'}
                </Button>
                <Button type="button" onClick={handleLoad}>
                    불러오기
                </Button>
                <Button type="button" onClick={handleReset}>
                    초기화
                </Button>
            </ButtonGroup>
        </Form>
    );
}

// 1. 폼에 비밀번호 필드를 추가하고 유효성 검사를 구현해보세요
// 2. 제출된 데이터를 localStorage에 저장하고 불러오는 기능을 추가해보세요
// 3. 폼 초기화 버튼을 추가하고 구현해보세요
// 폼 상태 표시 기능
// - 입력 필드의 유효성 상태를 실시간으로 표시
// - 에러 메시지를 alert 대신 UI에 표시
// 비밀번호 보기/숨기기 토글
// - 비밀번호 입력 필드 옆에 눈 모양 아이콘 추가
// - 클릭 시 비밀번호 표시/숨김 전환
// 자동 저장 기능
// - 입력 중인 데이터를 주기적으로 localStorage에 저장
// - 페이지 새로고침 시에도 데이터 유지
// 폼 제출 시 로딩 상태
// - 제출 버튼 클릭 시 로딩 스피너 표시
// - 중복 제출 방지
export default UStateEffect;
